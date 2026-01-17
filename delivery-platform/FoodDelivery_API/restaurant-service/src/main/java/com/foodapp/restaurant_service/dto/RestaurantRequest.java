package com.foodapp.restaurant_service.dto;

import lombok.Data;

@Data
public class RestaurantRequest {
    private String name;
    private String cuisine;
    private String imageUrl;
}
