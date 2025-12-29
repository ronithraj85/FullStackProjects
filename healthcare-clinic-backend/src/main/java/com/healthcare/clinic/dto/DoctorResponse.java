package com.healthcare.clinic.dto;
import lombok.*;

@Getter @Setter @Builder
public class DoctorResponse {
    private Long id;
    private String name;
    private String specialization;
    private Boolean active;
}
