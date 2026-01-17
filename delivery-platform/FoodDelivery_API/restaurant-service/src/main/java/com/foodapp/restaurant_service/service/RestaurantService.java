package com.foodapp.restaurant_service.service;

import com.foodapp.restaurant_service.dto.RestaurantRequest;
import com.foodapp.restaurant_service.entity.Restaurant;
import com.foodapp.restaurant_service.entity.RestaurantStatus;
import com.foodapp.restaurant_service.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository repository;

    public Restaurant create(RestaurantRequest request, Long ownerId) {

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setCuisine(request.getCuisine());
        restaurant.setImageUrl(request.getImageUrl());
        restaurant.setOwnerId(ownerId);
        restaurant.setStatus(RestaurantStatus.CLOSED);

        return repository.save(restaurant);
    }

    public List<Restaurant> getAll() {
        return repository.findAll();
    }

    public Restaurant getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public Restaurant openRestaurant(Long id, Long ownerId) {

        Restaurant r = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));

        if (!r.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("Not your restaurant");
        }

        r.setStatus(RestaurantStatus.OPEN);
        return repository.save(r);
    }
}
