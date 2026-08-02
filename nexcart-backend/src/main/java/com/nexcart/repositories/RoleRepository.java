package com.nexcart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nexcart.models.Role;
import com.nexcart.models.RoleName;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    
    Optional<Role> findByRoleName(RoleName roleName);
}
