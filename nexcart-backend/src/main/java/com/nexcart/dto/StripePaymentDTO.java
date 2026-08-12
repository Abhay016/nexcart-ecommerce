package com.nexcart.dto;

import lombok.Data;
import java.util.Map;
import com.nexcart.models.Address;


@Data
public class StripePaymentDTO {
    private Long amount;
    private String currency;
    private String email;
    private String name;
    private Address address;
    private String description;
    private Map<String, String> metadata;

}


