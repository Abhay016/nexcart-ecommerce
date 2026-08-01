package com.nexcart.controllers;

import java.util.List;

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
import com.nexcart.dto.AddressRequestDTO;
import com.nexcart.models.Address;
import com.nexcart.services.AddressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/addresses")
    public ResponseEntity<Address> createAddress(@Valid @RequestBody AddressRequestDTO request) {
        Address address = new Address();
        address.setBuildingName(request.getBuildingName());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setCountry(request.getCountry());
        address.setPincode(request.getPincode());

        Address savedAddress = addressService.createAddress(request.getUserId(), address);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
    }

    @GetMapping("/addresses/{userId}")
    public ResponseEntity<List<Address>> getAddressesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddressesByUserId(userId));
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long addressId, @Valid @RequestBody AddressRequestDTO request) {
        Address address = new Address();
        address.setBuildingName(request.getBuildingName());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setCountry(request.getCountry());
        address.setPincode(request.getPincode());

        return ResponseEntity.ok(addressService.updateAddress(addressId, address));
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<APIResponseDTO> deleteAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok(new APIResponseDTO("Address deleted successfully", true));
    }
}
