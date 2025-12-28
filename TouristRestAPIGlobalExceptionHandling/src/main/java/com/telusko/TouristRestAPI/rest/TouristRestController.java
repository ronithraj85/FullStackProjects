package com.telusko.TouristRestAPI.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.telusko.TouristRestAPI.model.Tourist;
import com.telusko.TouristRestAPI.service.ITouristService;

@RestController
public class TouristRestController 
{
	@Autowired
	private ITouristService service;
	
	@PostMapping("/reg-tourist")
	public ResponseEntity<String> registerTourist(@RequestBody Tourist tourist)
	{
		String res=service.registerTourist(tourist);
		return new ResponseEntity<String>(res, HttpStatus.CREATED);
	}
	
	
	@GetMapping("/get-tourist/{id}")
	public ResponseEntity<?> getTourist(@PathVariable("id") Integer id)
	{
			Tourist tourist = service.fetchTouristById(id);
			return new ResponseEntity<Tourist>(tourist, HttpStatus.OK);	
	}
	
	@GetMapping("/get-tourists")
	public ResponseEntity<List> getAllTourist()
	{
		List<Tourist> tourists = service.fetchAllTouristInfo();
		return new ResponseEntity<List>(tourists, HttpStatus.OK);
	}
	
	@PutMapping("/update-tourist")
	public ResponseEntity<String> updateTourist(@RequestBody Tourist tourist)
	{
			String res=service.updateTouristInfo(tourist);
			return new ResponseEntity<String>(res, HttpStatus.OK);	
	}
	
	@PatchMapping("/update-tourist-budget/{id}/{newBudget}")
	public ResponseEntity<String> updateTourist(@PathVariable("id")Integer id, @PathVariable("newBudget")Double newBudget)
	{
			String res=service.updateTheTouristBudget(id,newBudget);
			return new ResponseEntity<String>(res, HttpStatus.OK);	
	}
	
	@DeleteMapping("/delete-tourist/{id}")
	public ResponseEntity<String> updateTourist(@PathVariable("id")Integer id) 
	{
			String res=service.deleteTouristInfo(id);
			return new ResponseEntity<String>(res, HttpStatus.OK);
	}

}








