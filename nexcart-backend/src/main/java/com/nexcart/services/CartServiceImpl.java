package com.nexcart.services;


import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.dto.CartDTO;
import com.nexcart.models.Cart;
import com.nexcart.models.CartItems;
import com.nexcart.models.Product;
import com.nexcart.repositories.CartItemsRepository;
import com.nexcart.repositories.CartRepository;
import com.nexcart.repositories.ProductRepository;
import com.nexcart.utils.AuthUtils;
import org.modelmapper.ModelMapper;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;
    private final CartItemsRepository cartItemsRepository;
    private final ProductRepository productRepository;
    private final AuthUtils authUtils;
    private final ModelMapper modelMapper = new ModelMapper();

    public CartServiceImpl(CartRepository cartRepository, CartItemsRepository cartItemsRepository,
            ProductRepository productRepository, AuthUtils authutils) {
        this.cartRepository = cartRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
        this.authUtils = authutils;
    }

    private Cart createCart() {
        String email = authUtils.loggedInEmail();
        Cart userCart  = cartRepository.findCartByEmail(email);
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
   
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        logger.info("Adding product {} quantity {} to cart", productId, quantity);
        Cart cart  = createCart();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cart.getCartId(), productId);

        if (cartItem != null) {
            throw new APIException("Product " + product.getProductName() + " already exists in the cart", HttpStatus.CONFLICT.value());
        }

        if (product.getQuantity() == 0) {
            throw new APIException(product.getProductName() + " is not available", HttpStatus.NOT_FOUND.value());
        }

        if (product.getQuantity() < quantity) {
            throw new APIException("Please, make an order of the " + product.getProductName()
                    + " less than or equal to the quantity " + product.getQuantity() + ".");
        }

        CartItems newCartItem = new CartItems();

        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(quantity);
        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProductPrice(product.getSpecialPrice());

        cartItemsRepository.save(newCartItem);

        product.setQuantity(product.getQuantity() - quantity);

        cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice() * quantity));

        cartRepository.save(cart);
        logger.info("Product {} added to cart {} with quantity {}", productId, cart.getCartId(), quantity);

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<CartItems> cartItems = cart.getCartItems();

        Stream<Product> productStream = cartItems.stream().map(item -> {
            Product map = modelMapper.map(item.getProduct(), Product.class);
            map.setQuantity(item.getQuantity());
            return map;
        });

        cartDTO.setProducts(productStream.toList());

        return cartDTO;

    }

    @Override
    public List<CartDTO> getAllCarts() {
        logger.info("Fetching all carts");
        List<Cart> carts = cartRepository.findAll();

        if (carts.size() == 0) {
            logger.warn("No carts found in repository");
            throw new APIException("No cart exists");
        }

        List<CartDTO> cartDTOs = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

            List<Product> products = cart.getCartItems().stream()
                    .map(p -> modelMapper.map(p.getProduct(), Product.class)).collect(Collectors.toList());

            cartDTO.setProducts(products);

            return cartDTO;

        }).collect(Collectors.toList());

        return cartDTOs;
    }

    @Override
    public CartDTO getCart(String emailId, Long cartId) {
        logger.info("Fetching cart {} for user {}", cartId, emailId);
        Cart cart = cartRepository.findCartByEmailAndCartId(emailId, cartId);
        if (cart == null){
            logger.warn("Cart not found for cartId {} and email {}", cartId, emailId);
            throw new ResourceNotFoundException("Cart", "cartId", cartId);
        }
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cart.getCartItems().forEach(c ->
                c.getProduct().setQuantity(c.getQuantity()));
        List<Product> products = cart.getCartItems().stream()
                .map(p -> modelMapper.map(p.getProduct(), Product.class))
                .toList();
        cartDTO.setProducts(products);
        return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantity) {
        logger.info("Updating quantity {} for product {} in cart", quantity, productId);

        String emailId = authUtils.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmail(emailId);
        Long cartId  = userCart.getCartId();

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        if (product.getQuantity() == 0) {
            throw new APIException(product.getProductName() + " is not available");
        }

        if (product.getQuantity() < quantity) {
            throw new APIException("Please, make an order of the " + product.getProductName()
                    + " less than or equal to the quantity " + product.getQuantity() + ".");
        }

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if (cartItem == null) {
            throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
        }

        // Calculate new quantity
        int newQuantity = cartItem.getQuantity() + quantity;

        // Validation to prevent negative quantities
        if (newQuantity < 0) {
            throw new APIException("The resulting quantity cannot be negative.");
        }

        if (newQuantity == 0){
            deleteProductFromCart(cartId, productId);
        } else {
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscount());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepository.save(cart);
        }

        CartItems updatedItem = cartItemsRepository.save(cartItem);
        if(updatedItem.getQuantity() == 0){
            cartItemsRepository.deleteById(updatedItem.getId());
            logger.info("Removed cart item {} because quantity reached zero", updatedItem.getId());
        }


        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<CartItems> cartItems = cart.getCartItems();

        Stream<Product> productStream = cartItems.stream().map(item -> {
            Product prd = modelMapper.map(item.getProduct(), Product.class);
            prd.setQuantity(item.getQuantity());
            return prd;
        });


        cartDTO.setProducts(productStream.toList());

        return cartDTO;
    }



    @Transactional
    @Override
    public String deleteProductFromCart(Long cartId, Long productId) {
        logger.info("Deleting product {} from cart {}", productId, cartId);
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if (cartItem == null) {
            throw new ResourceNotFoundException("Product", "productId", productId);
        }

        cart.setTotalPrice(cart.getTotalPrice() -
                (cartItem.getProductPrice() * cartItem.getQuantity()));

        cartItemsRepository.deleteCartItemByProductIdAndCartId(cartId, productId);
        logger.debug("Product {} removed from cart {}", productId, cartId);
        return "Product " + cartItem.getProduct().getProductName() + " removed from the cart !!!";
    }


    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        CartItems cartItem = cartItemsRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if (cartItem == null) {
            throw new APIException("Product " + product.getProductName() + " not available in the cart!!!");
        }

        double cartPrice = cart.getTotalPrice()
                - (cartItem.getProductPrice() * cartItem.getQuantity());

        cartItem.setProductPrice(product.getSpecialPrice());

        cart.setTotalPrice(cartPrice
                + (cartItem.getProductPrice() * cartItem.getQuantity()));

        cartItem = cartItemsRepository.save(cartItem);
    }
}
