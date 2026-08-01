package com.nexcart.services;

import com.nexcart.dto.CategoryResponseDTO;
import com.nexcart.models.Category;

public interface CategoryService {
    CategoryResponseDTO<Category> getAllCategories(int pageNumber, int pageSize, String sortBy, String sortDirection);
    Category getCategoryById(Long categoryId);
    void createCategory(Category category);
    void updateCategory(Long categoryId, Category category);
    void deleteCategory(Long categoryId);
}
