package com.nexcart.dto;

import com.nexcart.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

    private Long cartId;

    private CartDTO cartDTO;

    private Product product;

    private Integer quantity;

    private Double discount;

    private Double productPrice;
}
