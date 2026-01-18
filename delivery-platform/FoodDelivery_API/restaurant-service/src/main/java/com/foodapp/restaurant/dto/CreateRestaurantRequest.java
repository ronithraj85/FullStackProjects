package com.foodapp.restaurant.dto;

import lombok.*;

@Getter @Setter
public class CreateRestaurantRequest {
    private String name;
    private String city;
    private String cuisine;
    private String imageUrl;
}
