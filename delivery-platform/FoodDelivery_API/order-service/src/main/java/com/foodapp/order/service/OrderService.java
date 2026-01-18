package com.foodapp.order.service;

import com.foodapp.order.dto.CreateOrderRequest;
import com.foodapp.order.dto.MenuItemSnapshot;
import com.foodapp.order.dto.OrderItemRequest;
import com.foodapp.order.entity.Order;
import com.foodapp.order.entity.OrderItem;
import com.foodapp.order.entity.OrderStatus;
import com.foodapp.order.external.RestaurantServiceClient;
import com.foodapp.order.external.dto.MenuItemDTO;
import com.foodapp.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    private final RestaurantServiceClient restaurantClient;

    @Value("${internal.jwt.secret}")
    private String internalToken;

    // =========================
    // VALID STATUS TRANSITIONS
    // =========================
    private static final Map<OrderStatus, Set<OrderStatus>> VALID_TRANSITIONS =
            Map.of(
                    OrderStatus.CREATED,
                    Set.of(OrderStatus.ACCEPTED, OrderStatus.REJECTED),

                    OrderStatus.ACCEPTED,
                    Set.of(OrderStatus.PREPARING),

                    OrderStatus.PREPARING,
                    Set.of(OrderStatus.READY),

                    OrderStatus.READY,
                    Set.of(OrderStatus.PICKED_UP),

                    OrderStatus.PICKED_UP,
                    Set.of(OrderStatus.DELIVERED)
            );

    // =========================
    // OWNER → UPDATE ORDER STATUS
    // =========================
    @Transactional
    public Order updateOrderStatusByOwner(
            Long orderId,
            Long ownerId,
            OrderStatus newStatus
    ) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Order not found: " + orderId)
                );

        // 🔐 OWNERSHIP CHECK (CRITICAL)
        Long restaurantId = order.getRestaurantId();
        boolean isOwner = restaurantClient.isOwnerOfRestaurant(restaurantId, ownerId,"Bearer "+internalToken);

        if (!isOwner) {
            throw new RuntimeException("You do not own this restaurant");
        }

        OrderStatus currentStatus = order.getStatus();

        // 🔁 STATE MACHINE VALIDATION
        if (!VALID_TRANSITIONS
                .getOrDefault(currentStatus, Set.of())
                .contains(newStatus)) {
            throw new IllegalArgumentException(
                    "Invalid status transition: " +
                            currentStatus + " → " + newStatus
            );
        }

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }


    // =========================
    // OWNER → VIEW RESTAURANT ORDERS
    // =========================
    @Transactional(readOnly = true)
    public List<Order> getOrdersForRestaurant(Long restaurantId) {
        return orderRepository.findByRestaurantIdOrderByCreatedAtDesc(restaurantId);
    }

    // =========================
    // USER → VIEW MY ORDERS
    // =========================
    @Transactional(readOnly = true)
    public List<Order> getOrdersForUser(String email) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(email);
    }

    // =========================
    // ADMIN → VIEW ALL ORDERS
    // =========================
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order placeOrder(
            CreateOrderRequest request,
            Long userId,
            String email
    ) {
        Order order = new Order();
        order.setUserId(userId);
        order.setUserEmail(email);
        order.setRestaurantId(request.getRestaurantId());
        order.setStatus(OrderStatus.CREATED);

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest reqItem : request.getItems()) {

            // 🔥 SNAPSHOT MENU DATA
            MenuItemSnapshot menuItem =
                    restaurantClient.getMenuItem(
                            reqItem.getMenuItemId(),
                            "Bearer " + internalToken
                    );
            OrderItem item = new OrderItem();
            item.setMenuItemId(menuItem.getId());
            item.setItemName(menuItem.getName());
            item.setPrice(menuItem.getPrice());
            item.setQuantity(reqItem.getQuantity());
            item.setOrder(order);

            order.getItems().add(item);

            total = total.add(
                    menuItem.getPrice()
                            .multiply(BigDecimal.valueOf(reqItem.getQuantity()))
            );
        }

        order.setTotalAmount(total);

        return orderRepository.save(order);
    }


}
