package com.telusko.SpringSecurity.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeluskoController {

    @GetMapping("/telusko-info")
    public ResponseEntity<String> getInfo(HttpServletRequest request){
        String result = "Telusko has launched Java Spring boot SprintAI React course -- "+request.getSession().getId();
               return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/telusko-goal-info")
    public ResponseEntity<String> getSpecificCourseInfo(HttpServletRequest request){
        String result = "Telusko has launched Java Spring boot SprintAI React course for year end preparation -- "+request.getSession().getId();
        return ResponseEntity.ok(result);
    }



}
