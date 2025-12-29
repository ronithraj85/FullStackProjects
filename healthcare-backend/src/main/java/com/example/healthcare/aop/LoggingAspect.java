package com.example.healthcare.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Around("execution(* com.example.healthcare.service..*(..)) || execution(* com.example.healthcare.controller..*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            Object result = joinPoint.proceed();
            long time = System.currentTimeMillis() - start;
            log.debug("{} executed in {} ms", joinPoint.getSignature(), time);
            return result;
        } catch (Throwable t) {
            long time = System.currentTimeMillis() - start;
            log.error("{} failed after {} ms: {}", joinPoint.getSignature(), time, t.getMessage());
            throw t;
        }
    }
}
