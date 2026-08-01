package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexcart.models.CartItems;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
}
