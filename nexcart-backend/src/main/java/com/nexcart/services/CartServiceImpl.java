package com.nexcart.services;

import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.dto.CartDTO;
import com.nexcart.dto.CartItemDTO;
import com.nexcart.models.Cart;
import com.nexcart.models.CartItems;
import com.nexcart.models.Product;
import com.nexcart.repositories.CartItemsRepository;
import com.nexcart.repositories.CartRepository;
import com.nexcart.repositories.ProductRepository;
import com.nexcart.utils.AuthUtils;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;
    private final CartItemsRepository cartItemsRepository;
    private final ProductRepository productRepository;
    private final AuthUtils authUtils;

    public CartServiceImpl(CartRepository cartRepository, CartItemsRepository cartItemsRepository,
                           ProductRepository productRepository, AuthUtils authutils) {
        this.cartRepository = cartRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
        this.authUtils = authutils;
    }

    private Cart createCart() {
        String email = authUtils.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmail(email);
        if (userCart != null) {
            logger.debug("Existing cart found for user {}: cartId={}", email, userCart.getCartId());
            return userCart;
        }

        logger.debug("Creating new cart for user {}", email);
        Cart cart = new Cart();
        cart.setTotalPrice(0.00);
        cart.setUser(authUtils.loggedInUser());
        Cart newCart = cartRepository.save(cart);

        logger.info("Created new cart {} for user {}", newCart.getCartId(), email);
        return newCart;
    }

    @Override
    @Transactional
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        logger.info("Adding product {} quantity {} to cart", productId, quantity);
        Cart cart = createCart();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (cartItemsRepository.findCartItemByProductIdAndCartId(cart.getCartId(), productId) != null) {
            throw new APIException("Product " + product.getProductName() + " already exists in the cart",
                    HttpStatus.CONFLICT.value());
        }

        if (product.getQuantity() < quantity) {
            throw new APIException("Not enough stock for " + product.getProductName(), HttpStatus.BAD_REQUEST.value());
        }

        CartItems newCartItem = new CartItems();
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(quantity);
        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProductPrice(product.getSpecialPrice());

        cartItemsRepository.save(newCartItem);

        recalcCartTotal(cart);

        return mapCartToDTO(cart);
    }

    @Override
    public List<CartDTO> getAllCarts() {
        logger.info("Fetching all carts");
        List<Cart> carts = cartRepository.findAll();

        if (carts.isEmpty()) {
            logger.warn("No carts found in repository");
            throw new APIException("No cart exists");
        }

        return carts.stream().map(this::mapCartToDTO).collect(Collectors.toList());
    }

    @Override
    public CartDTO getCart(String emailId, Long cartId) {
        logger.info("Fetching cart {} for user {}", cartId, emailId);
        Cart cart = cartRepository.findCartByEmailAndCartId(emailId, cartId);
        if (cart == null) {
            logger.warn("Cart not found for cartId {} and email {}", cartId, emailId);
            throw new ResourceNotFoundException("Cart", "cartId", cartId);
        }
        return mapCartToDTO(cart);
    }

    @Transactional
    @Override
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantityChange) {
        logger.info("Updating quantity change {} for product {} in cart", quantityChange, productId);

        Cart cart = cartRepository.findCartByEmail(authUtils.loggedInEmail());
        Long cartId = cart.getCartId();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cartId, productId);
        if (cartItem == null) {
            throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
        }

        int oldQuantity = cartItem.getQuantity();
        int newQuantity = oldQuantity + quantityChange;

        if (newQuantity < 0) {
            throw new APIException("The resulting quantity cannot be negative.");
        }

        int difference = newQuantity - oldQuantity;
        if (difference > 0 && product.getQuantity() < difference) {
            throw new APIException("Not enough stock for " + product.getProductName(), HttpStatus.BAD_REQUEST.value());
        }

        if (newQuantity == 0) {
            deleteProductFromCart(productId);
        } else {
            cartItem.setQuantity(newQuantity);
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setDiscount(product.getDiscount());
            cartItemsRepository.save(cartItem);
        }

        recalcCartTotal(cart);

        return mapCartToDTO(cart);
    }

    @Transactional
    @Override
    public String deleteProductFromCart(Long productId) {
        Long cartId = cartRepository.findCartByEmail(authUtils.loggedInEmail()).getCartId();
        logger.info("Deleting product {} from cart {}", productId, cartId);
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cartId, productId);
        if (cartItem == null) {
            throw new ResourceNotFoundException("Product", "productId", productId);
        }

        cartItemsRepository.deleteCartItemByProductIdAndCartId(cartId, productId);

        recalcCartTotal(cart);

        logger.debug("Product {} removed from cart {}", productId, cartId);
        return "Product " + cartItem.getProduct().getProductName() + " removed from the cart !!!";
    }

    @Transactional
    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        logger.info("Updating product {} in cart {}", productId, cartId);

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cartId, productId);
        if (cartItem == null) {
            logger.warn("Product {} not found in cart {}", productId, cartId);
            throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
        }

        cartItem.setProductPrice(product.getSpecialPrice());
        cartItemsRepository.save(cartItem);

        recalcCartTotal(cart);
        logger.info("Cart {} total recalculated after updating product {}: {}", cartId, productId,
                cart.getTotalPrice());
    }

    private void recalcCartTotal(Cart cart) {
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(item -> item.getProductPrice() * item.getQuantity())
                .sum();
        cart.setTotalPrice(totalPrice);
        cartRepository.save(cart);
    }

    private CartDTO mapCartToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        cartDTO.setTotalPrice(cart.getTotalPrice());

        List<CartItemDTO> cartItemDTOs = cart.getCartItems().stream().map(item -> {
            CartItemDTO dto = new CartItemDTO();
            dto.setCartItemId(item.getId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            dto.setPrice(item.getProduct().getPrice());
            dto.setSpecialPrice(item.getProduct().getSpecialPrice());
            dto.setDiscount(item.getProduct().getDiscount());
            dto.setCartQuantity(item.getQuantity());
            return dto;
        }).toList();

        cartDTO.setCartItems(cartItemDTOs);
        return cartDTO;
    }
}
