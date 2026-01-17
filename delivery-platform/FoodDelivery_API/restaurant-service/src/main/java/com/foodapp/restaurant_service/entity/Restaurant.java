package com.foodapp.restaurant_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String cuisine;
    private Double rating;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private RestaurantStatus status; // OPEN, CLOSED

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;
}
