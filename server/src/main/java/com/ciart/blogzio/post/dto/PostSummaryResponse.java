package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.Tag;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class PostSummaryResponse {

    @NotNull
    private UUID id;

    @NotBlank
    private String title;

    @NotBlank
    private String excerpt;

    private String thumbnailUrl;

    @NotNull
    private Boolean isVisible;

    @NotNull
    private Long likes;

    @NotNull
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

        String thumbnailUrl = post.getThumbnail() != null
                ? post.getThumbnail().getUrl()
                : null;

        return new PostSummaryResponse(
                post.getId(),
                post.getTitle(),
                excerpt,
                thumbnailUrl,
                post.getIsVisible(),
                post.getLikeCount(),
                post.getPostedAt(),
                post.getTags());
    }
}
