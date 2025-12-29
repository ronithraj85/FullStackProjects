package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.DoctorResponse;
import com.healthcare.clinic.entity.Doctor;
import com.healthcare.clinic.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<Doctor> create(@Valid @RequestBody Doctor d) {
        return ResponseEntity.ok(doctorService.create(d));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(doctorService.get(id));
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAll() {
        return ResponseEntity.ok(doctorService.getAll());
    }


    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> search(@RequestParam(name = "specialization") String specialization) {
        return ResponseEntity.ok(doctorService.searchActiveBySpecialization(specialization));
    }
}
