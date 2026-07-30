package com.nexcart.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nexcart.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);
    Optional<Category> findByCategoryNameAndCategoryIdNot(String categoryName, Long categoryId);
}
