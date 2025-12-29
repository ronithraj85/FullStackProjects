package com.example.healthcare.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 100)
    private String fullName;

    @NotBlank @Size(max = 100)
    private String specialization;

    @Email @Size(max = 120)
    @Column(unique = true)
    private String email;

    @Size(max = 15)
    private String phone;

    @PositiveOrZero
    private int yearsOfExperience;
    @Column(nullable = false) private boolean active = true;
}
