package com.foodapp.auth.config;

import com.foodapp.auth.entity.Role;
import com.foodapp.auth.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoleDataInitializer {

    private final RoleRepository roleRepository;

    public RoleDataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void initRoles() {

        List<String> roles = List.of(
                "USER",
                "MANAGER",
                "OWNER",
                "ADMIN"
        );

        for (String roleName : roles) {
            roleRepository.findByName(roleName)
                    .orElseGet(() -> roleRepository.save(
                            new Role(null, roleName)
                    ));
        }
    }
}
