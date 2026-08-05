package com.nexcart.services;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.dto.CategoryResponseDTO;
import com.nexcart.models.Category;
import com.nexcart.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryServiceImpl.class);

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponseDTO<Category> getAllCategories(int pageNumber, int pageSize, String sortBy, String sortDirection) {
        logger.info("Fetching categories page={} size={} sortBy={} direction={}", pageNumber, pageSize, sortBy, sortDirection);
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Category> categoryPage = categoryRepository.findAll(pageable);

        List<Category> categories = categoryPage.getContent();
        if (categories.isEmpty()) {
            logger.warn("No categories found for page request");
            throw new APIException("No categories found", HttpStatus.NOT_FOUND.value());
        }

        return new CategoryResponseDTO<>(categories, categoryPage.getNumber(), categoryPage.getSize(), categoryPage.getTotalElements(),
                categoryPage.getTotalPages(), categoryPage.isFirst(), categoryPage.isLast(),
                sortBy, sortDirection);
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        logger.info("Fetching category by id={}", categoryId);
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> {
                    logger.warn("Category not found id={}", categoryId);
                    return new ResourceNotFoundException("Category", "Category ID", categoryId);
                });
    }

    @Override
    public void createCategory(Category category) {
        logger.info("Creating category with name={}", category.getCategoryName());
        validateCategoryRequest(category);

        String normalizedName = category.getCategoryName().trim();
        if (categoryRepository.findByCategoryName(normalizedName).isPresent()) {
            logger.warn("Category creation failed, already exists: {}", normalizedName);
            throw new APIException("Category already exists", HttpStatus.CONFLICT.value());
        }

        category.setCategoryName(normalizedName);
        categoryRepository.save(category);
        logger.debug("Category created: {}", normalizedName);
    }

    @Override
    public void updateCategory(Long categoryId, Category category) {
        logger.info("Updating category id={}", categoryId);
        validateCategoryRequest(category);

        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));

        String normalizedName = category.getCategoryName().trim();
        if (categoryRepository.findByCategoryNameAndCategoryIdNot(normalizedName, categoryId).isPresent()) {
            logger.warn("Category update failed, name conflict for {}", normalizedName);
            throw new APIException("Category already exists", HttpStatus.CONFLICT.value());
        }

        existingCategory.setCategoryName(normalizedName);
        categoryRepository.save(existingCategory);
        logger.debug("Category updated id={} name={}", categoryId, normalizedName);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        logger.info("Deleting category id={}", categoryId);
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));
        categoryRepository.delete(category);
        logger.debug("Category deleted id={}", categoryId);
    }

    private void validateCategoryRequest(Category category) {
        if (category == null || category.getCategoryName() == null || category.getCategoryName().trim().isEmpty()) {
            logger.warn("Invalid category request: missing name");
            throw new APIException("Category name is required", HttpStatus.BAD_REQUEST.value());
        }
    }
}
