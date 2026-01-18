package com.foodapp.order.external;

import com.foodapp.order.external.dto.MenuItemDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(
        name = "restaurant-service",
        url = "${restaurant.service.url}"
)
public interface RestaurantServiceClient {

    // 🔹 Menu APIs
    @GetMapping("/api/restaurants/{restaurantId}/menu")
    List<MenuItemDto> getMenuForRestaurant(
            @PathVariable("restaurantId") Long restaurantId
    );

    // 🔐 Internal ownership check
    @GetMapping("/internal/restaurants/{restaurantId}/owner/{ownerId}")
    boolean isOwnerOfRestaurant(
            @PathVariable("restaurantId") Long restaurantId,
            @PathVariable("ownerId") Long ownerId,
            @RequestHeader("Authorization") String internalToken
    );
}
