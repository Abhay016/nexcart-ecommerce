package com.nexcart.services;
import com.nexcart.dto.CategoryResponseDTO;
import com.nexcart.dto.CategoryRequestDTO;
import com.nexcart.models.Category;

public interface CategoryService {
    CategoryResponseDTO<CategoryRequestDTO> getAllCategories(int pageNumber, int pageSize, String sortBy, String sortDirection);
    void createCategory(Category category);
    void updateCategory(Long id, Category category);
    String deleteCategory(Long categoryId);
}
