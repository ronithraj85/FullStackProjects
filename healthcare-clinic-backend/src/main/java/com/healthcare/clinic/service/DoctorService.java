package com.healthcare.clinic.service;

import com.healthcare.clinic.dto.DoctorResponse;
import com.healthcare.clinic.entity.Doctor;
import com.healthcare.clinic.exception.ResourceNotFoundException;
import com.healthcare.clinic.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//@RequiredArgsConstructor
public class DoctorService {

    private  final DoctorRepository doctorRepository;

    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }


    public Doctor create(Doctor d) { return doctorRepository.save(d); }

    public Doctor get(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found: " + id));
    }

    public List<Doctor> searchActiveBySpecialization(String spec) {
        return doctorRepository.findBySpecializationAndActiveTrue(spec);
    }

    public List<DoctorResponse> getAll() {
        return doctorRepository.findAll().stream()
                .map(d -> DoctorResponse.builder()
                        .id(d.getId())
                        .name(d.getName())
                        .specialization(d.getSpecialization())
                        .active(d.getActive())
                        .build())
                .toList();
    }

    public void deleteDoctor(Long id){
        try {
            doctorRepository.deleteById(id);
        }
        catch(Exception e){
            System.out.println("Error while deleting the doctor.");
            throw new RuntimeException(e);
        }
    }

}
