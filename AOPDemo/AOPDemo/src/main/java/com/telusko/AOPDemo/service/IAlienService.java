package com.telusko.AOPDemo.service;

import com.telusko.AOPDemo.model.Aliens;

import java.util.List;

public interface IAlienService {

    Aliens registerAlien(Aliens aliens);

    List<Aliens> getAllAliens();
}
