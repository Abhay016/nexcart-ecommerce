package com.nexcart.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexcart.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserUserId(Long userId);
}
