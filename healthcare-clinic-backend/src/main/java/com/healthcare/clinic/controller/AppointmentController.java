package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.AppointmentRequest;
import com.healthcare.clinic.dto.AppointmentResponse;
import com.healthcare.clinic.entity.Appointment;
import com.healthcare.clinic.entity.Doctor;
import com.healthcare.clinic.entity.Patient;
import com.healthcare.clinic.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Appointments", description = "Manage Appointments")
@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @Operation(summary = "Schedule an appointment")
    @PostMapping
    public ResponseEntity<Appointment> schedule(@Valid @RequestBody AppointmentRequest req) {
        Appointment a = Appointment.builder()
                .patient(Patient.builder().id(req.getPatientId()).build())
                .doctor(Doctor.builder().id(req.getDoctorId()).build())
                .startTime(req.getStartTime())
                .durationMinutes(req.getDurationMinutes())
                .notes(req.getNotes())
                .canceled(false)
                .build();
        return ResponseEntity.ok(appointmentService.schedule(a));
    }

    @Operation(summary = "Cancel an appointment")
    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable("id") Long id) {
        appointmentService.cancel(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get all the appointments")
    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAll() {
        return ResponseEntity.ok(appointmentService.getAll());
    }





}
