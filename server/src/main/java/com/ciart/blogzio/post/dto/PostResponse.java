package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.post.domain.Post;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class PostResponse {

    private UUID id;
    private String title;
    private JsonNode content;
    private int likes;
    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getLikes()
        );
    }
}
