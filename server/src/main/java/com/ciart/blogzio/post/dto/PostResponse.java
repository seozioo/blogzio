package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.Tag;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class PostResponse {

    @NotNull
    private UUID id;

    @NotBlank
    private String title;

    @NotNull
    private JsonNode content;

    @NotNull
    private UUID categoryId;

    @NotNull
    private String categoryName;

    @NotNull
    private Boolean is_visiable;

    @NotNull
    private Long likes;

    @NotNull
    private LocalDateTime postedAt;

    private List<Tag> tags;

    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCategory().getId(),
                post.getCategory().getName(),
                post.getIs_visiable(),
                post.getLikeCount(),
                post.getPostedAt(),
                post.getTags());
    }
}
