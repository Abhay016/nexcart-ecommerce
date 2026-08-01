package com.nexcart.services;

import com.nexcart.dto.ProductResponseDTO;
import com.nexcart.models.Product;

public interface ProductService {
    ProductResponseDTO<Product> getAllProducts(int pageNumber, int pageSize, String sortBy, String sortDirection);
    Product getProductById(Long productId);
    ProductResponseDTO<Product> getProductsByCategory(long categoryId, int pageNumber, int pageSize, String sortBy, String sortDirection);
    ProductResponseDTO<Product> searchProductByKeyword(String keyword, int pageNumber, int pageSize, String sortBy, String sortDirection);
    long addProduct(Product product, long categoryId);
    void updateProduct(Long productId, Product product);
    void deleteProduct(Long productId);
}
