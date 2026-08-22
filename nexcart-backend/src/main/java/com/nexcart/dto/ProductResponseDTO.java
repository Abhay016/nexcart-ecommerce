package com.nexcart.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO<T> {

    // Actual content (list of products or DTOs)
    private List<T> content = new ArrayList<>();

    // Pagination details
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean first;
    private boolean last;

    // Sorting details
    private String sortBy;
    private String sortDirection;

    // Extra metadata
    // private int statusCode;       
    // private String message;       
    // private long timestamp;       
}
