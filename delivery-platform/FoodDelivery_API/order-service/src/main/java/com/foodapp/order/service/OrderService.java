package com.foodapp.order.service;

import com.foodapp.order.dto.CreateOrderRequest;
import com.foodapp.order.dto.OrderItemRequest;
import com.foodapp.order.entity.Order;
import com.foodapp.order.entity.OrderItem;
import com.foodapp.order.entity.OrderStatus;
import com.foodapp.order.external.RestaurantServiceClient;
import com.foodapp.order.external.dto.MenuItemDto;
import com.foodapp.order.repository.OrderRepository;
import com.foodapp.order.security.InternalJwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final RestaurantServiceClient restaurantServiceClient;
    private final InternalJwtUtil internalJwtUtil;


    private static final String SECRET =
            "my-super-secret-key-for-food-delivery-platform-123456";

    private final Key key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    // ✅ THIS METHOD MUST BE INSIDE THE CLASS
    public String extractEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    @Transactional
    public Order placeOrder(CreateOrderRequest request,
                            Long userId,
                            String email) {

        Order order = new Order();
        order.setUserId(userId);
        order.setUserEmail(email);
        order.setRestaurantId(request.getRestaurantId());
        order.setStatus(OrderStatus.CREATED);
        order.setCreatedAt(LocalDateTime.now());

        List<OrderItem> items = new ArrayList<>();
        double total = 0;

        for (OrderItemRequest itemReq : request.getItems()) {

            MenuItemDto menuItem =
                    restaurantServiceClient.getMenuItem(itemReq.getMenuItemId());

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

    public List<Order> getOrdersForUser(String email) {
        return orderRepository.findByUserEmail(email);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersForRestaurant(Long restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }

    @Transactional
    public Order updateOrderStatusByOwner(
            Long orderId,
            Long ownerId,
            OrderStatus newStatus
    ) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // ✅ INTERNAL SERVICE-TO-SERVICE SECURITY
        validateRestaurantOwnership(order.getRestaurantId(), ownerId);

        validateTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    private void validateTransition(OrderStatus current, OrderStatus next) {
        if (current == OrderStatus.CREATED && next == OrderStatus.ACCEPTED) return;
        if (current == OrderStatus.ACCEPTED && next == OrderStatus.PREPARING) return;
        if (current == OrderStatus.PREPARING && next == OrderStatus.READY) return;
        if (current == OrderStatus.READY && next == OrderStatus.PICKED_UP) return;

        throw new RuntimeException(
                "Invalid status transition: " + current + " → " + next
        );
    }

    public void validateRestaurantOwnership(Long restaurantId, Long ownerId) {

        String internalToken =
                "Bearer " + internalJwtUtil.generateInternalToken();

        boolean isOwner =
                restaurantServiceClient.isOwnerOfRestaurant(
                        restaurantId,
                        ownerId,
                        internalToken
                );

        if (!isOwner) {
            throw new RuntimeException("Not restaurant owner");
        }
    }
}
