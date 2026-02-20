package com.swiggy.service;

import com.swiggy.dto.OrderDtos.*;
import com.swiggy.entity.*;
import com.swiggy.exception.BusinessException;
import com.swiggy.exception.ResourceNotFoundException;
import com.swiggy.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", request.getRestaurantId()));

        if (!restaurant.isActive()) {
            throw new BusinessException("Restaurant is currently closed");
        }

        // Build order items and calculate total
        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0.0;

        for (OrderItemRequest itemReq : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemReq.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("MenuItem", itemReq.getMenuItemId()));

            if (!menuItem.isAvailable()) {
                throw new BusinessException("Item '" + menuItem.getName() + "' is not available");
            }

            if (!menuItem.getRestaurant().getId().equals(restaurant.getId())) {
                throw new BusinessException("Item does not belong to this restaurant");
            }

            OrderItem orderItem = OrderItem.builder()
                    .menuItem(menuItem)
                    .quantity(itemReq.getQuantity())
                    .price(menuItem.getPrice())
                    .build();
            orderItems.add(orderItem);
            total += menuItem.getPrice() * itemReq.getQuantity();
        }

        if (total < restaurant.getMinOrder()) {
            throw new BusinessException("Minimum order amount is ₹" + restaurant.getMinOrder());
        }

        double finalTotal = total + restaurant.getDeliveryFee();

        Order order = Order.builder()
                .customer(customer)
                .restaurant(restaurant)
                .totalAmount(finalTotal)
                .deliveryFee(restaurant.getDeliveryFee())
                .deliveryAddress(request.getDeliveryAddress() != null
                        ? request.getDeliveryAddress() : customer.getAddress())
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus("PENDING")
                .specialInstructions(request.getSpecialInstructions())
                .status(OrderStatus.PLACED)
                .build();

        Order savedOrder = orderRepository.save(order);

        // Set order reference on items and save
        orderItems.forEach(item -> item.setOrder(savedOrder));
        savedOrder.setOrderItems(orderItems);
        Order finalOrder = orderRepository.save(savedOrder);

        log.info("Order #{} placed by {} at restaurant {}", finalOrder.getId(),
                customerEmail, restaurant.getName());

        return mapToResponse(finalOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String customerEmail) {
        User customer = userRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getId())
                .stream().map(this::mapToResponse).toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long orderId, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        boolean isCustomer = order.getCustomer().getEmail().equals(userEmail);
        boolean isOwner = order.getRestaurant().getOwner().getEmail().equals(userEmail);

        if (!isCustomer && !isOwner) {
            throw new BusinessException("Access denied to this order");
        }

        return mapToResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus newStatus, String userEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        boolean isOwner = order.getRestaurant().getOwner().getEmail().equals(userEmail);
        boolean isDeliveryAgent = order.getDeliveryAgent() != null &&
                order.getDeliveryAgent().getEmail().equals(userEmail);

        if (!isOwner && !isDeliveryAgent) {
            throw new BusinessException("You are not authorized to update this order");
        }

        order.setStatus(newStatus);
        if (newStatus == OrderStatus.DELIVERED) {
            order.setPaymentStatus("COMPLETED");
        }

        Order updated = orderRepository.save(order);
        log.info("Order #{} status updated to {} by {}", orderId, newStatus, userEmail);
        return mapToResponse(updated);
    }

    @Transactional
    public OrderResponse cancelOrder(Long orderId, String customerEmail) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        if (!order.getCustomer().getEmail().equals(customerEmail)) {
            throw new BusinessException("You cannot cancel this order");
        }

        if (order.getStatus() != OrderStatus.PLACED && order.getStatus() != OrderStatus.CONFIRMED) {
            throw new BusinessException("Order cannot be cancelled at this stage: " + order.getStatus());
        }

        order.setStatus(OrderStatus.CANCELLED);
        return mapToResponse(orderRepository.save(order));
    }

    private OrderResponse mapToResponse(Order o) {
        OrderResponse r = new OrderResponse();
        r.setId(o.getId());
        r.setCustomerId(o.getCustomer().getId());
        r.setCustomerName(o.getCustomer().getName());
        r.setRestaurantId(o.getRestaurant().getId());
        r.setRestaurantName(o.getRestaurant().getName());
        r.setStatus(o.getStatus());
        r.setTotalAmount(o.getTotalAmount());
        r.setDeliveryFee(o.getDeliveryFee());
        r.setDeliveryAddress(o.getDeliveryAddress());
        r.setPaymentMethod(o.getPaymentMethod());
        r.setPaymentStatus(o.getPaymentStatus());
        r.setSpecialInstructions(o.getSpecialInstructions());
        r.setCreatedAt(o.getCreatedAt());

        if (o.getOrderItems() != null) {
            r.setOrderItems(o.getOrderItems().stream().map(item -> {
                OrderItemResponse ir = new OrderItemResponse();
                ir.setId(item.getId());
                ir.setMenuItemId(item.getMenuItem().getId());
                ir.setMenuItemName(item.getMenuItem().getName());
                ir.setMenuItemImage(item.getMenuItem().getImageUrl());
                ir.setQuantity(item.getQuantity());
                ir.setPrice(item.getPrice());
                return ir;
            }).toList());
        }
        return r;
    }
}
