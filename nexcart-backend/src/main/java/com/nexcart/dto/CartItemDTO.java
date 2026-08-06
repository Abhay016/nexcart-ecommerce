package com.nexcart.dto;

import com.nexcart.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

    private Long cartItemId;

    private Long productId;

    private String productName;

    private Double price;

    private Double specialPrice;

    private Double discount;

    private Integer cartQuantity;

}
