package com.foodapp.order.external;

import com.foodapp.order.external.dto.MenuItemDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "restaurant-service",
        url = "http://localhost:8787"
)
public interface RestaurantMenuClient {

    @GetMapping("/api/menu/item/{menuItemId}")
    MenuItemDto getMenuItem(@PathVariable Long menuItemId);
}
