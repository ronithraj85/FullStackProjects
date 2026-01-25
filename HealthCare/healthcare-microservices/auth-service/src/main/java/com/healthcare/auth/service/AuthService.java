package com.healthcare.auth.service;

public interface AuthService {
    String login(String username, String password);
    void register(String username, String password, String role);
}
