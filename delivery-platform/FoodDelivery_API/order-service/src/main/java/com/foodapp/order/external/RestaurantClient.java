package com.foodapp.order.external;

import com.foodapp.order.external.dto.MenuItemDto;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestaurantClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public MenuItemDto getMenuItem(Long menuItemId) {
        return restTemplate.getForObject(
                "http://localhost:8787/api/menu/item/" + menuItemId,
                MenuItemDto.class
        );
    }
}
