package com.nexcart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long productId;
    private String productName;
    private String description;
    private String image;          
    private Integer quantity;      
    private double price;         
    private double discount;       
    private double specialPrice;  
    private String brand;         
    private String sku;           
    private boolean isActive;      
    private boolean isFeatured;    
    private double rating;         
    private int reviewCount;       
    private String categoryName;   
}
