package com.nexcart.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.nexcart.models.Address;
import com.nexcart.models.User;
import com.nexcart.repositories.AddressRepository;
import com.nexcart.repositories.UserRepository;

@ExtendWith(MockitoExtension.class)
class AddressServiceImplTest {

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AddressServiceImpl addressService;

    @Test
    void createAddressShouldSaveAddressForExistingUser() {
        User user = new User();
        user.setUserId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(addressRepository.save(any(Address.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Address addressPayload = new Address();
        addressPayload.setBuildingName("Skyline");
        addressPayload.setStreet("Main Street");
        addressPayload.setCity("Mumbai");
        addressPayload.setState("Maharashtra");
        addressPayload.setCountry("India");
        addressPayload.setPincode("400001");

        Address address = addressService.createAddress(1L, addressPayload);

        assertNotNull(address);
        assertEquals(user, address.getUser());
        verify(addressRepository).save(any(Address.class));
    }
}
