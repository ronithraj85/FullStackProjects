package com.foodapp.order.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class InternalJwtUtil {

    private final SecretKey key;

    public InternalJwtUtil(@Value("${internal.jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateInternalToken() {

        return Jwts.builder()
                .setIssuer("food-delivery-platform")
                .claim("service", "order-service")
                .claim("scope", "internal")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
