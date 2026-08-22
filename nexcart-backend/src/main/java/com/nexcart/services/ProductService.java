package com.nexcart.services;

import com.nexcart.dto.ProductResponseDTO;
import com.nexcart.models.Product;
import org.springframework.web.multipart.MultipartFile;
import com.nexcart.dto.ProductDTO;

public interface ProductService {
    ProductResponseDTO<ProductDTO> getAllProducts(int pageNumber, int pageSize, String sortBy, String sortDirection, String keyword, String category);
    ProductDTO getProductById(Long productId);
    ProductResponseDTO<ProductDTO> getProductsByCategory(String categoryName, int pageNumber, int pageSize, String sortBy, String sortDirection);
    ProductResponseDTO<ProductDTO> searchProductByKeyword(String keyword, int pageNumber, int pageSize, String sortBy, String sortDirection);
    long addProduct(Product product, long categoryId);
    void updateProduct(Long productId, Product product);
    void deleteProduct(Long productId);
    ProductDTO uploadProductImage(Long productId, MultipartFile imageFile);
}
