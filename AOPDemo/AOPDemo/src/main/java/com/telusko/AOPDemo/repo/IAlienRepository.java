package com.telusko.AOPDemo.repo;

import com.telusko.AOPDemo.model.Aliens;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAlienRepository extends JpaRepository<Aliens, Integer> {
}
