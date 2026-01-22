package com.telusko.SpringSecurity.controller;

import com.telusko.SpringSecurity.model.Student;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/student")
public class StudentController {

    List<Student> studentList = new ArrayList<>(List.of(new Student(1,"Raj","Java"),
            new Student(2,"Ronith","SpringAI"),
            new Student(3,"Kopperla","SpringBoot"),
			new Student(4,"Rajesh","SpringBoot")
            ));

    @GetMapping("/get-students")
    public List<Student> getStudentList(){
        return  studentList;
    }

    @PostMapping("/add-student")
    public void addStudents(@RequestBody Student student){
        studentList.add(student);
    }

    @GetMapping("/token-gen")
    public CsrfToken getCsrfToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @GetMapping("/get-sessionId")
    public String getSessionId(HttpServletRequest request){
        return "Session id from the request is-"+request.getSession().getId();
    }



}
