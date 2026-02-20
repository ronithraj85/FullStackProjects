package com.swiggy.dto;

import com.swiggy.entity.OrderStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public class OrderDtos {

    @Data
    public static class OrderItemRequest {
        @NotNull
        private Long menuItemId;

        @NotNull
        private Integer quantity;
    }

    @Data
    public static class CreateOrderRequest {
        @NotNull
        private Long restaurantId;

        @NotEmpty
        private List<OrderItemRequest> items;

        private String deliveryAddress;
        private String specialInstructions;

        @NotNull
        private String paymentMethod;
    }

    @Data
    public static class OrderItemResponse {
        private Long id;
        private Long menuItemId;
        private String menuItemName;
        private String menuItemImage;
        private Integer quantity;
        private Double price;
    }

    @Data
    public static class OrderResponse {
        private Long id;
        private Long customerId;
        private String customerName;
        private Long restaurantId;
        private String restaurantName;
        private List<OrderItemResponse> orderItems;
        private OrderStatus status;
        private Double totalAmount;
        private Double deliveryFee;
        private String deliveryAddress;
        private String paymentMethod;
        private String paymentStatus;
        private String specialInstructions;
        private LocalDateTime createdAt;
    }
}
