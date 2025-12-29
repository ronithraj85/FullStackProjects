package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.PatientRequest;
import com.healthcare.clinic.dto.PatientResponse;
import com.healthcare.clinic.entity.Patient;
import com.healthcare.clinic.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

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

    @GetMapping("/{id}")
    public ResponseEntity<Patient> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(patientService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAll() {
        return ResponseEntity.ok(patientService.getAll());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Patient> update(@PathVariable("id") Long id, @Valid @RequestBody PatientRequest req) {
        Patient update = Patient.builder()
                .name(req.getName())
                .dateOfBirth(req.getDateOfBirth())
                .active(true)
                .build();
        return ResponseEntity.ok(patientService.update(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivate(@PathVariable Long id) {
        patientService.deactivate(id);
        return ResponseEntity.noContent().build();
    }
}
