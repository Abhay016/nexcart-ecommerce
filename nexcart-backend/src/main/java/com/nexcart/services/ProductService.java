package com.nexcart.services;

import com.nexcart.dto.ProductResponseDTO;
import com.nexcart.models.Product;

public interface ProductService {
    ProductResponseDTO<Product> getAllProducts(int pageNumber, int pageSize, String sortBy, String sortDirection);
    Product getProductById(Long productId);
    void createProduct(Product product);
    void updateProduct(Long productId, Product product);
    void deleteProduct(Long productId);
}
