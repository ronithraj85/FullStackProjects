package com.foodapp.auth.controller;

import com.foodapp.auth.dto.*;
import com.foodapp.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @RequestBody RegisterRequest request) {

        authService.register(request);
        return ResponseEntity.ok(
                new RegisterResponse("User registered successfully")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {

        AuthResult authResult = authService.login(request);
        // authResult should contain token, email, roles

        return ResponseEntity.ok(
                new AuthResponse(
                        authResult.getAccessToken(),
                        authResult.getEmail(),
                        authResult.getRoles()
                )
        );
    }


}
