package com.nexcart.services;

import com.nexcart.models.User;
import com.nexcart.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
 
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
