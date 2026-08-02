package com.nexcart.services;

import com.nexcart.models.Cart;

public interface CartService {
    Cart createCart(Long userId);
    Cart getCartByUserId(Long userId);
    Cart addItemToCart(Long cartId, Long productId, Integer quantity);
    Cart updateCartItemQuantity(Long cartId, Long cartItemId, Integer quantity);
    void removeCartItem(Long cartId, Long cartItemId);
    Cart getCartById(Long cartId);
}
