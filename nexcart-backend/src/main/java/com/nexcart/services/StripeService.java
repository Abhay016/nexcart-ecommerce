package com.nexcart.services;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.nexcart.dto.StripePaymentDTO;

public interface StripeService {
        PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException;
}
