package com.foodapp.restaurant.controller;

import com.foodapp.restaurant.dto.CreateRestaurantRequest;
import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.service.RestaurantService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;

    // 🔓 Public – users can browse
    @GetMapping
    public List<Restaurant> getRestaurants() {
        return restaurantService.getAllActiveRestaurants();
    }

    // 🔒 OWNER / ADMIN only
    @PostMapping
    public Restaurant addRestaurant(
            @RequestBody CreateRestaurantRequest request,
            HttpServletRequest httpRequest
    ) {
        String role = httpRequest.getHeader("X-USER-ROLE");
        Long ownerId = Long.valueOf(httpRequest.getHeader("X-USER-ID"));

        if (!("ROLE_OWNER".equals(role) || "ROLE_ADMIN".equals(role))) {
            throw new RuntimeException("Only OWNER or ADMIN can add restaurants");
        }

        return restaurantService.createRestaurant(request, ownerId);
    }

    // 🔒 OWNER – see own restaurants
    @GetMapping("/my")
    public List<Restaurant> myRestaurants(HttpServletRequest request) {
        Long ownerId = Long.valueOf(request.getHeader("X-USER-ID"));
        return restaurantService.getRestaurantsForOwner(ownerId);
    }
    @GetMapping("/internal/restaurants/{restaurantId}/owner/{ownerId}")
    public boolean isOwner(
            @PathVariable Long restaurantId,
            @PathVariable Long ownerId
    ) {
        return restaurantService.isOwnerOfRestaurant(restaurantId, ownerId);
    }

}
