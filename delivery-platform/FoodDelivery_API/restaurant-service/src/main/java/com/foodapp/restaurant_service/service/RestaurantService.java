package com.foodapp.restaurant_service.service;

import com.foodapp.restaurant_service.entity.Restaurant;
import com.foodapp.restaurant_service.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository repository;

    public List<Restaurant> getAll() {
        return repository.findAll();
    }

    public Restaurant getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
    }

    public Restaurant create(Restaurant restaurant) {
        return repository.save(restaurant);
    }
}

