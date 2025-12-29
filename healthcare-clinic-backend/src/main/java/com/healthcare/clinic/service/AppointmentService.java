package com.healthcare.clinic.service;

import com.healthcare.clinic.dto.AppointmentResponse;
import com.healthcare.clinic.entity.Appointment;
import com.healthcare.clinic.entity.Doctor;
import com.healthcare.clinic.entity.Patient;
import com.healthcare.clinic.exception.BusinessRuleViolationException;
import com.healthcare.clinic.exception.ResourceNotFoundException;
import com.healthcare.clinic.repository.AppointmentRepository;
import com.healthcare.clinic.repository.DoctorRepository;
import com.healthcare.clinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service @RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    @Transactional
    public Appointment schedule(Appointment a) {
        Patient patient = patientRepository.findById(a.getPatient().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found: " + a.getPatient().getId()));
        Doctor doctor = doctorRepository.findById(a.getDoctor().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found: " + a.getDoctor().getId()));
        if (Boolean.FALSE.equals(patient.getActive()) || Boolean.FALSE.equals(doctor.getActive())) {
            throw new BusinessRuleViolationException("Inactive patient/doctor cannot schedule");
        }
        LocalDateTime start = a.getStartTime();
        LocalDateTime end = start.plusMinutes(a.getDurationMinutes());
        boolean overlaps = appointmentRepository.existsByDoctorAndStartTimeBetween(doctor, start.minusMinutes(1), end.minusMinutes(1));
        if (overlaps) throw new BusinessRuleViolationException("Doctor has overlapping appointment");

        a.setPatient(patient);
        a.setDoctor(doctor);
        return appointmentRepository.save(a);
    }

    @Transactional
    public void cancel(Long id) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found: " + id));
        appt.setCanceled(true);
        appointmentRepository.save(appt);
    }

    public List<AppointmentResponse> getAll() {
        return appointmentRepository.findAll().stream()
                .map(a -> AppointmentResponse.builder()
                        .id(a.getId())
                        .patientId(a.getPatient().getId())
                        .patientName(a.getPatient().getName())
                        .doctorId(a.getDoctor().getId())
                        .doctorName(a.getDoctor().getName())
                        .startTime(a.getStartTime())
                        .durationMinutes(a.getDurationMinutes())
                        .notes(a.getNotes())
                        .canceled(a.getCanceled())
                        .build())
                .toList();
    }




}
