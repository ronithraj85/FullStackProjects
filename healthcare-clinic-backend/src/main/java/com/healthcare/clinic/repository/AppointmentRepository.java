package com.healthcare.clinic.repository;

import com.healthcare.clinic.entity.Appointment;
import com.healthcare.clinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    boolean existsByDoctorAndStartTimeBetween(Doctor doctor, LocalDateTime start, LocalDateTime end);
    List<Appointment> findByDoctorIdAndCanceledFalse(Long doctorId);
    List<Appointment> findByPatientId(Long patientId);
    @Query("SELECT a FROM Appointment a " + "JOIN FETCH a.patient " + "JOIN FETCH a.doctor")
    List<Appointment> findAllWithDetails();
}
