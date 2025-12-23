package com.telusko.SpringSecurity.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailService;

   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(customizer->customizer.disable());
    http.authorizeHttpRequests(request->request.anyRequest().authenticated());
    http.httpBasic(Customizer.withDefaults());
    http.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    return http.build();
    }

    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();

        daoAuthenticationProvider.setUserDetailsService(userDetailService);
//        daoAuthenticationProvider.setPasswordEncoder(NoOpPasswordEncoder.getInstance());
        daoAuthenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder(10));
        return daoAuthenticationProvider;
    }

//    public AuthenticationManager authenticationManager(
//            HttpSecurity http,
//            PasswordEncoder passwordEncoder,
//            UserDetailsService userDetailsService) throws  Exception{
//       AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
//       builder.userDetailsService(userDetailsService)
//               .passwordEncoder(NoOpPasswordEncoder.getInstance());
//    }
//    )

   /* @Bean - This won't cannot connect to DB and is ok for simple POC purposes, we need AuthenticationProvider if we want to connect to DB.
    public UserDetailsService userDetailsService(){
       UserDetails user = User.withDefaultPasswordEncoder()
               .username("ronith")
               .password("ron123")
               .roles("USER")
               .build();
        UserDetails admin = User.withDefaultPasswordEncoder()
                .username("raj")
                .password("ron1234")
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user,admin);
    }*/
}
