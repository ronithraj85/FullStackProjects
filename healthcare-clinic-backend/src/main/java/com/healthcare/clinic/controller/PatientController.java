package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.PatientRequest;
import com.healthcare.clinic.dto.PatientResponse;
import com.healthcare.clinic.dto.UserResponseDto;
import com.healthcare.clinic.entity.Patient;
import com.healthcare.clinic.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name="Patients", description = "Manage Patients")
@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    @Autowired
    private final PatientService patientService;

    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @Operation(summary = "Registers for a new patient")
    @PostMapping
    public ResponseEntity<Patient> register(@Valid @RequestBody PatientRequest req) {
        Patient p = Patient.builder()
                .name(req.getName())
                .email(req.getEmail())
                .mobile(req.getMobile())
                .dateOfBirth(req.getDateOfBirth())
                .active(true)
                .build();
        return ResponseEntity.ok(patientService.register(p));
    }

    @Operation(summary = "Get patient by id")
    @GetMapping("/{id}")
    public ResponseEntity<Patient> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(patientService.get(id));
    }

    @Operation(summary = "Get all the patients")
    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAll() {
        return ResponseEntity.ok(patientService.getAll());
    }


    @PreAuthorize("hasAnyRole('ADMIN','STAFF')")
    @Operation(summary =" Update the Patient info")
    @PutMapping("/{id}")
    public ResponseEntity<Patient> update(@PathVariable("id") Long id, @Valid @RequestBody PatientRequest req) {
        Patient update = Patient.builder()
                .name(req.getName())
                .dateOfBirth(req.getDateOfBirth())
                .email(req.getEmail())
                .mobile(req.getMobile())
                .active(true)
                .build();
        return ResponseEntity.ok(patientService.update(id, update));
    }

    @Operation(summary =" Delete the patient based on id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePatient(@PathVariable("id") Long id) {
        patientService.deactivate(id);
        return ResponseEntity.noContent().build();
    }


}
