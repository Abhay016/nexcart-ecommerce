package com.nexcart.services;

import com.nexcart.dto.CartDTO;
import com.nexcart.dto.CartItemDTO;

import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface CartService {
    String createOrUpdateCartWithItems(List<CartItemDTO> cartItems);

    CartDTO addProductToCart(Long productId, Integer quantity);

    List<CartDTO> getAllCarts();

    CartDTO getCart(String emailId, Long cartId);

    @Transactional
    CartDTO updateProductQuantityInCart(Long productId, Integer quantity);

    String deleteProductFromCart(Long productId);

    void updateProductInCarts(Long cartId, Long productId);
}
