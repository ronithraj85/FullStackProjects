package com.foodapp.restaurant.controller;

import com.foodapp.restaurant.entity.MenuItem;
import com.foodapp.restaurant.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    // OWNER → ADD MENU ITEM
    @PostMapping("/restaurants/{restaurantId}/menu")
    public MenuItem addMenuItem(
            @PathVariable("restaurantId") Long restaurantId,
            @RequestBody MenuItem menuItem,
            @RequestHeader("X-USER-ID") Long userId,
            @RequestHeader("X-USER-ROLE") String role
    ) {
        return menuService.addMenuItem(restaurantId, menuItem, userId, role);
    }

    // PUBLIC → VIEW MENU
    @GetMapping("/restaurants/{restaurantId}/menu")
    public List<MenuItem> getMenu(@PathVariable("restaurantId") Long restaurantId) {
        return menuService.getMenuForRestaurant(restaurantId);
    }

    // PUBLIC → GET MENU ITEM (USED BY ORDER-SERVICE)
    @GetMapping("/menu/{menuItemId}")
    public MenuItem getMenuItem(@PathVariable("menuItemId") Long menuItemId) {
        return menuService.getMenuItem(menuItemId);
    }

    // OWNER → UPDATE MENU ITEM
    @PutMapping("/menu/{menuItemId}")
    public MenuItem updateMenuItem(
            @PathVariable("menuItemId") Long menuItemId,
            @RequestBody MenuItem menuItem,
            @RequestHeader("X-USER-ID") Long userId,
            @RequestHeader("X-USER-ROLE") String role
    ) {
        return menuService.updateMenuItem(menuItemId, menuItem, userId, role);
    }

    // OWNER → DELETE MENU ITEM
    @DeleteMapping("/menu/{menuItemId}")
    public void deleteMenuItem(
            @PathVariable("menuItemId") Long menuItemId,
            @RequestHeader("X-USER-ID") Long userId,
            @RequestHeader("X-USER-ROLE") String role
    ) {
        menuService.deleteMenuItem(menuItemId, userId, role);
    }
}
