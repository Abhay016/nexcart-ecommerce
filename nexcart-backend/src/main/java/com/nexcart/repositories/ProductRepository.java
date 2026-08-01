package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Product;
import java.util.Optional;
import com.nexcart.models.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductName(String productName);
    Optional<Product> findByProductNameAndProductIdNot(String productName, Long productId);
    Page<Product> findByCategory(Category category, Pageable pageable);
    Page<Product> findByProductNameLikeIgnoreCase(String keyword, Pageable pageable);
}
