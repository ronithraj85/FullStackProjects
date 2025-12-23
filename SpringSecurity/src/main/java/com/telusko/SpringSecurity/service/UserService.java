package com.telusko.SpringSecurity.service;

import com.telusko.SpringSecurity.entity.User;
import com.telusko.SpringSecurity.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public User registerUser(User user)
    {
        User savedUser = repo.save(user);
        return savedUser;
    }
}
