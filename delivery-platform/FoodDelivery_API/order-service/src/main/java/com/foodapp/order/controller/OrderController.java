package com.foodapp.order.controller;

import com.foodapp.order.dto.CreateOrderRequest;
import com.foodapp.order.dto.UpdateOrderStatusRequest;
import com.foodapp.order.entity.Order;
import com.foodapp.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    // =========================
    // USER → PLACE ORDER
    // =========================
    @PostMapping
    public Order placeOrder(
            @RequestHeader("X-USER-ID") Long userId,
            @RequestHeader("X-USER-EMAIL") String email,
            @RequestBody CreateOrderRequest request
    ) {
        return orderService.placeOrder(request, userId, email);
    }

    // =========================
    // USER → VIEW MY ORDERS
    // =========================
    @GetMapping("/me")
    public List<Order> myOrders(
            @RequestHeader("X-USER-ROLE") String role,
            @RequestHeader("X-USER-EMAIL") String email
    ) {

        if (!"ROLE_USER".equals(role)) {
            throw new RuntimeException("Only users can view their orders");
        }

        return orderService.getOrdersForUser(email);
    }

    // =========================
    // ADMIN → VIEW ALL ORDERS
    // =========================
    @GetMapping("/all")
    public List<Order> allOrders(
            @RequestHeader("X-USER-ROLE") String role
    ) {

        if (!"ROLE_ADMIN".equals(role)) {
            throw new RuntimeException("Only admin can view all orders");
        }

        return orderService.getAllOrders();
    }

    // =========================
// OWNER → VIEW RESTAURANT ORDERS
// =========================
    @GetMapping("/restaurant/{restaurantId}")
    public List<Order> ordersForRestaurant(
            @PathVariable("restaurantId") Long restaurantId,
            @RequestHeader("X-USER-ID") Long ownerId,
            @RequestHeader("X-USER-ROLE") String role
    ) {

        if (!"ROLE_OWNER".equals(role)) {
            throw new RuntimeException("Only owners can view restaurant orders");
        }

        // 🔐 Ownership validation should happen in Restaurant Service
        // For now, we trust the restaurantId belongs to this owner

        return orderService.getOrdersForRestaurant(restaurantId);
    }

    @PutMapping("/orders/{orderId}/status")
    public Order updateOrderStatus(
            @PathVariable("orderId") Long orderId,
            @RequestHeader("X-USER-ID") Long ownerId,
            @RequestHeader("X-USER-ROLE") String role,
            @RequestBody UpdateOrderStatusRequest request
    ) {
        if (!"ROLE_OWNER".equals(role)) {
            throw new RuntimeException("Only owners can update order status");
        }

        return orderService.updateOrderStatus(
                orderId,
                ownerId,
                request.getStatus()
        );
    }


}
