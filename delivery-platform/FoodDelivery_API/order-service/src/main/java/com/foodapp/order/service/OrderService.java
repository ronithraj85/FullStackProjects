package com.foodapp.order.service;

import com.foodapp.order.entity.Order;
import com.foodapp.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    // USER places order
    public Order placeOrder(String userEmail) {
        Order order = new Order();
        order.setUserEmail(userEmail);
        order.setStatus("CREATED");
        order.setTotalAmount(500.0);
        order.setCreatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }

    // USER views own orders
    public List<Order> getOrdersForUser(String userEmail) {
        return orderRepository.findByUserEmail(userEmail);
    }

    // ADMIN views all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
