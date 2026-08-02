package com.nexcart.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nexcart.services.CategoryService;
import jakarta.validation.Valid;
import com.nexcart.models.Category;
import com.nexcart.config.AppConstants;
import com.nexcart.dto.APIResponseDTO;
import com.nexcart.dto.CategoryResponseDTO;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponseDTO<Category>> getAllCategories(
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        CategoryResponseDTO<Category> response = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortDirection);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/category")
    public ResponseEntity<APIResponseDTO> createCategory(@Valid @RequestBody Category category) {
        categoryService.createCategory(category);
        APIResponseDTO response = new APIResponseDTO("Category created successfully", true);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/category/{id}")
    public ResponseEntity<APIResponseDTO> updateCategory(@PathVariable Long id, @Valid @RequestBody Category category) {
        categoryService.updateCategory(id, category);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + id + " updated successfully", true);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/category/{id}")
    public ResponseEntity<APIResponseDTO> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + id + " deleted successfully", true);
        return ResponseEntity.ok(response);
    }
}
