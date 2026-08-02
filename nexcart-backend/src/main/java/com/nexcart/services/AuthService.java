package com.nexcart.services;

import com.nexcart.dto.AuthResponseDTO;
import com.nexcart.dto.LoginRequestDTO;
import com.nexcart.dto.MessageResponse;
import com.nexcart.dto.RegisterRequestDTO;
import com.nexcart.dto.UserInfoResponse;
import com.nexcart.models.Role;
import com.nexcart.models.RoleName;
import com.nexcart.models.User;
import com.nexcart.repositories.RoleRepository;
import com.nexcart.repositories.UserRepository;
import com.nexcart.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private AuthenticationManager authenticationManager;

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private JwtUtils jwtUtils;
    
    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + loginRequest.getEmail()));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        String jwtToken = jwtUtils.generateToken(authentication);

        Set<String> roleNames = user.getRoles().stream()
                .map(role -> role.getRoleName().toString())
                .collect(Collectors.toSet());

        return new AuthResponseDTO(
                jwtToken,
                "Bearer",
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                roleNames,
                "User logged in successfully"
        );
    }

    public AuthResponseDTO register(RegisterRequestDTO registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("User already exists with email: " + registerRequest.getEmail());
        }

        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("User already exists with username: " + registerRequest.getUsername());
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        Role customerRole = roleRepository.findByRoleName(RoleName.CUSTOMER)
                .orElseThrow(() -> new RuntimeException("Default role not found"));

        Set<Role> roles = new HashSet<>();
        roles.add(customerRole);
        user.setRoles(roles);

        User registeredUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        registerRequest.getEmail(),
                        registerRequest.getPassword()
                )
        );

        String jwtToken = jwtUtils.generateToken(authentication);

        return new AuthResponseDTO(
                jwtToken,
                "Bearer",
                registeredUser.getUserId(),
                registeredUser.getUsername(),
                registeredUser.getEmail(),
                Set.of(RoleName.CUSTOMER.toString()),
                "User registered successfully"
        );
    }

    public String getCurrentUserName(Authentication authentication) {
        return (authentication != null) ? authentication.getName() : "";
    }

    public UserInfoResponse getUserDetails(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userDetails.getUsername()));

        List<String> roles = authentication.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return new UserInfoResponse(user.getUserId(), user.getUsername(), roles);
    }

    public MessageResponse signoutUser() {
        return new MessageResponse("You've been signed out!");
    }
}
