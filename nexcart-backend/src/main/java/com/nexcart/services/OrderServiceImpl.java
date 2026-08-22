package com.nexcart.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.nexcart.dto.OrderDTO;
import com.nexcart.dto.OrderItemDTO;
import com.nexcart.exceptions.APIException;
import com.nexcart.exceptions.ResourceNotFoundException;
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
import com.nexcart.repositories.CartItemsRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final OrderItemsRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;
    private final ProductRepository productRepository;
    private final CartItemsRepository cartItemsRepository;

    public OrderServiceImpl(CartRepository cartRepository,
            AddressRepository addressRepository,
            OrderItemsRepository orderItemRepository,
            OrderRepository orderRepository,
            PaymentRepository paymentRepository,
            ModelMapper modelMapper,
            ProductRepository productRepository, CartItemsRepository cartItemsRepository) {
        this.cartRepository = cartRepository;
        this.addressRepository = addressRepository;
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.modelMapper = modelMapper;
        this.productRepository = productRepository;
        this.cartItemsRepository = cartItemsRepository;
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
            throw new ResourceNotFoundException("Cart", "email", emailId);
        }
        if (cart.getCartItems() == null || cart.getCartItems().isEmpty()) {
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

            Product product = cartItem.getProduct();
            product.setQuantity(product.getQuantity() - cartItem.getQuantity());
            productRepository.save(product);
        }

        Order savedOrder = orderRepository.save(order);
        orderItems = orderItemRepository.saveAll(orderItems);

        cartItemsRepository.deleteAll(cart.getCartItems()); 
        cart.getCartItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
        logger.info("Cart {} reset after placing order", cart.getCartId());

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