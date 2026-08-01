package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Product;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductName(String productName);
    Optional<Product> findByProductNameAndProductIdNot(String productName, Long productId);
}
