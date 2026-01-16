package com.foodapp.order.controller;

import com.foodapp.order.entity.Order;
import com.foodapp.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/orders")
    public Order placeOrder(Authentication authentication) {
        return orderService.placeOrder(authentication.getName());
    }

    @GetMapping("/orders/my")
    public List<Order> myOrders(Authentication authentication) {
        return orderService.getOrdersForUser(authentication.getName());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}

