package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.user.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class PostUpdateRequest {

    private String title;
    private JsonNode content;
    private Boolean pinned;
    private Boolean isVisible;
    private UUID categoryId;
    private List<String> tags = new ArrayList<>();
}
