package com.telusko.SpringSecurity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//    @Bean // No authorization/authentication rules are specified, This simply means no rule are applied and it ignores the spring security
//    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
//        return security.build();
//    }

    @Bean // This below config makes sure every time a new sessionid is generated(stateless), so we can disable the csrf token usage.
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
        security.csrf(customizer->customizer.disable());
        security.authorizeHttpRequests(req->req.anyRequest().authenticated());
        security.httpBasic(Customizer.withDefaults()); // This enables to use the app from postman tool or others.
        security.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // This step makes the app stateless.
        return security.build();
    }

}
