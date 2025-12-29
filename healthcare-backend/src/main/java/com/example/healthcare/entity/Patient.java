package com.example.healthcare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Patient {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 100)
    private String fullName;

    @Past
    private LocalDate dateOfBirth;

    @NotBlank @Size(max = 20)
    private String gender;

    @Email @Size(max = 120)
    @Column(unique = true)
    private String email;

    @Size(max = 15)
    private String phone;

    @Size(max = 255)
    private String address;

    @Column(length = 1000)
    private String medicalHistory;
}
