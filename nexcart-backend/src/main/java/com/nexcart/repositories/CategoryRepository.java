package com.nexcart.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
