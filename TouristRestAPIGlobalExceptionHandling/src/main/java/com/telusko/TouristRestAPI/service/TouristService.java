package com.telusko.TouristRestAPI.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.telusko.TouristRestAPI.exception.TouristNotFoundException;
import com.telusko.TouristRestAPI.model.Tourist;
import com.telusko.TouristRestAPI.repo.ITouristRepo;

@Service
public class TouristService implements ITouristService 
{
	@Autowired
	private ITouristRepo repo;

	@Override
	public String registerTourist(Tourist tourist) 
	{
		Tourist touristDb = repo.save(tourist);
		return "Tourist info created with id "+touristDb.getId();
	}

	@Override
	public Tourist fetchTouristById(Integer id) 
	{
//		Optional<Tourist> optional = repo.findById(id);
//		if(optional.isPresent())
//			return optional.get();
//		else throw new TouristNotFoundException("Tourist with given info not found "+id);
		return repo.findById(id).orElseThrow(
				()-> new TouristNotFoundException("Tourist with given info not found "+id));
			
			
	}

	@Override
	public List<Tourist> fetchAllTouristInfo()
	{
		
		return repo.findAll();
	}

	@Override
	public String updateTouristInfo(Tourist tourist) 
	{
		Optional<Tourist> optional = repo.findById(tourist.getId());
		if(optional.isPresent())
		{
			repo.save(tourist);
			return "Tourist info updated";
		}
		throw new TouristNotFoundException("Tourist with given info not present in records");
	}

	@Override
	public String updateTheTouristBudget(Integer id, Double budget)
	{
		Optional<Tourist> optional = repo.findById(id);
		if(optional.isPresent())
		{
			Tourist tourist = optional.get();
			tourist.setBudget(budget);
			repo.save(tourist);
			return "Tourist budget updated";
		}
		throw new TouristNotFoundException("Tourist with given info not present in records");
	}

	@Override
	public String deleteTouristInfo(Integer id)
	{
		Optional<Tourist> optional = repo.findById(id);
		if(optional.isPresent())
		{
			repo.deleteById(id);
			return "Tourist info deleted";
		}
		throw new TouristNotFoundException("Tourist with given info not present in records");
	}

}
