package com.nexcart.services;
import java.util.List;

import com.nexcart.models.Category;

public interface CategoryService {
    List<Category> getAllCategories();
    void createCategory(Category category);
    void updateCategory(Long id, Category category);
    String deleteCategory(Long categoryId);
}
