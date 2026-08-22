package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Review;
import com.nexcart.models.Product;
import com.nexcart.models.User;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct(Product product);
    List<Review> findByUser(User user);
}