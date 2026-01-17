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

    public List<Restaurant> getRestaurantsForOwner(Long ownerId) {
        return restaurantRepository.findByOwnerId(ownerId);
    }
}
