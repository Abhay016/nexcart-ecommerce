package com.nexcart.config;

import com.nexcart.security.JwtFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    private final JwtFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtFilter jwtFilter, UserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
        logger.info("SecurityConfig initialized with JwtFilter and UserDetailsService");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        logger.debug("Creating PasswordEncoder bean using BCryptPasswordEncoder");
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        logger.debug("Configuring DaoAuthenticationProvider with UserDetailsService and PasswordEncoder");
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        logger.info("DaoAuthenticationProvider configured successfully");
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        logger.debug("Building AuthenticationManager from AuthenticationConfiguration");
        AuthenticationManager manager = authConfig.getAuthenticationManager();
        logger.info("AuthenticationManager bean created successfully");
        return manager;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        logger.info("Starting SecurityFilterChain configuration");

        http
            .csrf(csrf -> {
                csrf.disable();
                logger.debug("CSRF protection disabled (using JWT stateless authentication)");
            })
            .sessionManagement(session -> {
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                logger.debug("Session management set to STATELESS");
            })
            .authorizeHttpRequests(authz -> {
                logger.debug("Configuring endpoint authorization rules");
                authz
                    .requestMatchers("/api/public/**").permitAll()
                    .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
                    .requestMatchers("/h2-console/**").permitAll()
                    .requestMatchers("/swagger-ui/**").permitAll()
                    .requestMatchers("/api/test/**").permitAll()
                    .requestMatchers("/images/**").permitAll()
                    .requestMatchers("/api/admin/**").hasRole("ADMIN")
                    .requestMatchers("/api/seller/**").hasRole("SELLER")
                    .anyRequest().authenticated();
                logger.info("Authorization rules applied: public, admin, seller, authenticated endpoints");
            })
            .exceptionHandling(exception -> {
                logger.debug("Configuring exception handling for unauthorized access");
                exception.authenticationEntryPoint((request, response, authException) -> {
                    logger.warn("Unauthorized access attempt: {}", authException.getMessage());
                    response.sendError(401, "Unauthorized - Please provide a valid JWT token");
                });
            })
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        logger.info("JwtFilter added before UsernamePasswordAuthenticationFilter");
        http.headers(headers -> {
            headers.frameOptions(frameOptions -> frameOptions.disable());
            logger.debug("H2 console iframe display allowed (frameOptions disabled)");
        });

        logger.info("SecurityFilterChain configuration completed successfully");
        return http.build();
    }
}
