package com.telusko.TouristRestAPI.advice;

import java.time.LocalDateTime;

public class ErrorDetails {
	private String statusCode;
	
	private String msg;
	
	private LocalDateTime dateTime;

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public ErrorDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ErrorDetails [statusCode=" + statusCode + ", msg=" + msg + ", dateTime=" + dateTime + "]";
	}

	public ErrorDetails(String statusCode, String msg, LocalDateTime dateTime) {
		super();
		this.statusCode = statusCode;
		this.msg = msg;
		this.dateTime = dateTime;
	}

	
}
