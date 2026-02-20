package com.swiggy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

public class RestaurantDtos {

    @Data
    public static class CreateRestaurantRequest {
        @NotBlank
        private String name;
        private String description;
        private String imageUrl;
        @NotBlank
        private String address;
        @NotBlank
        private String city;
        private String cuisine;
        private Double deliveryFee;
        private Integer deliveryTime;
        private Double minOrder;
    }

    @Data
    public static class MenuItemRequest {
        @NotBlank
        private String name;
        private String description;
        private String imageUrl;
        private String category;
        @NotNull
        private Double price;
        private boolean vegetarian;
    }

    @Data
    public static class MenuItemResponse {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        private String category;
        private Double price;
        private boolean vegetarian;
        private boolean available;
    }

    @Data
    public static class RestaurantResponse {
        private Long id;
        private String name;
        private String description;
        private String imageUrl;
        private String address;
        private String city;
        private String cuisine;
        private Double rating;
        private Integer deliveryTime;
        private Double deliveryFee;
        private Double minOrder;
        private boolean active;
        private List<MenuItemResponse> menuItems;
    }
}
