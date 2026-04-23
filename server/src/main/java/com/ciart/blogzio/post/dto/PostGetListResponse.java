package com.ciart.blogzio.post.dto;

import com.ciart.blogzio.post.domain.Post;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@AllArgsConstructor
public class PostGetListResponse {
    @NotNull
    private List<PostSummaryResponse> posts;

    @NotNull
    private int totalPages;

    public static PostGetListResponse from(Page<Post> page) {
        List<PostSummaryResponse> postResponses = page.getContent().stream()
                .map(PostSummaryResponse::from)
                .toList();

        return new PostGetListResponse(postResponses, page.getTotalPages());
    }
}
