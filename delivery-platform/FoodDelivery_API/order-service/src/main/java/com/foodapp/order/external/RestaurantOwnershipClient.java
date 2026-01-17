package com.foodapp.order.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(
        name = "restaurant-service",
        url = "http://localhost:8787"
)
public interface RestaurantOwnershipClient {

    @GetMapping("/internal/restaurants/{restaurantId}/owner/{ownerId}")
    boolean isOwnerOfRestaurant(
            @PathVariable("restaurantId") Long restaurantId,
            @PathVariable("ownerId") Long ownerId,
            @RequestHeader("Authorization") String internalToken
    );
}
