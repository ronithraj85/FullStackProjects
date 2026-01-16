package com.foodapp.restaurant_service.controller;

import com.foodapp.restaurant_service.entity.Restaurant;
import com.foodapp.restaurant_service.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService service;

    // PUBLIC
//    @GetMapping
//    public List<Restaurant> all() {
//        return service.getAll();
//    }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return List.of(
                new Restaurant(1L, "Pizza Palace", "Italian", 4.5),
                new Restaurant(2L, "Burger Hub", "Fast Food", 4.2)
        );
    }

    // PUBLIC
    @GetMapping("/{id}")
    public Restaurant one(@PathVariable Long id) {
        return service.getById(id);
    }

    // ADMIN / OWNER
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    @PostMapping
    public Restaurant create(@RequestBody Restaurant restaurant) {
        return service.create(restaurant);
    }
}

