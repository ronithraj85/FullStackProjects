package com.foodapp.order.dto;

import com.foodapp.order.entity.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    private OrderStatus status;
}
