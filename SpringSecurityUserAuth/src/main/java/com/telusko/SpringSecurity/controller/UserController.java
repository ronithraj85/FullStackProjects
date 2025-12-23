package com.telusko.SpringSecurity.controller;

import com.telusko.SpringSecurity.entity.User;
import com.telusko.SpringSecurity.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(10);

    @GetMapping("/display")
    public String displaySuccessMessage(HttpServletRequest request){
        return "Spring security with session id - "+ request.getSession().getId();
    }

    @PostMapping("/register-user")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        System.out.println(user);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
     return  new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }


}
