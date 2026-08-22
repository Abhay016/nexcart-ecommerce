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
import org.springframework.web.multipart.MultipartFile;

import com.nexcart.services.ProductService;
import jakarta.validation.Valid;
import com.nexcart.models.Product;
import com.nexcart.common.AppConstants;
import com.nexcart.dto.APIResponseDTO;
import com.nexcart.dto.ProductResponseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.nexcart.dto.ProductDTO; 

@RestController
@RequestMapping("/api")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping("/public/products")
    public ResponseEntity<ProductResponseDTO<ProductDTO>> getAllProducts(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY_PRODUCTID) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        logger.info("Fetching all products page={} size={} sortBy={} direction={}", pageNumber, pageSize, sortBy, sortDirection);
        ProductResponseDTO<ProductDTO> productResponse = productService.getAllProducts(pageNumber, pageSize, sortBy, sortDirection, keyword, category);
        logger.debug("Fetched {} products", productResponse.getContent().size());
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        logger.info("Fetching product by id={}", id);
        ProductDTO product = productService.getProductById(id);
        logger.debug("Product {} retrieved", id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/public/categories/{categoryName}/products")
    public ResponseEntity<ProductResponseDTO<ProductDTO>> getProductsByCategory(
            @PathVariable String categoryName,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY_PRODUCTID) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection) {
        logger.info("Fetching products for category {} page={} size={} sortBy={} direction={}", categoryName, pageNumber, pageSize, sortBy, sortDirection);
        ProductResponseDTO<ProductDTO> productResponse = productService.getProductsByCategory(categoryName, pageNumber, pageSize, sortBy, sortDirection);
        logger.debug("Fetched {} products for category {}", productResponse.getContent().size(), categoryName);
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponseDTO<ProductDTO>> getProductsByKeyword(@PathVariable String keyword,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_BY_PRODUCTID) String sortBy,
            @RequestParam(defaultValue = AppConstants.DEFAULT_SORT_DIRECTION) String sortDirection){
        logger.info("Searching products by keyword '{}' page={} size={} sortBy={} direction={}", keyword, pageNumber, pageSize, sortBy, sortDirection);
        ProductResponseDTO<ProductDTO> productResponse = productService.searchProductByKeyword(keyword, pageNumber, pageSize, sortBy, sortDirection);
        logger.debug("Search returned {} products for keyword {}", productResponse.getContent().size(), keyword);
        return ResponseEntity.ok(productResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<APIResponseDTO> addProduct(@Valid @RequestBody Product product, @PathVariable Long categoryId) {
        logger.info("Adding new product '{}' under category {}", product.getProductName(), categoryId);
        long id = productService.addProduct(product, categoryId);
        logger.debug("Product created with id {}", id);
        APIResponseDTO response = new APIResponseDTO("Product with Id " + id + " created successfully", true);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/products/{id}")
    public ResponseEntity<APIResponseDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody Product product) {
        logger.info("Updating product id {}", id);
        productService.updateProduct(id, product);
        logger.debug("Product {} updated successfully", id);
        APIResponseDTO response = new APIResponseDTO("Product with Id " + id + " updated successfully", true);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/products/{id}")
    public ResponseEntity<APIResponseDTO> deleteProduct(@PathVariable Long id) {
        logger.info("Deleting product id {}", id);
        productService.deleteProduct(id);
        logger.debug("Product {} deleted successfully", id);
        APIResponseDTO response = new APIResponseDTO("Product with Id " + id + " deleted successfully", true);
        return ResponseEntity.ok(response);
    }

    @PutMapping("product/{id}/image")
    public ResponseEntity<ProductDTO> uploadProductImage(@PathVariable Long id, @RequestParam("image") MultipartFile image) {
        ProductDTO product = productService.uploadProductImage(id, image);
        return ResponseEntity.ok(product);
    }
}
