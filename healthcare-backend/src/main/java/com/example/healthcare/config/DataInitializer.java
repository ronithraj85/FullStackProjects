package com.example.healthcare.config;

import com.example.healthcare.entity.Doctor;
import com.example.healthcare.entity.Role;
import com.example.healthcare.entity.UserAccount;
import com.example.healthcare.repository.DoctorRepository;
import com.example.healthcare.repository.RoleRepository;
import com.example.healthcare.repository.UserAccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    @Transactional
    public CommandLineRunner initData(DoctorRepository doctorRepo,
                                      RoleRepository roleRepo,
                                      UserAccountRepository userRepo,
                                      PasswordEncoder encoder) {
        return args -> {
            // Seed doctors
            if (doctorRepo.count() == 0) {
                Doctor d1 = new Doctor();
                d1.setFullName("Dr. Meera Singh");
                d1.setSpecialization("Cardiology");
                doctorRepo.save(d1);

                Doctor d2 = new Doctor();
                d2.setFullName("Dr. Arjun Rao");
                d2.setSpecialization("Pediatrics");
                doctorRepo.save(d2);
            }

            // Seed roles
            Role adminRole = roleRepo.findByName("ROLE_ADMIN")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_ADMIN")));
            Role userRole = roleRepo.findByName("ROLE_USER")
                    .orElseGet(() -> roleRepo.save(new Role("ROLE_USER")));

            // Seed admin user
            if (userRepo.findByUsername("admin").isEmpty()) {
                UserAccount admin = new UserAccount();
                admin.setUsername("admin");
                admin.setPassword(encoder.encode("admin123"));
                admin.setEnabled(true);
                admin.setRoles(Set.of(adminRole, userRole));
                userRepo.save(admin);
            }
        };
    }
}
