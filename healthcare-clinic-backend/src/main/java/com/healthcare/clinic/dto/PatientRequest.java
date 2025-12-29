package com.healthcare.clinic.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PatientRequest {
    @NotBlank private String name;
    @Email private String email;
    @Pattern(regexp = "^[0-9]{10}$") private String mobile;
    @Past private LocalDate dateOfBirth;
}
