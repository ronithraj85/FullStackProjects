package com.foodapp.restaurant.service;

import com.foodapp.restaurant.dto.CreateRestaurantRequest;
import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.enums.RestaurantStatus;
import com.foodapp.restaurant.repository.RestaurantRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public Restaurant createRestaurant(
            CreateRestaurantRequest req,
            Long ownerId
    ) {
        Restaurant r = new Restaurant();
        r.setName(req.getName());
        r.setCity(req.getCity());
        r.setCuisine(req.getCuisine());
        r.setImageUrl(req.getImageUrl());
        r.setOwnerId(ownerId);
        r.setStatus(RestaurantStatus.PENDING); // admin approval later
        return restaurantRepository.save(r);
    }

    public boolean isOwnerOfRestaurant(Long restaurantId, Long ownerId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        return restaurant.getOwnerId().equals(ownerId);
    }


    public List<Restaurant> getOwnerRestaurants(Long ownerId) {
        return restaurantRepository.findByOwnerId(ownerId);

    }

    public Restaurant getById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public List<Restaurant> getActiveRestaurants() {
        return restaurantRepository.findByStatus(RestaurantStatus.ACTIVE);
    }
    // ADMIN – list pending restaurants
    public List<Restaurant> getPendingRestaurants() {
        return restaurantRepository.findByStatus(RestaurantStatus.PENDING);
    }

    // ADMIN – approve / reject
    @Transactional
    public void updateRestaurantStatus(Long id, RestaurantStatus status) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        restaurant.setStatus(status);
        restaurantRepository.save(restaurant);
    }
}
