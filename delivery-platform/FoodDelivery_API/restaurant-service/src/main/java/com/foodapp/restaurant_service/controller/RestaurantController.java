package com.foodapp.restaurant_service.controller;

import com.foodapp.restaurant_service.dto.RestaurantRequest;
import com.foodapp.restaurant_service.entity.Restaurant;
import com.foodapp.restaurant_service.service.RestaurantService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService service;

    // PUBLIC
    @GetMapping
    public List<Restaurant> all() {
        return service.getAll();
    }

    // PUBLIC
    @GetMapping("/{id}")
    public Restaurant one(@PathVariable Long id) {
        return service.getById(id);
    }

    // OWNER / ADMIN
    @PostMapping
    @PreAuthorize("hasAnyRole('OWNER','ADMIN')")
    public Restaurant create(
            @RequestBody RestaurantRequest request,
            HttpServletRequest httpRequest
    ) {
        Long ownerId =
                Long.valueOf(httpRequest.getHeader("X-USER-ID"));

        return service.create(request, ownerId);
    }


    @PatchMapping("/{id}/open")
    @PreAuthorize("hasRole('OWNER')")
    public Restaurant open(
            @PathVariable Long id,
            HttpServletRequest httpRequest
    ) {
        Long ownerId =
                Long.valueOf(httpRequest.getHeader("X-USER-ID"));

        return service.openRestaurant(id, ownerId);
    }


}
