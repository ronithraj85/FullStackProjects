package com.example.healthcare.service;

import com.example.healthcare.entity.Role;
import com.example.healthcare.entity.UserAccount;
import com.example.healthcare.repository.RoleRepository;
import com.example.healthcare.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    private final UserAccountRepository userRepo;
    private final RoleRepository roleRepo;
    private final PasswordEncoder encoder;

    public AuthService(UserAccountRepository userRepo, RoleRepository roleRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.encoder = encoder;
    }

    public UserAccount register(String username, String rawPassword, String roleName) {
        Role role = roleRepo.findByName(roleName)
                .orElseGet(() -> roleRepo.save(new Role(roleName)));

        UserAccount ua = UserAccount.builder()
                .username(username)
                .password(encoder.encode(rawPassword))
                .enabled(true)
                .roles(Collections.singleton(role))
                .build();

        return userRepo.save(ua);
    }
}
