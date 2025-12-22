package com.telusko.AOPDemo.service;

import com.telusko.AOPDemo.model.Aliens;
import com.telusko.AOPDemo.repo.IAlienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlienService implements IAlienService{

    @Autowired
    private IAlienRepository repository;

    @Override
    public Aliens registerAlien(Aliens aliens) {
        Aliens savedAliens = repository.save(aliens);
        return savedAliens;
    }

    @Override
    public List<Aliens> getAllAliens() {
        return repository.findAll();
    }
}
