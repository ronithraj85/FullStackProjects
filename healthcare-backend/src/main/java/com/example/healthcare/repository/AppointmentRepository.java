package com.example.healthcare.repository;

import com.example.healthcare.entity.Appointment;
import com.example.healthcare.entity.Doctor;
import com.example.healthcare.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByDoctorAndStartTimeBetween(Doctor doctor, LocalDateTime from, LocalDateTime to);
    List<Appointment> findByPatient(Patient patient);
    boolean existsByDoctorAndStartTime(Doctor doctor, LocalDateTime start);
}
