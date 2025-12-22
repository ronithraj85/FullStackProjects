package com.telusko.BackendStudentApp.web;

import com.telusko.BackendStudentApp.model.Student;
import com.telusko.BackendStudentApp.service.IStudentService;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "StudentInfiAPIs",description = "APIS to register student and get their details")
//@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private IStudentService service;

    @Operation(summary = "GET", description ="API will give all the student details" )
    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return  service.getAllStudents();
    }

    @Operation(summary="POST", description = "Add/Create a new student")
    @PostMapping("/student")
    public Student registerStudent(@RequestBody Student student)
    {
        return service.saveStudent(student);
    }

    @Operation(summary="GET", description = "Gets  a specific student details based on the id")
    @GetMapping("/student/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id){
        Student student = service.getStudentById(id);
        return new ResponseEntity<>(student, HttpStatus.OK);
        // return ResponseEntity.ok(student);  Both are same;
    }

    @Operation(summary="PUT", description = "Updates the student details based on the id, returns the updated student details")
    @PutMapping("/updateStudent/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id, @RequestBody Student student){
        Student s=service.getStudentById(id);
        s.setName(student.getName());
        s.setEmail(student.getEmail());
        s.setFathersName(student.getFathersName());
        s.setAddress(student.getAddress());
        s.setClassName(student.getClassName());
        s.setPhoneNumber(student.getPhoneNumber());
        Student st = service.updateStudent(s);
        return ResponseEntity.ok(st);
    }

    @Operation(summary="DELETE ", description = "Deletes the student details")
    @DeleteMapping("/student/{id}")
    public ResponseEntity<Student> deleteStudentById(@PathVariable Long id){
        service.deleteStudent(id);;
        return  ResponseEntity.noContent().build();
    }






}
