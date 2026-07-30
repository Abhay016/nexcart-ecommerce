package com.nexcart.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.models.Category;
import com.nexcart.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            throw new APIException("No categories found", HttpStatus.NOT_FOUND.value());
        }
        return categories;
    }

    @Override
    public void createCategory(Category category) {
        validateCategory(category);

        String normalizedName = category.getCategoryName().trim();
        if (categoryRepository.findByCategoryName(normalizedName).isPresent()) {
            throw new APIException("Category already exists", HttpStatus.CONFLICT.value());
        }

        category.setCategoryName(normalizedName);
        categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Long categoryId, Category category) {
        validateCategory(category);

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
    public String deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));
        categoryRepository.delete(category);
        return "Category with ID " + categoryId + " deleted successfully";
    }

    private void validateCategory(Category category) {
        if (category == null || category.getCategoryName() == null || category.getCategoryName().trim().isEmpty()) {
            throw new APIException("Category name is required", HttpStatus.BAD_REQUEST.value());
        }
    }
}
