package com.nexcart.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nexcart.repositories.CartRepository;
import com.nexcart.utils.AuthUtils;
import com.nexcart.dto.CartDTO;
import com.nexcart.models.Cart;
import com.nexcart.services.CartService;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;

    private final CartRepository cartRepository;

    private final AuthUtils authUtils;

    public CartController(CartService cartService, CartRepository cartRepository, AuthUtils authUtils) {
        this.cartService = cartService;
        this.authUtils = authUtils;
        this.cartRepository = cartRepository;
    }

   
   @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId,
                                                    @PathVariable Integer quantity){
        CartDTO cartDTO = cartService.addProductToCart(productId, quantity);
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
    }

    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> getCarts() {
        logger.info("Received request to retrieve all carts");
        List<CartDTO> cartDTOs = cartService.getAllCarts();
        logger.debug("Returning {} carts", cartDTOs.size());
        return new ResponseEntity<List<CartDTO>>(cartDTOs, HttpStatus.FOUND);
    }

    @GetMapping("/carts/users/cart")
    public ResponseEntity<CartDTO> getCartById(){
        String emailId = authUtils.loggedInEmail();
        logger.info("Retrieving cart for current user {}", emailId);
        Cart cart = cartRepository.findCartByEmail(emailId);
        Long cartId = cart.getCartId();
        CartDTO cartDTO = cartService.getCart(emailId, cartId);
        logger.debug("Returning cart {} for user {}", cartId, emailId);
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
    }

    @PutMapping("/cart/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,
                                                     @PathVariable String operation) {
        logger.info("Updating cart product {} with operation {}", productId, operation);
        CartDTO cartDTO = cartService.updateProductQuantityInCart(productId,
                operation.equalsIgnoreCase("delete") ? -1 : 1);
        logger.debug("Cart product {} updated, new cart total {}", productId, cartDTO.getTotalPrice());
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
    }

    @DeleteMapping("/carts/{cartId}/product/{productId}")
    public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId,
                                                        @PathVariable Long productId) {
        logger.info("Deleting product {} from cart {}", productId, cartId);
        String status = cartService.deleteProductFromCart(cartId, productId);
        logger.debug("Delete product result: {}", status);
        return new ResponseEntity<String>(status, HttpStatus.OK);
    }


}
