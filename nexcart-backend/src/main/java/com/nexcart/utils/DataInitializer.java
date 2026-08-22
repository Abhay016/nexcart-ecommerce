package com.nexcart.utils;

import com.nexcart.models.Role;
import com.nexcart.models.RoleName;
import com.nexcart.repositories.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing default roles on startup");
        if (roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setRoleId(1);
            adminRole.setRoleName(RoleName.ADMIN);

            Role customerRole = new Role();
            customerRole.setRoleId(2);
            customerRole.setRoleName(RoleName.CUSTOMER);

            Role sellerRole = new Role();
            sellerRole.setRoleId(3);
            sellerRole.setRoleName(RoleName.SELLER);

            roleRepository.saveAll(Arrays.asList(adminRole, customerRole, sellerRole));
            logger.info("Default roles initialized successfully");
        } else {
            logger.info("Default roles already exist, count={}", roleRepository.count());
        }
    }
}
