package com.telusko.AOPDemo.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AlienAOP {

    @Before(value="execution(* com.telusko.AOPDemo.controller.AlienController.*(..))" )
    public void cleanBefore(JoinPoint joinPoint){
        System.out.println("Before execution-"+joinPoint.getSignature());
    }

    @After(value="execution(* com.telusko.AOPDemo.controller.*.*(..))" )
    public void cleanAfter(JoinPoint joinPoint){
        System.out.println("After execution, cleaning-"+joinPoint.getSignature());
    }
}
