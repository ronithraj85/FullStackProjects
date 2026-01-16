package com.foodapp.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        http
                // ❌ No CSRF for APIs
                .csrf(ServerHttpSecurity.CsrfSpec::disable)

                // ✅ AUTHORIZATION RULES (ORDER MATTERS)
                .authorizeExchange(exchange -> exchange

                        // 🔓 Public auth endpoints
                        .pathMatchers("/api/auth/**").permitAll()

                        // 🍽️ Restaurants (USER + ADMIN)
                        .pathMatchers(HttpMethod.GET, "/api/restaurants/**")
                        .hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")

                        // 📦 Orders (USER + ADMIN)
                        .pathMatchers("/api/orders/**")
                        .hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")

                        // 🔒 Everything else requires authentication
                        .anyExchange().authenticated()
                )

                // 🔐 JWT validation at Gateway
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())
                        )
                );

        return http.build();
    }

    /**
     * Converts JWT -> Spring Authorities
     * Matches your token:
     * {
     *   "authorities": ["ROLE_ADMIN"]
     * }
     */
    @Bean
    public ReactiveJwtAuthenticationConverterAdapter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();

        // 🔥 MUST match JWT claim name
        authoritiesConverter.setAuthoritiesClaimName("authorities");

        // 🔥 DO NOT prefix ROLE_ again
        authoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtConverter =
                new JwtAuthenticationConverter();

        jwtConverter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);

        return new ReactiveJwtAuthenticationConverterAdapter(jwtConverter);
    }
}
