package com.telusko.AOPDemo.controller;

import com.telusko.AOPDemo.model.Aliens;
import com.telusko.AOPDemo.service.IAlienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AlienController {

    @Autowired
    private IAlienService alienService;

    @PostMapping("/add-alien")
    public ResponseEntity<Aliens> registerAlien(@RequestBody Aliens aliens){
        Aliens aliensFromDB = alienService.registerAlien(aliens);
        return  new ResponseEntity<Aliens>(aliensFromDB, HttpStatus.CREATED);
    }

    @GetMapping("/get-aliens")
    public ResponseEntity<List> getAllAliens(){
        List<Aliens> allAliens = alienService.getAllAliens();
        return new ResponseEntity<List>(allAliens,HttpStatus.OK);
    }

}
