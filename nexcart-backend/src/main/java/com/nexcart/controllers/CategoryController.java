package com.nexcart.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nexcart.models.Category;
import com.nexcart.services.CategoryService;
import jakarta.validation.Valid;
import com.nexcart.dto.CategoryResponseDTO;
import com.nexcart.dto.CategoryRequestDTO;
import com.nexcart.config.AppConstants;
import com.nexcart.dto.APIResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    private final ModelMapper modelMapper;

    public CategoryController(CategoryService categoryService, ModelMapper modelMapper) {
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponseDTO<CategoryRequestDTO>> getAllCategories(@RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
                                                           @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
                                                           @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
                                                           @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        CategoryResponseDTO<CategoryRequestDTO> categoryResponse = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortDirection);
        return ResponseEntity.ok(categoryResponse);
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<APIResponseDTO> createCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        Category category = modelMapper.map(categoryRequestDTO, Category.class);
        categoryService.createCategory(category);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + category.getCategoryId() + " created successfully", true);
        return ResponseEntity.status(201).body(response);
    }

    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<APIResponseDTO> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        Category category = modelMapper.map(categoryRequestDTO, Category.class);
        categoryService.updateCategory(id, category);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + id + " updated successfully", true);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<APIResponseDTO> deleteCategory(@PathVariable Long categoryId) {
        categoryService.deleteCategory(categoryId);
        APIResponseDTO response = new APIResponseDTO("Category with Id " + categoryId + " deleted successfully", true);
        return ResponseEntity.ok(response);
    }
}
