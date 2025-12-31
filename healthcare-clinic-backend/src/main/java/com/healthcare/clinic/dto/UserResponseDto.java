package com.healthcare.clinic.dto;

import com.healthcare.clinic.entity.Role;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
     private Long id;
     private String name;
     private String username;
     private String email;
     private Set<String> roles; // only role names
}


