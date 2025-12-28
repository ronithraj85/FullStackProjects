package com.telusko.SpringSecurity.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean // This below config makes sure every time a new sessionid is generated(stateless), so we can disable the csrf token usage.
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
        security.csrf(customizer->customizer.disable());
//        security.authorizeHttpRequests(req->req.anyRequest().authenticated());
        security.authorizeHttpRequests(req->req.requestMatchers("register-user","login").permitAll()
                .anyRequest().authenticated());
        security.httpBasic(Customizer.withDefaults()); // This enables to use the app from postman tool or others.
        security.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // This step makes the app stateless.
        return security.build();
    }

    /*@Bean // This method allows to login using only below mentioned users-Ron and Ronith.
    public UserDetailsService userDetailsService(){
    UserDetails user = User.withDefaultPasswordEncoder()
            .username("Ron")
            .password("ron123")
            .roles("USER")
            .build();
        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("Ronith")
                .password("ron1234")
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user,admin);
    }
*/

    @Bean // For getting user details from DB, we need to add implementation in below method.
    public AuthenticationProvider authenticationProvider(){
    DaoAuthenticationProvider daoAuth = new DaoAuthenticationProvider();
    daoAuth.setUserDetailsService(userDetailsService);
//    daoAuth.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
    daoAuth.setPasswordEncoder(new BCryptPasswordEncoder(10));
    return daoAuth;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

}
