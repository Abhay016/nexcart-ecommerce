package com.nexcart.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nexcart.dto.APIResponseDTO;
import com.nexcart.dto.CartItemRequestDTO;
import com.nexcart.dto.CartRequestDTO;
import com.nexcart.models.Cart;
import com.nexcart.services.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/cart")
    public ResponseEntity<Cart> createCart(@Valid @RequestBody CartRequestDTO request) {
        Cart cart = cartService.createCart(request.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(cart);
    }

    @GetMapping("/cart/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping("/cart/{cartId}/items")
    public ResponseEntity<Cart> addItemToCart(@PathVariable Long cartId, @Valid @RequestBody CartItemRequestDTO request) {
        Cart cart = cartService.addItemToCart(cartId, request.getProductId(), request.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED).body(cart);
    }

    @PutMapping("/cart/{cartId}/items/{itemId}")
    public ResponseEntity<Cart> updateCartItem(@PathVariable Long cartId, @PathVariable Long itemId, @Valid @RequestBody CartItemRequestDTO request) {
        Cart cart = cartService.updateCartItemQuantity(cartId, itemId, request.getQuantity());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/cart/{cartId}/items/{itemId}")
    public ResponseEntity<APIResponseDTO> removeCartItem(@PathVariable Long cartId, @PathVariable Long itemId) {
        cartService.removeCartItem(cartId, itemId);
        return ResponseEntity.ok(new APIResponseDTO("Cart item removed successfully", true));
    }
}
