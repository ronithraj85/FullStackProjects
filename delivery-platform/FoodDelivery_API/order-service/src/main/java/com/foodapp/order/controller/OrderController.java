package com.foodapp.order.controller;

import com.foodapp.order.dto.CreateOrderRequest;
import com.foodapp.order.entity.Order;
import com.foodapp.order.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public Order placeOrder(
            @RequestBody CreateOrderRequest request,
            HttpServletRequest httpRequest
    ) {
        Long userId = Long.valueOf(httpRequest.getHeader("X-USER-ID"));
        return orderService.placeOrder(request, userId);
    }

    @GetMapping("/my")
    public List<Order> myOrders(HttpServletRequest request) {
        Long userId = Long.valueOf(request.getHeader("X-USER-ID"));
        return orderService.getOrdersForUser(userId);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Order> allOrders() {
        return orderService.getAllOrders();
    }
}
