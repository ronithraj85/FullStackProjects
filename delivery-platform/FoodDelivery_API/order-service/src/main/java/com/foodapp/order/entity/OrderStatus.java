package com.foodapp.order.entity;

public enum OrderStatus {
    CREATED,        // User placed order
    ACCEPTED,       // Owner accepted
    REJECTED,       // Owner rejected
    PREPARING,      // Kitchen started
    READY,          // Ready for pickup
    PICKED_UP,      // Delivery picked
    DELIVERED       // Completed
}
