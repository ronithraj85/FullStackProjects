package com.foodapp.order.controller;

import com.foodapp.order.entity.Order;
import com.foodapp.order.repository.OrderRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // USER places order
    @PostMapping
    public Order placeOrder(Authentication auth) {

        Long userId = Long.parseLong(auth.getName());

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("CREATED");
        order.setTotalAmount(500.0);
        order.setCreatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // USER views own orders
    @GetMapping("/my")
    public List<Order> myOrders(Authentication auth) {

        Long userId = Long.parseLong(auth.getName());
        return orderRepository.findByUserId(userId);
    }
}
