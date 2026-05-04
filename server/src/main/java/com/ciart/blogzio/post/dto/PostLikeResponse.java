package com.ciart.blogzio.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostLikeResponse {
    private Long like;

    private Boolean IsLiked;
}
