package com.telusko.SpringSecurity.controller;

import com.telusko.SpringSecurity.entity.User;
import com.telusko.SpringSecurity.repo.UserRepo;
import com.telusko.SpringSecurity.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/reg-user")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        User us = userService.registerUser(user);
        return ResponseEntity.ok(us);
    }
}
