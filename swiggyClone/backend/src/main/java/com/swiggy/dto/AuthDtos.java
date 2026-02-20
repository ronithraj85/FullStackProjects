package com.swiggy.dto;

import com.swiggy.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

public class AuthDtos {

    @Data
    public static class RegisterRequest {
        @NotBlank
        private String name;

        @Email
        @NotBlank
        private String email;

        @NotBlank
        @Size(min = 6)
        private String password;

        private String phone;
        private String address;
        private Set<Role> roles;
    }

    @Data
    public static class LoginRequest {
        @Email
        @NotBlank
        private String email;

        @NotBlank
        private String password;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private String refreshToken;
        private String email;
        private String name;
        private Set<Role> roles;
        private Long userId;

        public AuthResponse(String token, String refreshToken, String email,
                          String name, Set<Role> roles, Long userId) {
            this.token = token;
            this.refreshToken = refreshToken;
            this.email = email;
            this.name = name;
            this.roles = roles;
            this.userId = userId;
        }
    }
}
