package com.nexcart.services;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.dto.ProductResponseDTO;
import com.nexcart.models.Product;
import com.nexcart.models.Category;
import com.nexcart.repositories.CategoryRepository;
import com.nexcart.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponseDTO<Product> getAllProducts(int pageNumber, int pageSize, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findAll(pageable);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));
    }

    @Override
    public ProductResponseDTO<Product> getProductsByCategory(long categoryId, int pageNumber, int pageSize, String sortBy, String sortDirection) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findByCategory(category, pageable);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public ProductResponseDTO<Product> searchProductByKeyword(String keyword, int pageNumber, int pageSize, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findByProductNameLikeIgnoreCase('%' + keyword + '%', pageable);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public long addProduct(Product product, long categoryId) {
        validateProduct(product);

        String normalizedName = product.getProductName().trim();
        if (productRepository.findByProductName(normalizedName).isPresent()) {
            throw new APIException("Product already exists", HttpStatus.CONFLICT.value());
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", product.getCategory().getCategoryId()));

        product.setProductName(normalizedName);
        product.setImage("default.png");
        product.setCategory(category);
        double specialPrice = product.getPrice() -
                ((product.getDiscount() * 0.01) * product.getPrice());
        product.setSpecialPrice(specialPrice);
        productRepository.save(product);
        return product.getProductId();
    }

    @Override
    public void updateProduct(Long productId, Product product) {
        validateProduct(product);

        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));

        String normalizedName = product.getProductName().trim();
        if (productRepository.findByProductNameAndProductIdNot(normalizedName, productId).isPresent()) {
            throw new APIException("Product already exists", HttpStatus.CONFLICT.value());
        }


        Category category = categoryRepository.findById(product.getCategory().getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", product.getCategory().getCategoryId()));

        existingProduct.setProductName(normalizedName);
        existingProduct.setDescription(product.getDescription());
        existingProduct.setImage(product.getImage());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDiscount(product.getDiscount());
        double specialPrice = product.getPrice() -
                ((product.getDiscount() * 0.01) * product.getPrice());
        product.setSpecialPrice(specialPrice);
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setCategory(category);
        productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));
        productRepository.delete(product);
    }

    private void validateProduct(Product product) {
        if (product == null || product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            throw new APIException("Product name is required", HttpStatus.BAD_REQUEST.value());
        }
        if (product.getPrice() == null) {
            throw new APIException("Product price is required", HttpStatus.BAD_REQUEST.value());
        }
    }
}
