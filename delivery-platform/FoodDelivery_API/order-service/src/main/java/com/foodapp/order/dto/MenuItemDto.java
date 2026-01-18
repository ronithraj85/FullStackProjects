package com.foodapp.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuItemDto {
    private Long id;
    private String name;
    private Double price;
    private boolean available;
}
