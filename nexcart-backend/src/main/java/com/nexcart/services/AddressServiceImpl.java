package com.nexcart.services;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nexcart.Exceptions.APIException;
import com.nexcart.Exceptions.ResourceNotFoundException;
import com.nexcart.models.Address;
import com.nexcart.models.User;
import com.nexcart.repositories.AddressRepository;
import com.nexcart.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import com.nexcart.dto.AddressDTO;

@Service
public class AddressServiceImpl implements AddressService {

    private static final Logger logger = LoggerFactory.getLogger(AddressServiceImpl.class);

    private AddressRepository addressRepository;

    private ModelMapper modelMapper;

    UserRepository userRepository;

    public AddressServiceImpl(AddressRepository addressRepository, ModelMapper modelMapper,
            UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
    }

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        logger.info("Creating address for user email={}", user.getEmail());
        Address address = modelMapper.map(addressDTO, Address.class);
        address.setUser(user);
        List<Address> addressesList = user.getAddresses();
        addressesList.add(address);
        user.setAddresses(addressesList);
        Address savedAddress = addressRepository.save(address);
        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddresses() {
        logger.info("Fetching all addresses");
        List<Address> addresses = addressRepository.findAll();
        return addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO getAddressesById(Long addressId) {
        logger.info("Fetching address by id={}", addressId);
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> {
                    logger.warn("Address not found id={}", addressId);
                    return new ResourceNotFoundException("Address", "addressId", addressId);
                });
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getUserAddresses(User user) {
        logger.info("Fetching addresses for user email={}", user.getEmail());
        List<Address> addresses = user.getAddresses();
        return addresses.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class))
                .toList();
    }

    @Override
    public AddressDTO updateAddress(User user, Long addressId, AddressDTO addressDTO) {
        logger.info("Updating address id={} for user={}", addressId, user.getEmail());

        Address addressFromDatabase = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        // ✅ Ownership check
        if (!addressFromDatabase.getUser().getUserId().equals(user.getUserId())) {
            logger.warn("Unauthorized update attempt: user={} tried to update addressId={}", user.getEmail(),
                    addressId);
            throw new APIException("You are not allowed to update this address", HttpStatus.FORBIDDEN.value());
        }

        // Update fields
        addressFromDatabase.setCity(addressDTO.getCity());
        addressFromDatabase.setPincode(addressDTO.getPincode());
        addressFromDatabase.setState(addressDTO.getState());
        addressFromDatabase.setCountry(addressDTO.getCountry());
        addressFromDatabase.setStreet(addressDTO.getStreet());
        addressFromDatabase.setBuildingName(addressDTO.getBuildingName());

        Address updatedAddress = addressRepository.save(addressFromDatabase);
        logger.debug("Address updated successfully id={} for user={}", addressId, user.getEmail());

        return modelMapper.map(updatedAddress, AddressDTO.class);
    }

    @Override
    public String deleteAddress(User user, Long addressId) {
        logger.info("Deleting address id={} for user={}", addressId, user.getEmail());

        Address addressFromDatabase = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address", "addressId", addressId));

        if (!addressFromDatabase.getUser().getUserId().equals(user.getUserId())) {
            logger.warn("Unauthorized delete attempt: user={} tried to delete addressId={}", user.getEmail(),
                    addressId);
            throw new APIException("You are not allowed to delete this address", HttpStatus.FORBIDDEN.value());
        }

        user.getAddresses().removeIf(address -> address.getAddressId().equals(addressId));
        userRepository.save(user);

        addressRepository.delete(addressFromDatabase);
        logger.debug("Address deleted successfully id={} for user={}", addressId, user.getEmail());

        return "Address deleted successfully with addressId: " + addressId;
    }

}