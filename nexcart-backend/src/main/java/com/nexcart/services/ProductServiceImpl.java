package com.nexcart.services;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponseDTO<Product> getAllProducts(int pageNumber, int pageSize, String sortBy, String sortDirection) {
        logger.info("Fetching products page={} size={} sortBy={} direction={}", pageNumber, pageSize, sortBy, sortDirection);
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findAll(pageable);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            logger.warn("No products found for the specified page criteria");
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public Product getProductById(Long productId) {
        logger.info("Fetching product by id={}", productId);
        return productRepository.findById(productId)
                .orElseThrow(() -> {
                    logger.warn("Product not found id={}", productId);
                    return new ResourceNotFoundException("Product", "Product ID", productId);
                });
    }

    @Override
    public ProductResponseDTO<Product> getProductsByCategory(long categoryId, int pageNumber, int pageSize, String sortBy, String sortDirection) {
        logger.info("Fetching products for category {} page={} size={} sortBy={} direction={}", categoryId, pageNumber, pageSize, sortBy, sortDirection);
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findByCategory(category, pageable);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            logger.warn("No products found in category {}", categoryId);
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public ProductResponseDTO<Product> searchProductByKeyword(String keyword, int pageNumber, int pageSize, String sortBy, String sortDirection) {
        logger.info("Searching products by keyword='{}' page={} size={} sortBy={} direction={}", keyword, pageNumber, pageSize, sortBy, sortDirection);
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findByProductNameLikeIgnoreCase('%' + keyword + '%', pageable);

        List<Product> products = productPage.getContent();
        if (products.isEmpty()) {
            logger.warn("No products found matching keyword {}", keyword);
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public long addProduct(Product product, long categoryId) {
        logger.info("Adding product '{}', categoryId={}", product.getProductName(), categoryId);
        validateProduct(product);

        String normalizedName = product.getProductName().trim();
        if (productRepository.findByProductName(normalizedName).isPresent()) {
            logger.warn("Product creation failed, already exists: {}", normalizedName);
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
        logger.debug("Product '{}' created with id {}", normalizedName, product.getProductId());
        return product.getProductId();
    }

    @Override
    public void updateProduct(Long productId, Product product) {
        logger.info("Updating product id {}", productId);
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
        logger.debug("Product updated id {}", productId);
    }

    @Override
    public void deleteProduct(Long productId) {
        logger.info("Deleting product id {}", productId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));
        productRepository.delete(product);
        logger.debug("Product deleted id {}", productId);
    }

    private void validateProduct(Product product) {
        if (product == null || product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            logger.warn("Invalid product request: missing product name");
            throw new APIException("Product name is required", HttpStatus.BAD_REQUEST.value());
        }
        if (product.getPrice() == null) {
            logger.warn("Invalid product request: missing price for product={}", product.getProductName());
            throw new APIException("Product price is required", HttpStatus.BAD_REQUEST.value());
        }
    }
}
