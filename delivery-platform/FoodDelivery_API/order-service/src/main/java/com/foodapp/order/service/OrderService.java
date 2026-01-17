package com.foodapp.order.service;

import com.foodapp.order.dto.CreateOrderRequest;
import com.foodapp.order.dto.OrderItemRequest;
import com.foodapp.order.entity.Order;
import com.foodapp.order.entity.OrderItem;
import com.foodapp.order.external.RestaurantClient;
import com.foodapp.order.external.dto.MenuItemDto;
import com.foodapp.order.repository.OrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantClient restaurantClient;

    @Transactional
    public Order placeOrder(CreateOrderRequest request, Long userId) {

        Order order = new Order();
        order.setUserId(userId);
        order.setRestaurantId(request.getRestaurantId());
        order.setStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderItemRequest itemReq : request.getItems()) {

            MenuItemDto menuItem =
                    restaurantClient.getMenuItem(itemReq.getMenuItemId());

            if (!menuItem.isAvailable()) {
                throw new RuntimeException("Item not available");
            }

            double itemTotal =
                    menuItem.getPrice() * itemReq.getQuantity();

            total += itemTotal;

            OrderItem item = new OrderItem();
            item.setMenuItemId(itemReq.getMenuItemId());
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(menuItem.getPrice());
            item.setOrder(order);

            items.add(item);
        }

        order.setTotalAmount(total);
        order.setItems(items);

        return orderRepository.save(order);
    }

    public List<Order> getOrdersForUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
