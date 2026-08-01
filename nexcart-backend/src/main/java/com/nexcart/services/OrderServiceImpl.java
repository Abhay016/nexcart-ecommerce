package com.nexcart.services;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.models.Address;
import com.nexcart.models.Cart;
import com.nexcart.models.CartItems;
import com.nexcart.models.Order;
import com.nexcart.models.OrderItems;
import com.nexcart.models.User;
import com.nexcart.repositories.AddressRepository;
import com.nexcart.repositories.CartRepository;
import com.nexcart.repositories.OrderItemsRepository;
import com.nexcart.repositories.OrderRepository;
import com.nexcart.repositories.UserRepository;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final OrderItemsRepository orderItemsRepository;

    public OrderServiceImpl(OrderRepository orderRepository, CartRepository cartRepository,
            AddressRepository addressRepository, UserRepository userRepository,
            OrderItemsRepository orderItemsRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
        this.orderItemsRepository = orderItemsRepository;
    }

    @Override
    public Order placeOrder(Long userId, Long addressId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "User ID", userId));
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "Address ID", addressId));
        Cart cart = cartRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "User ID", userId));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new APIException("Cart is empty", HttpStatus.BAD_REQUEST.value());
        }

        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setOrderDate(new Date());
        order.setOrderStatus("Pending");
        order.setTotalAmount(cart.getTotalPrice());

        Set<OrderItems> orderItems = new HashSet<>();
        for (CartItems cartItem : cart.getItems()) {
            OrderItems orderItem = new OrderItems();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItems.add(orderItemsRepository.save(orderItem));
        }
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        cart.setDiscount(0.0);
        cartRepository.save(cart);
        return savedOrder;
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserUserId(userId);
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", "Order ID", orderId));
    }

    @Override
    public Order updateOrderStatus(Long orderId, String orderStatus) {
        Order order = getOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public void cancelOrder(Long orderId) {
        Order order = getOrderById(orderId);
        orderRepository.delete(order);
    }
}
