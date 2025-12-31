package com.healthcare.clinic.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        System.out.println("Entry point check---");
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
    }
/*    AuthenticationEntryPoint is used by ExceptionTranslationFilter to commence an authentication scheme.
    It is the entry point to check if a user is authenticated and logs the person in or
    throws an exception (unauthorized).*/

}
