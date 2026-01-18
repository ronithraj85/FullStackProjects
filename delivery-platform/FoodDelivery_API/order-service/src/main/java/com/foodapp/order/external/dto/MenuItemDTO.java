package com.foodapp.order.external.dto;

import java.math.BigDecimal;

public record MenuItemDTO(
        Long id,
        String name,
        BigDecimal price
) {}
