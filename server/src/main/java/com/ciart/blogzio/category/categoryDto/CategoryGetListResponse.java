package com.ciart.blogzio.category.categoryDto;

import com.ciart.blogzio.category.domain.Category;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CategoryGetListResponse {
    @NotNull
    private List<CategoryResponse> categories;

    public static CategoryGetListResponse from(List<Category> categories) {
        List<CategoryResponse> categoryResponses = categories.stream()
                .map(CategoryResponse::from)
                .toList();

        return new CategoryGetListResponse(categoryResponses);
    }
}
