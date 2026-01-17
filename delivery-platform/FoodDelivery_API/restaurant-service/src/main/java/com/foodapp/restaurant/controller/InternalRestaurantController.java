package com.foodapp.restaurant.controller;

import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.repository.RestaurantRepository;
import com.foodapp.restaurant.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/internal/restaurants")
@RequiredArgsConstructor
public class InternalRestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/{restaurantId}/owner/{ownerId}")
    public boolean isOwner(
            @PathVariable Long restaurantId,
            @PathVariable Long ownerId
    ) {
        return restaurantService.isOwnerOfRestaurant(restaurantId, ownerId);
    }
}
