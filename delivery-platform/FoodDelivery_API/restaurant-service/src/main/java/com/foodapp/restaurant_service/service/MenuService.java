package com.foodapp.restaurant_service.service;

import com.foodapp.restaurant_service.dto.MenuItemRequest;
import com.foodapp.restaurant_service.entity.MenuItem;
import com.foodapp.restaurant_service.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository repository;

    public MenuItem add(Long restaurantId, MenuItemRequest request) {

        MenuItem item = new MenuItem();
        item.setRestaurantId(restaurantId);
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setPrice(request.getPrice());

        return repository.save(item);
    }

    public List<MenuItem> getMenu(Long restaurantId) {
        return repository.findByRestaurantId(restaurantId);
    }
}

