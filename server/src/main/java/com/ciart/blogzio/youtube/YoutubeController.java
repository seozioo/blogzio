package com.ciart.blogzio.youtube;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciart.blogzio.youtube.youtubeDto.PlaylistItemResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/youtube")
public class YoutubeController {

    private final YoutubeService youtubeService;

    @GetMapping("/playlist/{playlistId}")
    public List<PlaylistItemResponse> getPlaylistItems(@PathVariable String playlistId) {
        return youtubeService.getPlaylistItems(playlistId);
    }
}
