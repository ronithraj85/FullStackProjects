package com.foodapp.restaurant.dto;

import com.foodapp.restaurant.enums.RestaurantStatus;
import lombok.Data;

@Data
public class RestaurantStatusRequest {
    private RestaurantStatus status;
}

