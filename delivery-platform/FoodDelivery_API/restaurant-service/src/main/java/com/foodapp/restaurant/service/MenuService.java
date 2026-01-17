package com.foodapp.restaurant.service;

import com.foodapp.restaurant.entity.MenuItem;
import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.repository.MenuItemRepository;
import com.foodapp.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    public MenuItem addMenuItem(
            Long restaurantId,
            MenuItem menuItem,
            Long userId,
            String role
    ) {

        if (!"ROLE_OWNER".equals(role)) {
            throw new RuntimeException("Only owners can add menu items");
        }

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        if (!restaurant.getOwnerId().equals(userId)) {
            throw new RuntimeException("You do not own this restaurant");
        }

        menuItem.setRestaurant(restaurant);
        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getMenuForRestaurant(Long restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    public MenuItem getMenuItem(Long menuItemId) {
        return menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    public MenuItem updateMenuItem(
            Long menuItemId,
            MenuItem updated,
            Long userId,
            String role
    ) {

        if (!"ROLE_OWNER".equals(role)) {
            throw new RuntimeException("Only owners can update menu items");
        }

        MenuItem item = getMenuItem(menuItemId);

        if (!item.getRestaurant().getOwnerId().equals(userId)) {
            throw new RuntimeException("You do not own this restaurant");
        }

        item.setName(updated.getName());
        item.setPrice(updated.getPrice());
        item.setAvailable(updated.isAvailable());

        return menuItemRepository.save(item);
    }

    public void deleteMenuItem(Long menuItemId, Long userId, String role) {

        if (!"ROLE_OWNER".equals(role)) {
            throw new RuntimeException("Only owners can delete menu items");
        }

        MenuItem item = getMenuItem(menuItemId);

        if (!item.getRestaurant().getOwnerId().equals(userId)) {
            throw new RuntimeException("You do not own this restaurant");
        }

        menuItemRepository.delete(item);
    }
}
