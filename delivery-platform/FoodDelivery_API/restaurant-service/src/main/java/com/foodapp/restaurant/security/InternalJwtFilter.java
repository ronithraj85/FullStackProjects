package com.foodapp.restaurant.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;

public class InternalJwtFilter extends OncePerRequestFilter {

    private final SecretKey key;

    public InternalJwtFilter(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws IOException, jakarta.servlet.ServletException {

        if (!request.getRequestURI().startsWith("/internal")) {
            chain.doFilter(request, response);
            return;
        }

        String auth = request.getHeader("Authorization");

        if (auth == null || !auth.startsWith("Bearer ")) {
            response.setStatus(401);
            return;
        }

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(auth.substring(7))
                .getBody();

        if (!"order-service".equals(claims.get("service"))
                || !"internal".equals(claims.get("scope"))) {

            response.setStatus(403);
            return;
        }

        chain.doFilter(request, response);
    }
}
