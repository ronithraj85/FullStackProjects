package com.foodapp.auth.service;

import com.foodapp.auth.dto.AuthResult;
import com.foodapp.auth.dto.LoginRequest;
import com.foodapp.auth.dto.RegisterRequest;
import com.foodapp.auth.entity.Role;
import com.foodapp.auth.entity.User;
import com.foodapp.auth.exception.EmailAlreadyExistsException;
import com.foodapp.auth.repository.RoleRepository;
import com.foodapp.auth.repository.UserRepository;
import com.foodapp.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }


        String roleName = "ROLE_" + request.getRole().toUpperCase();

        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(new Role(null, roleName)));

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.getRoles().add(role);

        userRepository.save(user);
    }

    public AuthResult login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .toList();

        String token = jwtUtil.generateToken(
                user.getId(),          // 🔥 userId added
                user.getEmail(),
                roles.get(0)
        );


        return new AuthResult(
                token,
                user.getEmail(),
                roles
        );
    }




}
