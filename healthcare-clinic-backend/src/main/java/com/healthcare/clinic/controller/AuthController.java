package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.JwtAuthResponse;
import com.healthcare.clinic.dto.LoginDto;
import com.healthcare.clinic.dto.UserResponseDto;
import com.healthcare.clinic.entity.User;
import com.healthcare.clinic.service.AuthService;
import com.healthcare.clinic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto)
    {
        String token = authService.login(loginDto);
        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return  new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }



}
