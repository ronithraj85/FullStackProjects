package com.foodapp.gateway.config;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

@Configuration
public class JwtConfig {

    private static final String SECRET =
            "my-super-secret-key-for-food-delivery-platform-123456";

    @Bean
    public ReactiveJwtDecoder reactiveJwtDecoder() {

        return NimbusReactiveJwtDecoder.withSecretKey(
                new SecretKeySpec(SECRET.getBytes(), "HmacSHA256")
        ).build();
    }
}
