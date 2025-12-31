package com.healthcare.clinic.service;

import com.healthcare.clinic.dto.UserResponseDto;
import com.healthcare.clinic.entity.Role;
import com.healthcare.clinic.entity.User;
import com.healthcare.clinic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user){
        return userRepository.save(user);
    }

    public String deleteUser(Long id){
        try {
            userRepository.deleteById(id);
            return "Successfully delete the user with id-"+id;
        }
        catch(Exception e){
            return "Failed to delete the user with id-"+id;
        }
    }


    public List<UserResponseDto> getAllUsers() {
        List<User> allUsers = userRepository.findAll();
        return allUsers.stream().map(user->{
            UserResponseDto dto=new UserResponseDto();
                    dto.setEmail(user.getEmail());
                  dto.setId(user.getId());
            dto.setName(user.getName());
            dto.setUsername(user.getUsername());
            dto.setRoles(
                     user.getRoles().stream()
                            .map(Role::getName) // extract only role names
                     .collect(Collectors.toSet())
            );
            return dto;
        }).collect(Collectors.toList());

    }



}
