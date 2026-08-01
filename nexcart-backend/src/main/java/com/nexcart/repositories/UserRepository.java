package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexcart.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
