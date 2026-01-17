package com.foodapp.restaurant.config;

import com.foodapp.restaurant.filter.InternalAuthFilter;
import com.foodapp.restaurant.security.InternalJwtFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${security.internal.secret}")
    private String internalSecret;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable())
                .addFilterBefore(
                        new InternalJwtFilter(internalSecret),
                        UsernamePasswordAuthenticationFilter.class
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/internal/**").authenticated()
                        .anyRequest().permitAll()
                );

        return http.build();
    }

}
