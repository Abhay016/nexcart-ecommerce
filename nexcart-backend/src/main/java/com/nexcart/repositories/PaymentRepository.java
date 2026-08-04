package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Payment;
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
