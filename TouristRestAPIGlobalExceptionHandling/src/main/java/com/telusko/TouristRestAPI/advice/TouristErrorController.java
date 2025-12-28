package com.telusko.TouristRestAPI.advice;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.telusko.TouristRestAPI.exception.TouristNotFoundException;

@RestControllerAdvice
public class TouristErrorController
{
    @ExceptionHandler(TouristNotFoundException.class)
	public ResponseEntity<ErrorDetails> handlertouristNotFoundException(TouristNotFoundException tn)
	{
		ErrorDetails error=new ErrorDetails("NOT Found", tn.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
    
    @ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorDetails> handleException(Exception tn)
	{
		ErrorDetails error=new ErrorDetails("NOT Found", tn.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
