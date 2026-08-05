package com.nexcart.controllers;

import com.nexcart.dto.AuthResponseDTO;
import com.nexcart.dto.LoginRequestDTO;
import com.nexcart.dto.MessageResponse;
import com.nexcart.dto.RegisterRequestDTO;
import com.nexcart.dto.UserInfoResponse;
import com.nexcart.security.JwtUtils;
import com.nexcart.services.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final JwtUtils jwtUtils;

    public AuthController(AuthService authService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        logger.info("Attempting login for email: {}", loginRequest.getEmail());
        try {
            AuthResponseDTO response = authService.login(loginRequest);
            ResponseCookie cookie = jwtUtils.generateJwtCookie(response.getToken());
            logger.info("Login successful for email: {}", loginRequest.getEmail());
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(response);
        } catch (RuntimeException ex) {
            logger.warn("Login failed for email {}: {}", loginRequest.getEmail(), ex.getMessage());
            AuthResponseDTO errorResponse = new AuthResponseDTO();
            errorResponse.setMessage("Login failed: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        logger.info("Registering user with email: {} and username: {}", registerRequest.getEmail(), registerRequest.getUsername());
        try {
            AuthResponseDTO response = authService.register(registerRequest);
            ResponseCookie cookie = jwtUtils.generateJwtCookie(response.getToken());
            logger.info("Registration successful for email: {}", registerRequest.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(response);
        } catch (RuntimeException ex) {
            logger.warn("Registration failed for email {}: {}", registerRequest.getEmail(), ex.getMessage());
            AuthResponseDTO errorResponse = new AuthResponseDTO();
            errorResponse.setMessage("Registration failed: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/username")
    public ResponseEntity<String> currentUserName(Authentication authentication) {
        logger.debug("Fetching current username from authentication object");
        return ResponseEntity.ok(authService.getCurrentUserName(authentication));
    }

    @GetMapping("/user")
    public ResponseEntity<UserInfoResponse> getUserDetails(Authentication authentication) {
        logger.info("Fetching current user details");
        return ResponseEntity.ok(authService.getUserDetails(authentication));
    }

    @PostMapping("/logout")
    public ResponseEntity<MessageResponse> signoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(authService.signoutUser());
    }
}
