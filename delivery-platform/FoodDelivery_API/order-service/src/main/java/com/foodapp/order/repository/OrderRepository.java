package com.foodapp.order.repository;

import com.foodapp.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);

    List<Order> findByUserEmailOrderByCreatedAtDesc(String userEmail);
}
