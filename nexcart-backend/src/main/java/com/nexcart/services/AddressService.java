package com.nexcart.services;

import java.util.List;

import com.nexcart.models.Address;

public interface AddressService {
    Address createAddress(Long userId, Address address);
    List<Address> getAddressesByUserId(Long userId);
    Address updateAddress(Long addressId, Address address);
    void deleteAddress(Long addressId);
}
