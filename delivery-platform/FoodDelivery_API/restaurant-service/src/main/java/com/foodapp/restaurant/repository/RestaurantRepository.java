package com.foodapp.restaurant.repository;

import com.foodapp.restaurant.entity.Restaurant;
import com.foodapp.restaurant.enums.RestaurantStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    List<Restaurant> findByStatus(RestaurantStatus status);

    List<Restaurant> findByOwnerId(Long ownerId);

}
