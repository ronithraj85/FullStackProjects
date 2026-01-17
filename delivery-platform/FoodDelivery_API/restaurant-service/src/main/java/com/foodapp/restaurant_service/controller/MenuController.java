package com.foodapp.restaurant_service.controller;

import com.foodapp.restaurant_service.dto.MenuItemRequest;
import com.foodapp.restaurant_service.entity.MenuItem;
import com.foodapp.restaurant_service.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService service;

    @GetMapping("/{restaurantId}")
    public List<MenuItem> menu(@PathVariable Long restaurantId) {
        return service.getMenu(restaurantId);
    }

    @PreAuthorize("hasRole('OWNER')")
    @PostMapping("/{restaurantId}")
    public MenuItem add(
            @PathVariable Long restaurantId,
            @RequestBody MenuItemRequest request) {

        return service.add(restaurantId, request);
    }
}
