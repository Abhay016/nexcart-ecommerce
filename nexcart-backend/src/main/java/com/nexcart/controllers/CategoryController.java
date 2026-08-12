package com.nexcart.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponseDTO<Category>> getAllCategories(
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = "categoryId") String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        logger.info("Fetching categories page={} size={} sortBy={} direction={}", pageNumber, pageSize, sortBy, sortDirection);
        CategoryResponseDTO<Category> response = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortDirection);
        logger.debug("Fetched {} categories", response.getContent().size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/public/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        logger.info("Fetching category by id={}", id);
        Category category = categoryService.getCategoryById(id);
        logger.debug("Category {} retrieved", id);
        return ResponseEntity.ok(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/category")
    public ResponseEntity<APIResponseDTO> createCategory(@Valid @RequestBody Category category) {
        logger.info("Creating new category '{}'", category.getCategoryName());
        categoryService.createCategory(category);
        logger.debug("Category '{}' created successfully", category.getCategoryName());
        APIResponseDTO response = new APIResponseDTO("Category created successfully", true);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<APIResponseDTO> updateCategory(@PathVariable Long id, @Valid @RequestBody Category category) {
        logger.info("Updating category id {}", id);
        categoryService.updateCategory(id, category);
        logger.debug("Category {} updated successfully", id);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + id + " updated successfully", true);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/categories/{id}")
    public ResponseEntity<APIResponseDTO> deleteCategory(@PathVariable Long id) {
        logger.info("Deleting category id {}", id);
        categoryService.deleteCategory(id);
        logger.debug("Category {} deleted successfully", id);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + id + " deleted successfully", true);
        return ResponseEntity.ok(response);
    }
}
