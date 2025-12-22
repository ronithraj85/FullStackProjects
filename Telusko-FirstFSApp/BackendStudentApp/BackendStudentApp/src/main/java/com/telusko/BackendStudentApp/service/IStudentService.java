package com.telusko.BackendStudentApp.service;

import java.util.List;
import com.telusko.BackendStudentApp.model.Student;

public interface IStudentService {

    List<Student> getAllStudents();
    Student saveStudent(Student student);
    Student getStudentById(Long id);
    Student updateStudent(Student student);
    void deleteStudent(Long id);

}
