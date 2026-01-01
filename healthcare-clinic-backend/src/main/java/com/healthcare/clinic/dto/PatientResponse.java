package com.healthcare.clinic.dto;

import java.time.LocalDate;
import lombok.*;

@Getter @Setter @Builder
@AllArgsConstructor
@NoArgsConstructor
public class PatientResponse {
    private Long id;
    private String name;
    private String email;
    private String mobile;
    private LocalDate dateOfBirth;
    private Boolean active;
}
