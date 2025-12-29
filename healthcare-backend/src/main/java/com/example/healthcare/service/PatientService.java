package com.example.healthcare.service;

import com.example.healthcare.entity.Patient;
import com.example.healthcare.exception.BadRequestException;
import com.example.healthcare.exception.NotFoundException;
import com.example.healthcare.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PatientService {

    private final PatientRepository repo;

    public PatientService(PatientRepository repo) { this.repo = repo; }

    public Patient create(Patient patient) {
        repo.findByEmail(patient.getEmail()).ifPresent(p -> {
            throw new BadRequestException("Email already in use");
        });
        return repo.save(patient);
    }

    public Patient get(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Patient not found"));
    }

    public List<Patient> list() { return repo.findAll(); }

    public Patient update(Long id, Patient updated) {
        Patient existing = get(id);
        existing.setFullName(updated.getFullName());
        existing.setDateOfBirth(updated.getDateOfBirth());
        existing.setGender(updated.getGender());
        existing.setPhone(updated.getPhone());
        existing.setAddress(updated.getAddress());
        existing.setMedicalHistory(updated.getMedicalHistory());
        return repo.save(existing);
    }

    public void delete(Long id) {
        Patient existing = get(id);
        repo.delete(existing);
    }
}
