package com.healthcare.clinic.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AppointmentRequest {
    @NotNull private Long patientId;
    @NotNull private Long doctorId;
    @FutureOrPresent private LocalDateTime startTime;
    @NotNull private Integer durationMinutes;
    private String notes;
}
