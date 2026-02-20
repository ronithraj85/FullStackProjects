package com.swiggy.service;

import com.swiggy.dto.RestaurantDtos.*;
import com.swiggy.entity.MenuItem;
import com.swiggy.entity.Restaurant;
import com.swiggy.entity.User;
import com.swiggy.exception.BusinessException;
import com.swiggy.exception.ResourceNotFoundException;
import com.swiggy.repository.MenuItemRepository;
import com.swiggy.repository.RestaurantRepository;
import com.swiggy.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<RestaurantResponse> getAllRestaurants() {
        return restaurantRepository.findByActiveTrue().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<RestaurantResponse> searchRestaurants(String query) {
        return restaurantRepository.searchRestaurants(query).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public RestaurantResponse getRestaurant(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));
        return mapToResponse(restaurant);
    }

    @Transactional
    public RestaurantResponse createRestaurant(CreateRestaurantRequest request, String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Restaurant restaurant = Restaurant.builder()
                .name(request.getName())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .address(request.getAddress())
                .city(request.getCity())
                .cuisine(request.getCuisine())
                .deliveryFee(request.getDeliveryFee() != null ? request.getDeliveryFee() : 40.0)
                .deliveryTime(request.getDeliveryTime() != null ? request.getDeliveryTime() : 30)
                .minOrder(request.getMinOrder() != null ? request.getMinOrder() : 100.0)
                .owner(owner)
                .build();

        Restaurant saved = restaurantRepository.save(restaurant);
        log.info("Restaurant created: {} by owner: {}", saved.getName(), ownerEmail);
        return mapToResponse(saved);
    }

    @Transactional
    public MenuItemResponse addMenuItem(Long restaurantId, MenuItemRequest request, String ownerEmail) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", restaurantId));

        if (!restaurant.getOwner().getEmail().equals(ownerEmail)) {
            throw new BusinessException("You don't own this restaurant");
        }

        MenuItem menuItem = MenuItem.builder()
                .name(request.getName())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .price(request.getPrice())
                .vegetarian(request.isVegetarian())
                .restaurant(restaurant)
                .build();

        MenuItem saved = menuItemRepository.save(menuItem);
        return mapMenuItemToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<MenuItemResponse> getMenuItems(Long restaurantId) {
        return menuItemRepository.findByRestaurantIdAndAvailableTrue(restaurantId).stream()
                .map(this::mapMenuItemToResponse)
                .toList();
    }

    @Transactional
    public RestaurantResponse updateRestaurant(Long id, CreateRestaurantRequest request, String ownerEmail) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant", id));

        if (!restaurant.getOwner().getEmail().equals(ownerEmail)) {
            throw new BusinessException("You don't own this restaurant");
        }

        restaurant.setName(request.getName());
        restaurant.setDescription(request.getDescription());
        restaurant.setCuisine(request.getCuisine());
        if (request.getDeliveryFee() != null) restaurant.setDeliveryFee(request.getDeliveryFee());
        if (request.getDeliveryTime() != null) restaurant.setDeliveryTime(request.getDeliveryTime());

        return mapToResponse(restaurantRepository.save(restaurant));
    }

    private RestaurantResponse mapToResponse(Restaurant r) {
        RestaurantResponse response = new RestaurantResponse();
        response.setId(r.getId());
        response.setName(r.getName());
        response.setDescription(r.getDescription());
        response.setImageUrl(r.getImageUrl());
        response.setAddress(r.getAddress());
        response.setCity(r.getCity());
        response.setCuisine(r.getCuisine());
        response.setRating(r.getRating());
        response.setDeliveryTime(r.getDeliveryTime());
        response.setDeliveryFee(r.getDeliveryFee());
        response.setMinOrder(r.getMinOrder());
        response.setActive(r.isActive());
        if (r.getMenuItems() != null) {
            response.setMenuItems(r.getMenuItems().stream()
                    .filter(MenuItem::isAvailable)
                    .map(this::mapMenuItemToResponse)
                    .toList());
        }
        return response;
    }

    private MenuItemResponse mapMenuItemToResponse(MenuItem m) {
        MenuItemResponse response = new MenuItemResponse();
        response.setId(m.getId());
        response.setName(m.getName());
        response.setDescription(m.getDescription());
        response.setImageUrl(m.getImageUrl());
        response.setCategory(m.getCategory());
        response.setPrice(m.getPrice());
        response.setVegetarian(m.isVegetarian());
        response.setAvailable(m.isAvailable());
        return response;
    }
}
