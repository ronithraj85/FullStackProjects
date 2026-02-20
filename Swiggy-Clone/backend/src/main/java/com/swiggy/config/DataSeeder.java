package com.swiggy.config;

import com.swiggy.entity.*;
import com.swiggy.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded, skipping...");
            return;
        }

        log.info("Seeding database...");

        // Create Admin
        User admin = userRepository.save(User.builder()
                .name("Admin User")
                .email("admin@swiggy.com")
                .password(passwordEncoder.encode("admin123"))
                .roles(Set.of(Role.ROLE_ADMIN))
                .build());

        // Create Customer
        userRepository.save(User.builder()
                .name("John Customer")
                .email("customer@test.com")
                .password(passwordEncoder.encode("customer123"))
                .phone("9876543210")
                .address("123, MG Road, Bangalore")
                .roles(Set.of(Role.ROLE_CUSTOMER))
                .build());

        // Create Restaurant Owner
        User owner = userRepository.save(User.builder()
                .name("Raj Owner")
                .email("owner@test.com")
                .password(passwordEncoder.encode("owner123"))
                .roles(Set.of(Role.ROLE_RESTAURANT_OWNER))
                .build());

        // Create Restaurants
        Restaurant r1 = restaurantRepository.save(Restaurant.builder()
                .name("Burger King")
                .description("Home of the Whopper - Flame-grilled burgers since 1954")
                .imageUrl("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800")
                .address("45, Brigade Road, Bangalore")
                .city("Bangalore")
                .cuisine("American, Fast Food")
                .rating(4.2)
                .deliveryTime(25)
                .deliveryFee(29.0)
                .minOrder(150.0)
                .owner(owner)
                .build());

        addMenuItems(r1, List.of(
            new String[]{"Whopper", "Flame-grilled beef patty with fresh lettuce", "Burgers", "259", "false",
                "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400"},
            new String[]{"Veg Whopper", "Plant-based patty, crispy lettuce", "Burgers", "199", "true",
                "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400"},
            new String[]{"Chicken Nuggets", "Crispy fried chicken bites (9pc)", "Snacks", "149", "false",
                "https://images.unsplash.com/photo-1562967914-608f82629710?w=400"},
            new String[]{"Medium Fries", "Golden crispy french fries", "Sides", "99", "true",
                "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400"},
            new String[]{"Chocolate Shake", "Rich creamy chocolate milkshake", "Beverages", "129", "true",
                "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400"}
        ));

        Restaurant r2 = restaurantRepository.save(Restaurant.builder()
                .name("Pizza Hut")
                .description("America's favorite pizza chain with fresh dough daily")
                .imageUrl("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800")
                .address("12, Koramangala, Bangalore")
                .city("Bangalore")
                .cuisine("Pizza, Italian")
                .rating(4.0)
                .deliveryTime(35)
                .deliveryFee(49.0)
                .minOrder(200.0)
                .owner(owner)
                .build());

        addMenuItems(r2, List.of(
            new String[]{"Pepperoni Pizza", "Classic pepperoni with mozzarella cheese (Regular)", "Pizza", "399", "false",
                "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"},
            new String[]{"Veggie Supreme", "Loaded with fresh garden vegetables", "Pizza", "349", "true",
                "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400"},
            new String[]{"BBQ Chicken Pizza", "Smoky BBQ sauce with grilled chicken", "Pizza", "429", "false",
                "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400"},
            new String[]{"Garlic Bread", "Freshly baked garlic butter bread", "Sides", "129", "true",
                "https://images.unsplash.com/photo-1619531038896-9b5e29e90c24?w=400"},
            new String[]{"Pasta Arrabiata", "Penne pasta in spicy tomato sauce", "Pasta", "249", "true",
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400"}
        ));

        Restaurant r3 = restaurantRepository.save(Restaurant.builder()
                .name("Biryani Blues")
                .description("Authentic Hyderabadi dum biryani cooked in traditional style")
                .imageUrl("https://images.unsplash.com/photo-1563379091339-03246963d9b5?w=800")
                .address("78, Indiranagar, Bangalore")
                .city("Bangalore")
                .cuisine("Indian, Biryani")
                .rating(4.5)
                .deliveryTime(40)
                .deliveryFee(39.0)
                .minOrder(250.0)
                .owner(owner)
                .build());

        addMenuItems(r3, List.of(
            new String[]{"Chicken Biryani", "Slow-cooked dum biryani with premium basmati", "Biryani", "299", "false",
                "https://images.unsplash.com/photo-1563379091339-03246963d9b5?w=400"},
            new String[]{"Veg Biryani", "Fragrant basmati with fresh vegetables and saffron", "Biryani", "229", "true",
                "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400"},
            new String[]{"Mutton Biryani", "Tender mutton pieces in royal dum biryani", "Biryani", "379", "false",
                "https://images.unsplash.com/photo-1645177628172-a94c1f96debb?w=400"},
            new String[]{"Raita", "Chilled yogurt with cucumber and cumin", "Sides", "59", "true",
                "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400"},
            new String[]{"Shorba", "Aromatic mutton soup served with biryani", "Soup", "99", "false",
                "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400"}
        ));

        log.info("Database seeded successfully!");
        log.info("=== TEST CREDENTIALS ===");
        log.info("Admin: admin@swiggy.com / admin123");
        log.info("Customer: customer@test.com / customer123");
        log.info("Owner: owner@test.com / owner123");
    }

    private void addMenuItems(Restaurant restaurant, List<String[]> items) {
        items.forEach(item -> menuItemRepository.save(MenuItem.builder()
                .name(item[0])
                .description(item[1])
                .category(item[2])
                .price(Double.parseDouble(item[3]))
                .vegetarian(Boolean.parseBoolean(item[4]))
                .imageUrl(item[5])
                .restaurant(restaurant)
                .build()));
    }
}
