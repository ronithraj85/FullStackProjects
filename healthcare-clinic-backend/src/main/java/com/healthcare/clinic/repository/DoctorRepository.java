package com.healthcare.clinic.repository;

import com.healthcare.clinic.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecializationAndActiveTrue(String specialization);
}
