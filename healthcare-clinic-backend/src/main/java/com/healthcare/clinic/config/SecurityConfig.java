package com.healthcare.clinic.config;

import com.healthcare.clinic.security.JwtAuthenticationEntryPoint;
import com.healthcare.clinic.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private UserDetailsService userDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

   /* @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails admin = User.withUsername("admin")
                .password(encoder.encode("admin123"))
                .roles("ADMIN")
                .build();
        UserDetails user = User.withUsername("user")
                .password(encoder.encode("user123"))
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(admin, user);
    }*/

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//       This works for basic authentication.
        /* http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/api/auth/**").permitAll()
                        .requestMatchers("/api/patients/**", "/api/doctors/**", "/api/appointments/**").hasAnyRole("ADMIN","USER")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .headers(h -> h.frameOptions(f -> f.sameOrigin()));
        return http.build();*/

        //Below code for Jwt Authentication.
        /*This block defines authorization rules for incoming HTTP requests.
                   authorize.requestMatchers("/api/auth/**").permitAll();
            → Any request to endpoints starting with /api/auth/ (like login, register) is allowed without authentication.
        authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
            → All OPTIONS requests are permitted. This is important for CORS preflight requests in browsers.
                authorize.anyRequest().authenticated();
            → Every other request must be authenticated (i.e., the user must provide valid credentials or a JWT).*/
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authorize) -> {
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    authorize.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll();
                    authorize.anyRequest().authenticated();
                }).httpBasic(Customizer.withDefaults());
        // This step makes the app stateless.
        http.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        /*
        Configures custom exception handling.
    jwtAuthenticationEntryPoint is a custom class that handles authentication errors (e.g., when a user tries to access a protected resource without a valid JWT).
    Instead of redirecting to a login page (default behavior), it likely returns a JSON error response like 401 Unauthorized.
         */
        http.exceptionHandling( exception -> exception
                .authenticationEntryPoint(jwtAuthenticationEntryPoint));

        /*Adds a custom JWT filter before Spring Security’s built-in UsernamePasswordAuthenticationFilter.
        The jwtAuthenticationFilter:
        Extracts the JWT token from the request header.
        Validates it.
        Sets the authentication in the SecurityContext if valid.*/
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
