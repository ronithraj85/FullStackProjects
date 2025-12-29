package com.healthcare.clinic.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    @Pointcut("within(com.healthcare.clinic.controller..*) || within(com.healthcare.clinic.service..*)")
    public void appLayer() {}

    @Before("appLayer()")
    public void logBefore(JoinPoint jp) {
        log.info("Entering {} with args {}", jp.getSignature(), jp.getArgs());
    }

    @AfterReturning(pointcut = "appLayer()", returning = "ret")
    public void logAfter(JoinPoint jp, Object ret) {
        log.info("Exiting {} with return {}", jp.getSignature(), ret);
    }

    @AfterThrowing(pointcut = "appLayer()", throwing = "ex")
    public void logException(JoinPoint jp, Throwable ex) {
        log.error("Exception in {}: {}", jp.getSignature(), ex.getMessage(), ex);
    }
}
