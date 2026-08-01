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
import com.nexcart.dto.OrderRequestDTO;
import com.nexcart.dto.OrderStatusRequestDTO;
import com.nexcart.models.Order;
import com.nexcart.repositories.UserRepository;
import com.nexcart.services.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderController(OrderService orderService, UserRepository userRepository) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequestDTO request) {
        Order order = orderService.placeOrder(request.getUserId(), request.getAddressId());
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @GetMapping({"/orders/{id}", "/orders/user/{userId}"})
    public ResponseEntity<?> getOrders(@PathVariable(name = "id", required = false) Long id,
            @PathVariable(name = "userId", required = false) Long userId) {
        if (userId != null) {
            return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
        }
        if (userRepository.existsById(id)) {
            return ResponseEntity.ok(orderService.getOrdersByUserId(id));
        }
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/orders/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @Valid @RequestBody OrderStatusRequestDTO request) {
        Order order = orderService.updateOrderStatus(orderId, request.getOrderStatus());
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<APIResponseDTO> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok(new APIResponseDTO("Order cancelled successfully", true));
    }
}
