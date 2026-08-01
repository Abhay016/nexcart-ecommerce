package com.nexcart.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.models.Address;
import com.nexcart.models.User;
import com.nexcart.repositories.AddressRepository;
import com.nexcart.repositories.UserRepository;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Address createAddress(Long userId, Address address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "User ID", userId));

        validateAddress(address);
        address.setUser(user);
        return addressRepository.save(address);
    }

    @Override
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserUserId(userId);
    }

    @Override
    public Address updateAddress(Long addressId, Address address) {
        Address existing = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "Address ID", addressId));

        validateAddress(address);
        existing.setBuildingName(address.getBuildingName());
        existing.setStreet(address.getStreet());
        existing.setCity(address.getCity());
        existing.setState(address.getState());
        existing.setCountry(address.getCountry());
        existing.setPincode(address.getPincode());
        return addressRepository.save(existing);
    }

    @Override
    public void deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "Address ID", addressId));
        addressRepository.delete(address);
    }

    private void validateAddress(Address address) {
        if (address == null
                || isBlank(address.getBuildingName())
                || isBlank(address.getStreet())
                || isBlank(address.getCity())
                || isBlank(address.getState())
                || isBlank(address.getCountry())
                || isBlank(address.getPincode())) {
            throw new APIException("All address fields are required", HttpStatus.BAD_REQUEST.value());
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
