package com.ciart.blogzio.post.controller;


import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.dto.PostCreateRequest;
import com.ciart.blogzio.post.dto.PostResponse;
import com.ciart.blogzio.post.dto.PostUpdateRequest;
import com.ciart.blogzio.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.UUID;


    /*
    GET /post (글 목록 조회)
    GET /post/[id] (글 상세 조회)
    POST /post (글 작성)
    PUT /post/[id] (글 수정)
    DELETE /post/[id] (글 삭제)
     */


@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

    private final PostService postService;

    @GetMapping("/new")
    public PostResponse create(@AuthenticationPrincipal UUID userId,
                               @Valid @RequestBody PostCreateRequest request) {
        return ResponseEntity.ok(postService.CreatePost(userId, request)).getBody();
    }

    @GetMapping("/update/{postId}")
    public PostResponse update(@PathVariable UUID postId,
                               @Valid @RequestBody PostUpdateRequest postUpdateRequest) {
        return ResponseEntity.ok(postService.UpdatePost(postId, postUpdateRequest)).getBody();
    }
}
