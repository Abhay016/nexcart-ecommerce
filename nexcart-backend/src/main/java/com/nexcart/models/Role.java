package com.nexcart.models;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    private Integer roleId;

    @Enumerated(EnumType.STRING)
    private RoleName roleName;
}

