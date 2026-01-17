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
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public Order placeOrder(
            @RequestBody CreateOrderRequest request,
            HttpServletRequest httpRequest
    ) {
        String userId = httpRequest.getHeader("X-USER-ID");
        String email = httpRequest.getHeader("X-USER-EMAIL");

        return orderService.placeOrder(
                request,
                Long.valueOf(userId),
                email
        );
    }

    @GetMapping("/my")
    public List<Order> myOrders(@AuthenticationPrincipal Jwt jwt) {
        return orderService.getOrdersForUser(jwt.getSubject());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Order> allOrders() {
        return orderService.getAllOrders();
    }
}
