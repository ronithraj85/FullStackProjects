package com.foodapp.auth.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
public class AuthResult {
    private String accessToken;
    private String email;
    private List<String> roles;
}
