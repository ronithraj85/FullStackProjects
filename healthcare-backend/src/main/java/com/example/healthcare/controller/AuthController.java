package com.example.healthcare.controller;

import com.example.healthcare.entity.UserAccount;
import com.example.healthcare.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public ResponseEntity<UserAccount> register(@RequestParam String username,
                                                @RequestParam String password,
                                                @RequestParam(defaultValue = "ROLE_USER") String role) {
        return ResponseEntity.ok(auth.register(username, password, role));
    }
}
