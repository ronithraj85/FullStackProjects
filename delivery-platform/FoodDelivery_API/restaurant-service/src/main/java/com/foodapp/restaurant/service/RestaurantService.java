package com.foodapp.restaurant.service;

import com.foodapp.restaurant.dto.CreateRestaurantRequest;
import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public Restaurant createRestaurant(
            CreateRestaurantRequest request,
            Long ownerId
    ) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setCity(request.getCity());
        restaurant.setAddress(request.getAddress());
        restaurant.setOwnerId(ownerId);
        restaurant.setActive(true);

        return restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getAllActiveRestaurants() {
        return restaurantRepository.findByActiveTrue();
    }

    public boolean isOwnerOfRestaurant(Long restaurantId, Long ownerId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        return restaurant.getOwnerId().equals(ownerId);
    }


    public Restaurant getRestaurantByOwner(Long ownerId) {
        return restaurantRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found for owner"));
    }


}
