package com.foodapp.order.controller;

import com.foodapp.order.entity.Order;
import com.foodapp.order.repository.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // USER places order
    @PostMapping("/orders")
    public Order placeOrder(
            @RequestHeader("X-User-Email") String userEmail
    ) {
        Order order = new Order();
        order.setUserEmail(userEmail);
        order.setStatus("CREATED");
        order.setTotalAmount(500.0);
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    // USER views own orders
    @GetMapping("/orders/my")
    public List<Order> myOrders(
            @RequestHeader("X-User-Email") String userEmail
    ) {
        return orderRepository.findByUserEmail(userEmail);
    }

    // ✅ ADMIN views all orders
    @GetMapping("/admin/orders")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
