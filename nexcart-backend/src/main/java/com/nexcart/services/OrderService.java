package com.nexcart.services;

import java.util.List;

import com.nexcart.models.Order;

public interface OrderService {
    Order placeOrder(Long userId, Long addressId);
    List<Order> getOrdersByUserId(Long userId);
    Order getOrderById(Long orderId);
    Order updateOrderStatus(Long orderId, String orderStatus);
    void cancelOrder(Long orderId);
}
