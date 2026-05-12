package com.ciart.blogzio.youtube.youtubeDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlaylistItemResponse {
    @NotBlank
    private String videoId;

    @NotBlank
    private String thumbnailUrl;

    @NotBlank
    private String videoUrl;
}
