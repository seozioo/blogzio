package com.ciart.blogzio.youtube;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ciart.blogzio.youtube.youtubeDto.PlaylistItemResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.PlaylistItem;
import com.google.api.services.youtube.model.PlaylistItemListResponse;
import com.google.api.services.youtube.model.Thumbnail;
import com.google.api.services.youtube.model.ThumbnailDetails;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class YoutubeService {

    private static final String APPLICATION_NAME = "blogzio";
    private static final String VIDEO_URL_PREFIX = "https://www.youtube.com/watch?v=";
    private static final long MAX_RESULTS_PER_PAGE = 50L; // 상한선

    @Value("${youtube.api.key}")
    private String apiKey;

    private YouTube youtube;

    @PostConstruct
    public void init() {
        try {
            this.youtube = new YouTube.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance(),
                    request -> {
                    })
                    .setApplicationName(APPLICATION_NAME)
                    .build();
        } catch (GeneralSecurityException | IOException e) {
            throw new IllegalStateException("YouTube 클라이언트 초기화 실패", e);
        }
    }

    public List<PlaylistItemResponse> getPlaylistItems(String playlistId) {
        List<PlaylistItemResponse> result = new ArrayList<>();
        String pageToken = null;

        try {
            do {
                PlaylistItemListResponse response = youtube.playlistItems()
                        .list(List.of("snippet"))
                        .setPlaylistId(playlistId)
                        .setMaxResults(MAX_RESULTS_PER_PAGE)
                        .setPageToken(pageToken)
                        .setKey(apiKey)
                        .execute();

                for (PlaylistItem item : response.getItems()) {
                    result.add(toResponse(item));
                }
                pageToken = response.getNextPageToken();
            } while (pageToken != null);
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY, "YouTube API 호출 실패: " + e.getMessage());
        }

        return result;
    }

    private PlaylistItemResponse toResponse(PlaylistItem item) {
        var snippet = item.getSnippet();
        String videoId = snippet.getResourceId().getVideoId();
        String thumbnailUrl = pickBestThumbnail(snippet.getThumbnails());
        return new PlaylistItemResponse(
                videoId,
                thumbnailUrl,
                VIDEO_URL_PREFIX + videoId);
    }

    private String pickBestThumbnail(ThumbnailDetails thumbnails) {
        if (thumbnails == null) {
            return null;
        }
        Thumbnail t = thumbnails.getMaxres();
        if (t == null)
            t = thumbnails.getStandard();
        if (t == null)
            t = thumbnails.getHigh();
        if (t == null)
            t = thumbnails.getMedium();
        if (t == null)
            t = thumbnails.getDefault();
        return t != null ? t.getUrl() : null;
    }
}
