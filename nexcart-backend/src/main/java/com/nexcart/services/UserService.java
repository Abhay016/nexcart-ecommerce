package com.nexcart.services;

import com.nexcart.models.User;
import com.nexcart.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public Optional<User> findByEmail(String email) {
        logger.info("Looking up user by email={}", email);
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findByUsername(String username) {
        logger.info("Looking up user by username={}", username);
        return userRepository.findByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        boolean exists = userRepository.existsByEmail(email);
        logger.debug("User exists by email={} ? {}", email, exists);
        return exists;
    }
 
    public boolean existsByUsername(String username) {
        boolean exists = userRepository.existsByUsername(username);
        logger.debug("User exists by username={} ? {}", username, exists);
        return exists;
    }
    
    public User saveUser(User user) {
        logger.info("Saving user email={}", user.getEmail());
        return userRepository.save(user);
    }
}
