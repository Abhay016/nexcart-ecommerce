package com.nexcart.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserUserId(Long userId);
}
