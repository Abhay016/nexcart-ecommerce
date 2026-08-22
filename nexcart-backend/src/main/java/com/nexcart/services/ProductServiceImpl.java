package com.nexcart.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import com.nexcart.dto.ProductDTO;
import com.nexcart.dto.ProductResponseDTO;
import com.nexcart.exceptions.APIException;
import com.nexcart.exceptions.ResourceNotFoundException;
import com.nexcart.models.Product;
import com.nexcart.models.Category;
import com.nexcart.repositories.CategoryRepository;
import com.nexcart.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponseDTO<ProductDTO> getAllProducts(int pageNumber, int pageSize, String sortBy, String sortDirection, String keyword, String category) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Specification<Product> spec = (root, query, cb) -> cb.conjunction();

        if (keyword != null && !keyword.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
        }

        if (category != null && !category.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("category").get("categoryName"), category));
        }

        Page<Product> productPage = productRepository.findAll(spec, pageable);
        List<ProductDTO> products = productPage.getContent().stream().map(this::mapToDTO).toList();

        if (products.isEmpty()) {
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<ProductDTO>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public ProductDTO getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));
        return mapToDTO(product);
    }

    @Override
    public ProductResponseDTO<ProductDTO> getProductsByCategory(String categoryName, int pageNumber, int pageSize, String sortBy, String sortDirection) {
        Category category = categoryRepository.findByCategoryName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category Name", categoryName));

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findByCategory(category, pageable);

        List<ProductDTO> products = productPage.getContent().stream().map(this::mapToDTO).toList();
        if (products.isEmpty()) {
            throw new APIException("No products found", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<ProductDTO>(products, productPage.getNumber(), 3, productPage.getTotalElements(),
                productPage.getTotalPages(), productPage.isFirst(), productPage.isLast(), sortBy, sortDirection);
    }

    @Override
    public ProductResponseDTO<ProductDTO> searchProductByKeyword(String keyword, int pageNumber, int pageSize, String sortBy, String sortDirection) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Product> productPage = productRepository.findByProductNameLikeIgnoreCase('%' + keyword + '%', pageable);

        List<ProductDTO> products = productPage.getContent().stream().map(this::mapToDTO).toList();
        if (products.isEmpty()) {
            throw new APIException("No products found matching keyword: '" + keyword + "'", HttpStatus.NOT_FOUND.value());
        }

        return new ProductResponseDTO<ProductDTO>(products, productPage.getNumber(), productPage.getSize(), productPage.getTotalElements(),
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
                .orElseThrow(() -> new ResourceNotFoundException("Category", "Category ID", categoryId));

        product.setProductName(normalizedName);
        product.setCategory(category);
        product.setImage(product.getImage() != null ? product.getImage() : "default.png");
        product.setIsActive(true);
        product.setIsFeatured(false);
        product.setRating(0.0);
        product.setReviewCount(0);

        double specialPrice = product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice());
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

        existingProduct.setProductName(normalizedName);
        existingProduct.setDescription(product.getDescription());
        existingProduct.setImage(product.getImage());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setDiscount(product.getDiscount());
        existingProduct.setSpecialPrice(product.getPrice() - ((product.getDiscount() * 0.01) * product.getPrice()));
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setSku(product.getSku());
        existingProduct.setIsActive(product.getIsActive());
        existingProduct.setIsFeatured(product.getIsFeatured());

        productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));
        // Soft delete
        product.setIsActive(false);
        productRepository.save(product);
    }

    @Override
    public ProductDTO uploadProductImage(Long productId, MultipartFile imageFile) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));

        String path = System.getProperty("user.dir") + File.separator + "nexcart-backend" 
              + File.separator + "uploads" + File.separator + "images";

        logger.info("Uploading image to path {}", path);
        
        String fileName = uploadImage(path, imageFile);
        product.setImage(fileName);
        Product updatedProduct = productRepository.save(product);
        return mapToDTO(updatedProduct);
        
    }

    private void validateProduct(Product product) {
        if (product == null || product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            throw new APIException("Product name is required", HttpStatus.BAD_REQUEST.value());
        }
        if (product.getPrice() == null) {
            throw new APIException("Product price is required", HttpStatus.BAD_REQUEST.value());
        }
        if (product.getSku() == null || product.getSku().trim().isEmpty()) {
            throw new APIException("Product SKU is required", HttpStatus.BAD_REQUEST.value());
        }
    }

    private ProductDTO mapToDTO(Product product) {
        return new ProductDTO(
                product.getProductId(),
                product.getProductName(),
                product.getDescription(),
                product.getImage(),
                product.getQuantity(),
                product.getPrice(),
                product.getDiscount(),
                product.getSpecialPrice(),
                product.getBrand(),
                product.getSku(),
                product.getIsActive(),
                product.getIsFeatured(),
                product.getRating(),
                product.getReviewCount(),
                product.getCategory() != null ? product.getCategory().getCategoryName() : null
        );
    }

    private String uploadImage(String path, MultipartFile imageFile) {
        String originalFileName = imageFile.getOriginalFilename();
        String randomId = UUID.randomUUID().toString();
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String fileName = randomId + extension;
        Path filePath = Paths.get(path + File.separator + fileName);
        try {
            File folder = new File(path);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (IOException e) {
            throw new APIException("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
        return fileName;
    }
}
