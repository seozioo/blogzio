package com.ciart.blogzio.post.dto;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class PostUpdateRequest {

    @Size(max = 200, message = "제목은 200자를 초과할 수 없습니다.")
    private String title;

    private JsonNode content;
    private Boolean pinned;
    private Boolean isVisible;
    private UUID categoryId;
    private List<String> tags = new ArrayList<>();
}
