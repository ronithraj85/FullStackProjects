package com.telusko.TouristRestAPI.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.telusko.TouristRestAPI.model.Tourist;

public interface ITouristRepo extends JpaRepository<Tourist, Integer>
{
	

}
