package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.UserResponseDto;
import com.healthcare.clinic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getUsers")
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
       return new ResponseEntity<>(userService.deleteUser(id),HttpStatus.NO_CONTENT);
    }


        // Update user details
        @PutMapping("/{id}")
        public ResponseEntity<UserResponseDto> updateUser(
                @PathVariable("id") Long id,
                @RequestBody UserResponseDto userResponseDto) {

            UserResponseDto updatedUser = userService.updateUser(
                    id,
                    userResponseDto.getName(),
                    userResponseDto.getUsername(),
                    userResponseDto.getEmail());

            return ResponseEntity.ok(updatedUser);
        }
}
