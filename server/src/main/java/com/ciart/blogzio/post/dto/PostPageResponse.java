package com.ciart.blogzio.post.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostPageResponse {

    @NotNull
    private Integer page;
}
