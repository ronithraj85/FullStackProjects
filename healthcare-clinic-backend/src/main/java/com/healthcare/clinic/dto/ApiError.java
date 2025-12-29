package com.healthcare.clinic.dto;

import lombok.*;

import java.time.Instant;
import java.util.List;

@Getter @Setter @Builder @AllArgsConstructor
public class ApiError {
    private Instant timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<String> fieldErrors;
}
