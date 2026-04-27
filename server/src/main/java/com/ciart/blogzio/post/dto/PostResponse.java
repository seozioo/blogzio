package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.Tag;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class PostResponse {

    private UUID id;
    private String title;
    private JsonNode content;
    private UUID categoryId;
    private String categoryName;
    private int likes;
    private Boolean is_visiable;
    private LocalDateTime postedAt;
    private List<Tag> tags;

    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCategory().getId(),
                post.getCategory().getName(),
                post.getLikes(),
                post.getIs_visiable(),
                post.getPostedAt(),
                post.getTags());
    }
}
