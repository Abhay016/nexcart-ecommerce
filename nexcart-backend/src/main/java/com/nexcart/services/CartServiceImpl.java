package com.nexcart.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.models.Cart;
import com.nexcart.models.CartItems;
import com.nexcart.models.Product;
import com.nexcart.models.User;
import com.nexcart.repositories.CartItemsRepository;
import com.nexcart.repositories.CartRepository;
import com.nexcart.repositories.ProductRepository;
import com.nexcart.repositories.UserRepository;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemsRepository cartItemsRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository, CartItemsRepository cartItemsRepository,
            ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Cart createCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "User ID", userId));

        if (cartRepository.findByUserUserId(userId).isPresent()) {
            throw new APIException("Cart already exists for this user", HttpStatus.CONFLICT.value());
        }

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setDiscount(0.0);
        cart.setTotalPrice(0.0);
        cart.setItems(new HashSet<>());
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "User ID", userId));
    }

    @Override
    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "Cart ID", cartId));
    }

    @Override
    public Cart addItemToCart(Long cartId, Long productId, Integer quantity) {
        Cart cart = getCartById(cartId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", productId));

        if (quantity == null || quantity < 1) {
            throw new APIException("Quantity must be at least 1", HttpStatus.BAD_REQUEST.value());
        }

        Optional<CartItems> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct() != null && item.getProduct().getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItems item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            item.setProductPrice(product.getSpecialPrice() != null ? product.getSpecialPrice() : product.getPrice());
            cartItemsRepository.save(item);
        } else {
            CartItems item = new CartItems();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setProductPrice(product.getSpecialPrice() != null ? product.getSpecialPrice() : product.getPrice());
            cart.getItems().add(cartItemsRepository.save(item));
        }

        recalculateCartTotals(cart);
        return cartRepository.save(cart);
    }

    @Override
    public Cart updateCartItemQuantity(Long cartId, Long cartItemId, Integer quantity) {
        Cart cart = getCartById(cartId);
        CartItems item = cart.getItems().stream()
                .filter(existingItem -> existingItem.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item", "Cart item ID", cartItemId));

        if (quantity == null || quantity < 1) {
            throw new APIException("Quantity must be at least 1", HttpStatus.BAD_REQUEST.value());
        }

        item.setQuantity(quantity);
        cartItemsRepository.save(item);
        recalculateCartTotals(cart);
        return cartRepository.save(cart);
    }

    @Override
    public void removeCartItem(Long cartId, Long cartItemId) {
        Cart cart = getCartById(cartId);
        CartItems item = cart.getItems().stream()
                .filter(existingItem -> existingItem.getCartItemId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item", "Cart item ID", cartItemId));

        cart.getItems().remove(item);
        cartItemsRepository.delete(item);
        recalculateCartTotals(cart);
        cartRepository.save(cart);
    }

    private void recalculateCartTotals(Cart cart) {
        double total = 0.0;
        double discount = 0.0;

        if (cart.getItems() != null) {
            for (CartItems item : cart.getItems()) {
                double unitPrice = item.getProductPrice();
                double itemTotal = unitPrice * item.getQuantity();
                total += itemTotal;
                discount += (item.getProduct() != null && item.getProduct().getDiscount() != null) ? item.getProduct().getDiscount() * item.getQuantity() : 0.0;
            }
        }

        cart.setTotalPrice(total);
        cart.setDiscount(discount);
    }
}
