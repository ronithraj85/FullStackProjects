package com.healthcare.clinic.service;

import com.healthcare.clinic.dto.LoginDto;
import org.springframework.stereotype.Service;


public interface AuthService {
    String login(LoginDto loginDto);
}