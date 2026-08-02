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
import com.nexcart.services.ProductService;
import jakarta.validation.Valid;
import com.nexcart.models.Product;
import com.nexcart.config.AppConstants;
import com.nexcart.dto.APIResponseDTO;
import com.nexcart.dto.ProductResponseDTO;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping("/public/products")
    public ResponseEntity<ProductResponseDTO<Product>> getAllProducts(
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        ProductResponseDTO<Product> productResponse = productService.getAllProducts(pageNumber, pageSize, sortBy, sortDirection);
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponseDTO<Product>> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        ProductResponseDTO<Product> productResponse = productService.getProductsByCategory(categoryId, pageNumber, pageSize, sortBy, sortDirection);
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponseDTO<Product>> getProductsByKeyword(@PathVariable String keyword,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection){
        ProductResponseDTO<Product> productResponse = productService.searchProductByKeyword(keyword, pageNumber, pageSize, sortBy, sortDirection);
        return ResponseEntity.ok(productResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<APIResponseDTO> addProduct(@Valid @RequestBody Product product, @PathVariable Long categoryId) {
        long id = productService.addProduct(product, categoryId);
        APIResponseDTO response = new APIResponseDTO("Product with Id " + id + " created successfully", true);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/products/{id}")
    public ResponseEntity<APIResponseDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        productService.updateProduct(id, product);
        APIResponseDTO response = new APIResponseDTO("Product with Id " + id + " updated successfully", true);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<APIResponseDTO> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        APIResponseDTO response = new APIResponseDTO("Product with Id " + id + " deleted successfully", true);
        return ResponseEntity.ok(response);
    }
}
