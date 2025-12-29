package com.healthcare.clinic.exception;

public class BusinessRuleViolationException extends RuntimeException {
    public BusinessRuleViolationException(String msg) { super(msg); }
}
