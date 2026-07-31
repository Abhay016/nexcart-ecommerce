package com.nexcart.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDTO {
    private Long categoryId;
    private String categoryName;

}
