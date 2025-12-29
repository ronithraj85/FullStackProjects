package com.example.healthcare.service;

import com.example.healthcare.entity.Appointment;
import com.example.healthcare.entity.Doctor;
import com.example.healthcare.entity.Patient;
import com.example.healthcare.exception.BadRequestException;
import com.example.healthcare.exception.NotFoundException;
import com.example.healthcare.repository.AppointmentRepository;
import com.example.healthcare.repository.DoctorRepository;
import com.example.healthcare.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepo;
    private final PatientRepository patientRepo;
    private final DoctorRepository doctorRepo;

    public AppointmentService(AppointmentRepository appointmentRepo,
                              PatientRepository patientRepo,
                              DoctorRepository doctorRepo) {
        this.appointmentRepo = appointmentRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
    }

    public Appointment schedule(Long patientId, Long doctorId, LocalDateTime start, LocalDateTime end, String reason) {
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new NotFoundException("Patient not found"));
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new NotFoundException("Doctor not found"));

        if (end.isBefore(start) || end.equals(start)) {
            throw new BadRequestException("Invalid time range");
        }
        if (appointmentRepo.existsByDoctorAndStartTime(doctor, start)) {
            throw new BadRequestException("Doctor already booked at start time");
        }

        Appointment appt = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .startTime(start)
                .endTime(end)
                .reason(reason)
                .status("SCHEDULED")
                .build();
        return appointmentRepo.save(appt);
    }

    public Appointment get(Long id) {
        return appointmentRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Appointment not found"));
    }

    public List<Appointment> forDoctor(Long doctorId, LocalDateTime from, LocalDateTime to) {
        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
        return appointmentRepo.findByDoctorAndStartTimeBetween(doctor, from, to);
    }

    public List<Appointment> forPatient(Long patientId) {
        Patient patient = patientRepo.findById(patientId)
                .orElseThrow(() -> new NotFoundException("Patient not found"));
        return appointmentRepo.findByPatient(patient);
    }

    public Appointment updateStatus(Long id, String status) {
        Appointment appt = get(id);
        appt.setStatus(status);
        return appointmentRepo.save(appt);
    }

    public void cancel(Long id) {
        Appointment appt = get(id);
        appt.setStatus("CANCELLED");
        appointmentRepo.save(appt);
    }
}
