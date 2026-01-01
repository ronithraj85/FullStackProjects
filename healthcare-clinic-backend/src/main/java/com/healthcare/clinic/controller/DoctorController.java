package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.DoctorResponse;
import com.healthcare.clinic.entity.Doctor;
import com.healthcare.clinic.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Doctors", description = "Manage doctors")
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private  final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @Operation(summary = "Create doctor")
    @PreAuthorize("hasRole('ADMIN')") // ---> hasRole checks for ROLE_ADMIN and not ROLE, so roles when saving/register must be saved/registered with ROLE_ADMIN.
//    @PreAuthorize("hasAuthority('ADMIN')") --> hasAuthority checks for ROLE no need of saving as ROLE_ADMIN.
    @PostMapping
    public ResponseEntity<Doctor> create(@Valid @RequestBody Doctor d) {
        return ResponseEntity.ok(doctorService.create(d));
    }

    @Operation(summary = "Get doctor by ID")
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> get(@PathVariable("id") Long id) {
        return ResponseEntity.ok(doctorService.get(id));
    }

    @Operation(summary = "Get all doctors")
    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAll() {
        return ResponseEntity.ok(doctorService.getAll());
    }


    @Operation(summary = "Get doctors by specialization")
    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> search(@RequestParam(name = "specialization") String specialization) {
        return ResponseEntity.ok(doctorService.searchActiveBySpecialization(specialization));
    }

    @Operation(summary = "Delete doctor")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id)
    {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}
