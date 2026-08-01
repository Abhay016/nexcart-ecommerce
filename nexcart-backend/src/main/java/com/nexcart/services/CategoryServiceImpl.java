package com.nexcart.services;

import java.util.List;
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

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponseDTO<Category> getAllCategories(int pageNumber, int pageSize, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Category> categoryPage = categoryRepository.findAll(pageable);

        List<Category> categories = categoryPage.getContent();
        if (categories.isEmpty()) {
            throw new APIException("No categories found", HttpStatus.NOT_FOUND.value());
        }

        return new CategoryResponseDTO<>(categories, categoryPage.getNumber(), categoryPage.getSize(), categoryPage.getTotalElements(),
                categoryPage.getTotalPages(), categoryPage.isFirst(), categoryPage.isLast(),
                sortBy, sortDirection);
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));
    }

    @Override
    public void createCategory(Category category) {
        validateCategoryRequest(category);

        String normalizedName = category.getCategoryName().trim();
        if (categoryRepository.findByCategoryName(normalizedName).isPresent()) {
            throw new APIException("Category already exists", HttpStatus.CONFLICT.value());
        }

        category.setCategoryName(normalizedName);
        categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Long categoryId, Category category) {
        validateCategoryRequest(category);

        Category existingCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));

        String normalizedName = category.getCategoryName().trim();
        if (categoryRepository.findByCategoryNameAndCategoryIdNot(normalizedName, categoryId).isPresent()) {
            throw new APIException("Category already exists", HttpStatus.CONFLICT.value());
        }

        existingCategory.setCategoryName(normalizedName);
        categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));
        categoryRepository.delete(category);
    }

    private void validateCategoryRequest(Category category) {
        if (category == null || category.getCategoryName() == null || category.getCategoryName().trim().isEmpty()) {
            throw new APIException("Category name is required", HttpStatus.BAD_REQUEST.value());
        }
    }
}
