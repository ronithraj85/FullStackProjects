package com.healthcare.auth.controller;

import org.springframework.web.bind.annotation.*;

import com.healthcare.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username,
                        @RequestParam String password) {
        return authService.login(username, password);
    }

    @PostMapping("/register")
    public void register(@RequestParam String username,
                         @RequestParam String password,
                         @RequestParam String role) {
        authService.register(username, password, role);
    }
}
