package com.nexcart.models;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(onlyExplicitlyIncluded = true)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long productId;

    @EqualsAndHashCode.Include
    @Column(nullable = false, unique = true, length = 150)
    private String productName;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String image; 

    @Column(nullable = false)
    private Double price;

    private Double discount; 

    private Double specialPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, unique = true, length = 50)
    private String sku; // unique stock keeping unit

    private String brand;

    private Boolean isActive = true; // product visibility

    private Boolean isFeatured = false; // highlight in featured section

    private Double rating = 0.0; // average rating

    private Integer reviewCount = 0;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @ToString.Exclude
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<CartItems> cartItems = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();


    @PreUpdate
    public void setLastUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
