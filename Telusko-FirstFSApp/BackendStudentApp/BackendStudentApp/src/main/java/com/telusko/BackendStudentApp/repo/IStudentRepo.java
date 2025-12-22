package com.telusko.BackendStudentApp.repo;

import com.telusko.BackendStudentApp.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IStudentRepo extends JpaRepository<Student,Long> {
}
