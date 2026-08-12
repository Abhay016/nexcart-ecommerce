package com.nexcart.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nexcart.dto.OrderRequestDTO;
import com.nexcart.services.OrderService;
import com.nexcart.utils.AuthUtils;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.nexcart.dto.OrderDTO;
import com.nexcart.dto.StripePaymentDTO;
import com.nexcart.services.StripeService;

@RestController
@RequestMapping("/api")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    private OrderService orderService;

    private AuthUtils authUtils;

    private StripeService stripeService;

    public OrderController(OrderService orderService, AuthUtils authUtils, StripeService stripeService) {
        this.orderService = orderService;
        this.authUtils = authUtils;
        this.stripeService = stripeService;
    }

    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod, @RequestBody OrderRequestDTO orderRequestDTO) {
        String emailId = authUtils.loggedInEmail();
        logger.info("Placing order for user {} via payment method {}", emailId, paymentMethod);
        OrderDTO order = orderService.placeOrder(
                emailId,
                orderRequestDTO.getAddressId(),
                paymentMethod,
                orderRequestDTO.getPgName(),
                orderRequestDTO.getPgPaymentId(),
                orderRequestDTO.getPgStatus(),
                orderRequestDTO.getPgResponseMessage()
        );
        logger.debug("Order placed successfully for user {} with total {}", emailId, order.getTotalAmount());
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(@RequestBody StripePaymentDTO stripePaymentDto) throws StripeException {
        logger.info("StripePaymentDTO Received " + stripePaymentDto);
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDto);
        return new ResponseEntity<>(paymentIntent.getClientSecret(), HttpStatus.CREATED);
    }

}