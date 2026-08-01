package com.nexcart.services;

import java.util.List;

import com.nexcart.models.Cart;
import com.nexcart.models.CartItems;

public interface CartService {
    Cart createCart(Long userId);
    Cart getCartByUserId(Long userId);
    Cart addItemToCart(Long cartId, Long productId, Integer quantity);
    Cart updateCartItemQuantity(Long cartId, Long cartItemId, Integer quantity);
    void removeCartItem(Long cartId, Long cartItemId);
    Cart getCartById(Long cartId);
}
