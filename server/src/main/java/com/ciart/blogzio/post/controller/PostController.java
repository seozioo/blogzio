package com.ciart.blogzio.post.controller;

import com.ciart.blogzio.category.service.CategoryService;
import com.ciart.blogzio.post.dto.PostGetListResponse;
import com.ciart.blogzio.post.dto.PostLikeResponse;
import com.ciart.blogzio.post.dto.PostCreateRequest;
import com.ciart.blogzio.post.dto.PostResponse;
import com.ciart.blogzio.post.dto.PostUpdateRequest;
import com.ciart.blogzio.post.service.PostService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import com.ciart.blogzio.post.dto.PostPageResponse;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {

        private final PostService postService;
        private final CategoryService categoryService;

        @GetMapping("/{postId}")
        @ApiResponses({
                        @ApiResponse(responseCode = "200"),
                        @ApiResponse(responseCode = "404", description = "해당 게시글을 찾을 수 없습니다.")
        })
        public ResponseEntity<PostResponse> get(@PathVariable UUID postId) {
                return ResponseEntity.ok(postService.GetPost(postId));
        }

        @GetMapping("/{postId}/page")
        @ApiResponses({
                        @ApiResponse(responseCode = "200"),
                        @ApiResponse(responseCode = "404", description = "해당 게시글을 찾을 수 없습니다.")
        })
        public ResponseEntity<PostPageResponse> getPage(
                        @PathVariable UUID postId,
                        @RequestParam(required = false) UUID category) {
                var cat = category != null ? categoryService.find(category).orElse(null) : null;
                int page = postService.getPageOfPost(postId, cat);
                return ResponseEntity.ok(new PostPageResponse(page));
        }

        @GetMapping("/{postId}/like")
        @ApiResponses({
                        @ApiResponse(responseCode = "200"),
                        @ApiResponse(responseCode = "404", description = "해당 게시글을 찾을 수 없습니다.")
        })
        public ResponseEntity<PostLikeResponse> getLike(HttpServletRequest request, @PathVariable UUID postId) {
                String ip = request.getRemoteAddr();
                long likes = postService.getLikeOfPost(postId);
                boolean isLiked = postService.isPostLikedByIp(postId, ip);

                return ResponseEntity.ok(new PostLikeResponse(likes, isLiked));
        }

        @GetMapping
        public ResponseEntity<PostGetListResponse> getList(@RequestParam(required = false) UUID category,
                        @RequestParam(required = false) Integer page,
                        @RequestParam(required = false, defaultValue = "false") boolean thumbnailOnly) {
                var pageData = postService.GetAllPosts(categoryService.find(category).orElse(null), page,
                                thumbnailOnly);

                return ResponseEntity.ok(PostGetListResponse.from(pageData));
        }

        @PostMapping
        public PostResponse create(@AuthenticationPrincipal UUID userId,
                        @Valid @RequestBody PostCreateRequest request) {
                return ResponseEntity.ok(postService.CreatePost(userId, request)).getBody();
        }

        @PostMapping("/{postId}/like")
        @ApiResponses({
                        @ApiResponse(responseCode = "200"),
                        @ApiResponse(responseCode = "404", description = "해당 게시글을 찾을 수 없습니다.")
        })
        public ResponseEntity<PostLikeResponse> incrementLike(HttpServletRequest request, @PathVariable UUID postId) {
                String ip = request.getRemoteAddr();
                long likes = postService.incrementLikeOfPost(postId, ip);
                boolean isLiked = postService.isPostLikedByIp(postId, ip);

                return ResponseEntity.ok(new PostLikeResponse(likes, isLiked));
        }

        @PutMapping("/{postId}")
        @ApiResponses({
                        @ApiResponse(responseCode = "200"),
                        @ApiResponse(responseCode = "404", description = "해당 게시글을 찾을 수 없습니다.")
        })
        public PostResponse update(@PathVariable UUID postId,
                        @Valid @RequestBody PostUpdateRequest postUpdateRequest) {
                return ResponseEntity.ok(postService.UpdatePost(postId, postUpdateRequest)).getBody();
        }

        @DeleteMapping("/{postId}")
        @ApiResponses({
                        @ApiResponse(responseCode = "200"),
                        @ApiResponse(responseCode = "404", description = "해당 게시글을 찾을 수 없습니다.")
        })
        public ResponseEntity<Void> delete(@PathVariable UUID postId) {
                postService.deletePost(postId);
                return ResponseEntity.noContent().build();
        }
}
