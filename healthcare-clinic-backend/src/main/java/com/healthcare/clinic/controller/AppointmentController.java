package com.healthcare.clinic.controller;

import com.healthcare.clinic.dto.AppointmentRequest;
import com.healthcare.clinic.dto.AppointmentResponse;
import com.healthcare.clinic.entity.Appointment;
import com.healthcare.clinic.entity.Doctor;
import com.healthcare.clinic.entity.Patient;
import com.healthcare.clinic.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

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

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable("id") Long id) {
        appointmentService.cancel(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAll() {
        return ResponseEntity.ok(appointmentService.getAll());
    }





}
