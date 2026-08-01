package com.nexcart.services;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.dto.CategoryResponseDTO;
import com.nexcart.models.Category;
import com.nexcart.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import com.nexcart.dto.CategoryRequestDTO;
import com.nexcart.config.AppConstants;


@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private ModelMapper modelMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public CategoryResponseDTO<CategoryRequestDTO> getAllCategories(@RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
                                                                    @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
                                                                    @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
                                                                    @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Category> categoryPage = categoryRepository.findAll(pageable);

        List<Category> categories = categoryPage.getContent();
        if (categories.isEmpty()) {
            throw new APIException("No categories found", HttpStatus.NOT_FOUND.value());
        }
        List<CategoryRequestDTO> categoryDTOs = categories.stream()
                .map(category -> modelMapper.map(category, CategoryRequestDTO.class))
                .toList();
        return new CategoryResponseDTO<>(categoryDTOs, categoryPage.getNumber(), categoryPage.getSize(), categoryPage.getTotalElements(),
                categoryPage.getTotalPages(), categoryPage.isFirst(), categoryPage.isLast(),
                sortBy, sortDirection);
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
