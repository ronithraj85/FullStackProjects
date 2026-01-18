package com.foodapp.order.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class MenuItemSnapshot {
    private Long id;
    private String name;
    private BigDecimal price;
}
