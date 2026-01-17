package com.foodapp.order.external.dto;

import lombok.Data;

@Data
public class MenuItemDto {
    private Long id;
    private Double price;
    private boolean available;
}

