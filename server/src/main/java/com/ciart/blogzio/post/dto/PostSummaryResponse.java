package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class PostSummaryResponse {

    private UUID id;
    private String title;
    private String excerpt;
    private int likes;
    private Boolean is_visiable;
    private LocalDateTime postedAt;
    private List<Tag> tags;

    public static PostSummaryResponse from(Post post) {
        String contentText = post.getContentText();
        String excerpt = null;
        if (contentText != null) {
            excerpt = contentText.length() > 100
                    ? contentText.substring(0, 100) + "..."
                    : contentText;
        }

        return new PostSummaryResponse(
                post.getId(),
                post.getTitle(),
                excerpt,
                post.getLikes(),
                post.getIs_visiable(),
                post.getPostedAt(),
                post.getTags()
        );
    }
}
