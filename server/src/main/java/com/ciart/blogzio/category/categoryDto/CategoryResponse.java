package com.ciart.blogzio.category.categoryDto;

import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.category.domain.CategoryType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryResponse {
    private String name;
    private String slug;
    private int sortOrder;
    private CategoryType type;

    public static CategoryResponse from(Category category){
        return new CategoryResponse(
            category.getName(),
            category.getSlug(),
            category.getSortOrder(),
            category.getType()
        );
    }
}
