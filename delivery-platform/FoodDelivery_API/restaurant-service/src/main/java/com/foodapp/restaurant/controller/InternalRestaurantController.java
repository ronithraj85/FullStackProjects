package com.foodapp.restaurant.controller;

import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/restaurants")
@RequiredArgsConstructor
public class InternalRestaurantController {

    private final RestaurantRepository restaurantRepository;

    @GetMapping("/{restaurantId}/owner/{ownerId}")
    public boolean isOwner(
            @PathVariable Long restaurantId,
            @PathVariable Long ownerId
    ) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        return restaurant.getOwnerId().equals(ownerId);
    }
}
