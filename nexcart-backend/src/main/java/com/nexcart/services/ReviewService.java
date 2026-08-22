package com.nexcart.services;

import com.nexcart.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {

    ReviewDTO addReview(ReviewDTO reviewDto, Long productId);

    List<ReviewDTO> getReviewsByProduct(Long productId);

    List<ReviewDTO> getReviewsByUser(Long userId);

    void deleteReview(Long reviewId);
}
