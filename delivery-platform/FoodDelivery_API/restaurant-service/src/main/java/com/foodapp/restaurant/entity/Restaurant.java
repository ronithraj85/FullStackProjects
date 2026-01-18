package com.foodapp.restaurant.entity;

import com.foodapp.restaurant.enums.RestaurantStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Getter @Setter
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String city;
    private String cuisine;
    private String imageUrl;

    private Long ownerId;   // 🔥 from JWT

    @Enumerated(EnumType.STRING)
    private RestaurantStatus status = RestaurantStatus.PENDING;
}
