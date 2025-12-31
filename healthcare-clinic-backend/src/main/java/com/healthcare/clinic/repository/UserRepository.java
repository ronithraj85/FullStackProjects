package com.healthcare.clinic.repository;

import com.healthcare.clinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameOrEmail(String username, String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.name = :name, u.username = :username, u.email = :email WHERE u.id = :id")
    int updateUserDetails(
            @Param("id") Long id,
            @Param("name") String name,
            @Param("username") String username,
            @Param("email") String email
    );

}


