package com.nexcart.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.dto.OrderDTO;
import com.nexcart.dto.OrderItemDTO;
import com.nexcart.models.Address;
import com.nexcart.models.Cart;
import com.nexcart.models.CartItems;
import com.nexcart.models.Order;
import com.nexcart.models.OrderItems;
import com.nexcart.models.Payment;
import com.nexcart.models.Product;
import com.nexcart.repositories.AddressRepository;
import com.nexcart.repositories.CartRepository;
import com.nexcart.repositories.OrderItemsRepository;
import com.nexcart.repositories.OrderRepository;
import com.nexcart.repositories.PaymentRepository;
import com.nexcart.repositories.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final OrderItemsRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final CartService cartService;
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;

    public OrderServiceImpl(CartRepository cartRepository,
                            AddressRepository addressRepository,
                            OrderItemsRepository orderItemRepository,
                            OrderRepository orderRepository,
                            PaymentRepository paymentRepository,
                            CartService cartService,
                            ModelMapper modelMapper,
                            ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.addressRepository = addressRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.cartService = cartService;
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public OrderDTO placeOrder(String emailId,
                               Long addressId,
                               String paymentMethod,
                               String pgName,
                               String pgPaymentId,
                               String pgStatus,
                               String pgResponseMessage) {

        logger.info("Placing order for email={} addressId={} paymentMethod={}", emailId, addressId, paymentMethod);

        Cart cart = cartRepository.findCartByEmail(emailId);
        if (cart == null) {
            logger.warn("Cart not found for email={}", emailId);
            throw new ResourceNotFoundException("Cart", "email", emailId);
        }

        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
            logger.warn("Cannot place order because cart is empty for email={}", emailId);
            throw new APIException("Cart is empty");
        }

        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        // Build Order entity
        Order order = new Order();
        order.setEmail(emailId);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderStatus("Order Accepted !");
        order.setAddress(address);

        // Build Payment entity
        Payment payment = new Payment(paymentMethod, pgPaymentId, pgStatus, pgResponseMessage, pgName);
        payment.setOrder(order);
        payment = paymentRepository.save(payment);
        logger.debug("Payment saved with pgPaymentId={} status={}", pgPaymentId, pgStatus);
        order.setPayment(payment);

        // Convert CartItems → OrderItems
        List<OrderItems> orderItems = new ArrayList<>();
        for (CartItems cartItem : cart.getCartItems()) {
            OrderItems orderItem = new OrderItems();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }

        // Save Order + OrderItems
        Order savedOrder = orderRepository.save(order);
        orderItems = orderItemRepository.saveAll(orderItems);
        logger.debug("Saved {} order items for orderId={}", orderItems.size(), savedOrder.getOrderId());

        // Update product stock & clear cart
        cart.getCartItems().forEach(item -> {
            Product product = item.getProduct();
            int quantity = item.getQuantity();

            logger.debug("Processing order item productId={} quantity={}", product.getProductId(), quantity);

            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);

            cartService.deleteProductFromCart(cart.getCartId(), product.getProductId());
        });

        // Map to DTO safely
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        if (orderDTO.getOrderItems() == null) {
            orderDTO.setOrderItems(new ArrayList<>());
        }
        orderItems.forEach(item -> orderDTO.getOrderItems().add(modelMapper.map(item, OrderItemDTO.class)));

        orderDTO.setAddressId(addressId);
        logger.info("Order placed successfully for email={} orderId={}", emailId, savedOrder.getOrderId());

        return orderDTO;
    }
}
