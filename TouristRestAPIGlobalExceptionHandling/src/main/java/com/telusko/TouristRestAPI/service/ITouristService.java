package com.telusko.TouristRestAPI.service;

import java.util.List;

import com.telusko.TouristRestAPI.model.Tourist;

public interface ITouristService 
{
	String registerTourist(Tourist tourist);
	Tourist fetchTouristById(Integer id);
	List<Tourist> fetchAllTouristInfo();
	String updateTouristInfo(Tourist tourist);
	String updateTheTouristBudget(Integer id, Double budget);
	String deleteTouristInfo(Integer id);

}
