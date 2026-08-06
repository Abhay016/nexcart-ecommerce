package com.nexcart.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nexcart.models.User;
import com.nexcart.dto.AddressDTO;
import com.nexcart.services.AddressService;
import com.nexcart.utils.AuthUtils;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AddressController {

    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);

    AuthUtils authUtils;

    AddressService addressService;

    public AddressController(AuthUtils authUtils, AddressService addressService) {
        this.authUtils = authUtils;
        this.addressService = addressService;
    }

    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> createAddress(@Valid @RequestBody AddressDTO addressDTO) {
        User user = authUtils.loggedInUser();
        logger.info("Creating address for user {}", user.getEmail());
        AddressDTO savedAddressDTO = addressService.createAddress(addressDTO, user);
        logger.debug("Address created for user {}", user.getEmail());
        return new ResponseEntity<>(savedAddressDTO, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/addresses")
    public ResponseEntity<List<AddressDTO>> getAddresses() {
        logger.info("Fetching all addresses");
        List<AddressDTO> addressList = addressService.getAddresses();
        logger.debug("Retrieved {} address records", addressList.size());
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId) {
        logger.info("Fetching address by id {}", addressId);
        AddressDTO addressDTO = addressService.getAddressesById(addressId);
        return new ResponseEntity<>(addressDTO, HttpStatus.OK);
    }

    @GetMapping("/users/addresses")
    public ResponseEntity<List<AddressDTO>> getUserAddresses() {
        User user = authUtils.loggedInUser();
        logger.info("Fetching addresses for user {}", user.getEmail());
        List<AddressDTO> addressList = addressService.getUserAddresses(user);
        logger.debug("Retrieved {} addresses for user {}", addressList.size(), user.getEmail());
        return new ResponseEntity<>(addressList, HttpStatus.OK);
    }

    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(
            @PathVariable Long addressId,
            @RequestBody AddressDTO addressDTO) {
        User user = authUtils.loggedInUser();
        AddressDTO updatedAddress = addressService.updateAddress(user, addressId, addressDTO);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId) {
        User user = authUtils.loggedInUser();
        String status = addressService.deleteAddress(user, addressId);
        return ResponseEntity.ok(status);
    }

}