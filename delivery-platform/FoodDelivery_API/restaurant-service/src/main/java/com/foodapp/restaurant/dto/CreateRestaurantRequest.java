package com.foodapp.restaurant.dto;

import lombok.Data;

@Data
public class CreateRestaurantRequest {
    private String name;
    private String city;
    private String address;
}
