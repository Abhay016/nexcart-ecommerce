package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexcart.models.OrderItems;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
}
