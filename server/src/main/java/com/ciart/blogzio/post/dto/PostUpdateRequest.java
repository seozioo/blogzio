package com.ciart.blogzio.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUpdateRequest {

    private String title;
    private String content;
    private boolean pinned;

}
