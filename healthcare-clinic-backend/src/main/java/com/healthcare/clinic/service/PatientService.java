package com.healthcare.clinic.service;

import com.healthcare.clinic.dto.PatientResponse;
import com.healthcare.clinic.entity.Patient;
import com.healthcare.clinic.exception.BusinessRuleViolationException;
import com.healthcare.clinic.exception.ResourceNotFoundException;
import com.healthcare.clinic.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional
    public Patient register(Patient p) {
        patientRepository.findByEmail(p.getEmail()).ifPresent(existing -> {
            throw new BusinessRuleViolationException("Email already registered");
        });
        if (patientRepository.existsByMobile(p.getMobile())) {
            throw new BusinessRuleViolationException("Mobile already registered");
        }
        return patientRepository.save(p);
    }

    public Patient get(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found: " + id));
    }

    @Transactional
    public Patient update(Long id, Patient update) {
        Patient p = get(id);
        p.setName(update.getName());
        p.setDateOfBirth(update.getDateOfBirth());
        p.setActive(update.getActive());
        return patientRepository.save(p);
    }

    @Transactional
    public void deactivate(Long id) {
        Patient p = get(id);
        p.setActive(false);
        patientRepository.save(p);
    }

    public List<PatientResponse> getAll() {
        return patientRepository.findAll().stream()
                .map(p -> PatientResponse.builder()
                        .id(p.getId())
                        .name(p.getName())
                        .email(p.getEmail())
                        .mobile(p.getMobile())
                        .dateOfBirth(p.getDateOfBirth())
                        .active(p.getActive())
                        .build())
                .toList();
    }


}
