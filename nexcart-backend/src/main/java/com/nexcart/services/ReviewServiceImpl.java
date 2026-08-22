package com.nexcart.services;

import com.nexcart.dto.ReviewDTO;
import com.nexcart.models.Product;
import com.nexcart.models.Review;
import com.nexcart.models.User;
import com.nexcart.repositories.ProductRepository;
import com.nexcart.repositories.ReviewRepository;
import com.nexcart.repositories.UserRepository;
import com.nexcart.utils.AuthUtils;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final AuthUtils authUtils;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             ProductRepository productRepository,
                             UserRepository userRepository,
                        AuthUtils authUtils) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.authUtils = authUtils;
    }

    @Override
    public ReviewDTO addReview(ReviewDTO reviewDto, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        Long userId = authUtils.loggedInUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Review review = Review.builder()
                .rating(reviewDto.getRating())
                .comment(reviewDto.getComment())
                .product(product)
                .user(user)
                .build();

        Review saved = reviewRepository.save(review);

        // Update product rating and review count
        updateProductRatingStats(product);

        return mapToDTO(saved);
    }

    @Override
    public List<ReviewDTO> getReviewsByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        return reviewRepository.findByProduct(product)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewDTO> getReviewsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        return reviewRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found"));

        Product product = review.getProduct();
        reviewRepository.delete(review);

        // Recalculate product rating after deletion
        updateProductRatingStats(product);
    }


    private void updateProductRatingStats(Product product) {
        List<Review> reviews = reviewRepository.findByProduct(product);

        double avgRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        product.setRating(avgRating);
        product.setReviewCount(reviews.size());
        productRepository.save(product);
    }

    private ReviewDTO mapToDTO(Review review) {
    return ReviewDTO.builder()
            .reviewId(review.getReviewId())
            .rating(review.getRating())
            .comment(review.getComment())
            .productId(review.getProduct().getProductId())
            .productName(review.getProduct().getProductName())
            .userId(review.getUser().getUserId())         
            .userName(review.getUser().getUsername())     
            .build();
}

}
