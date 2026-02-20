package com.swiggy.repository;

import com.swiggy.entity.Order;
import com.swiggy.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Order> findByRestaurantIdOrderByCreatedAtDesc(Long restaurantId);
    List<Order> findByDeliveryAgentIdAndStatus(Long agentId, OrderStatus status);
    List<Order> findByStatus(OrderStatus status);
}
