package com.nexcart.services;

import java.util.List;
import com.nexcart.models.User;
import com.nexcart.dto.AddressDTO;

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> getAddresses();

    AddressDTO getAddressesById(Long addressId);

    List<AddressDTO> getUserAddresses(User user);

    AddressDTO updateAddress(User user, Long addressId, AddressDTO addressDTO);

    String deleteAddress(User user, Long addressId);
}
