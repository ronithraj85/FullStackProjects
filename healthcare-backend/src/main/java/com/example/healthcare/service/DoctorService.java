package com.example.healthcare.service;

import com.example.healthcare.entity.Doctor;
import com.example.healthcare.exception.NotFoundException;
import com.example.healthcare.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DoctorService {

    private final DoctorRepository repo;

    public DoctorService(DoctorRepository repo) { this.repo = repo; }

    public Doctor create(Doctor doctor) { return repo.save(doctor); }

    public Doctor get(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Doctor not found"));
    }

    public List<Doctor> searchBySpecialization(String specialization) {
        return repo.findBySpecializationIgnoreCase(specialization);
    }

    public List<Doctor> list() { return repo.findAll(); }

    public Doctor update(Long id, Doctor updated) {
        Doctor existing = get(id);
        existing.setFullName(updated.getFullName());
        existing.setSpecialization(updated.getSpecialization());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setYearsOfExperience(updated.getYearsOfExperience());
        return repo.save(existing);
    }

    public void delete(Long id) {
        Doctor existing = get(id);
        repo.delete(existing);
    }
}
