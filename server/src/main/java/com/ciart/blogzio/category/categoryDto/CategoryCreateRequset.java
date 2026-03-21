package com.ciart.blogzio.category.categoryDto;

import com.ciart.blogzio.category.domain.CategoryType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CategoryCreateRequset {
    @NotBlank(message = "공백은 불가합니다.")
    @Pattern(regexp = "^[^<>&#%]*$", message  = "허용하지 않는 특수문자(<,>,&,#,%)가 포함되어 있습니다.")
    @Size(max = 20)
    private String name;

    @NotBlank(message = "공백은 불가합니다.")
    @Pattern(regexp = "^[a-z|-]*$", message  = "영문 소문자와 '-'만 허용합니다.")
    private String slug;

    private CategoryType type;
}
