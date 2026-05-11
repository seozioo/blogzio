package com.ciart.blogzio.post.dto;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class PostCreateRequest {

    @NotBlank(message = "제목은 필수입니다.")
    @Size(max = 200, message = "제목은 200자를 초과할 수 없습니다.")
    private String title;

    @NotNull(message = "내용은 필수입니다.")
    private JsonNode content;

    private Boolean pinned;
    private Boolean isVisible;

    @NotNull(message = "카테고리는 필수입니다.")
    private UUID categoryId;

    private List<String> tags = new ArrayList<>();
}
