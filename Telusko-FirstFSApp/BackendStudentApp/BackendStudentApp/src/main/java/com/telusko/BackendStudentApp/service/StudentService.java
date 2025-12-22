package com.telusko.BackendStudentApp.service;

import com.telusko.BackendStudentApp.model.Student;
import com.telusko.BackendStudentApp.repo.IStudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudentService  implements IStudentService{

    @Autowired
    private IStudentRepo repo;

    @Override
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    @Override
    public Student saveStudent(Student student) {
        return repo.save(student);
    }

    @Override
    public Student getStudentById(Long id) {
        return repo.findById(id).orElseThrow(()->new NoSuchElementException("Student not found with id="+id));
    }

    @Override
    public Student updateStudent(Student student) {
        return repo.save(student);
    }

    @Override
    public void deleteStudent(Long id) {
        repo.deleteById(id);
    }
}
