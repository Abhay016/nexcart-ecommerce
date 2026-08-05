package com.nexcart.security;

import com.nexcart.models.User;
import com.nexcart.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.stream.Collectors;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Loading user by email={}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.warn("User not found with email={}", email);
                    return new UsernameNotFoundException("User not found with email: " + email);
                });
        
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                getAuthorities(user)
        );
    }

    private Collection<GrantedAuthority> getAuthorities(User user) {
        Collection<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> "ROLE_" + role.getRoleName().toString())
                .filter(role -> role.startsWith("ROLE_"))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        logger.debug("User email={} mapped roles={} final authorities={}", 
                    user.getEmail(), 
                    user.getRoles().stream().map(r -> r.getRoleName()).toList(),
                    authorities);

        return authorities;
    }
}
