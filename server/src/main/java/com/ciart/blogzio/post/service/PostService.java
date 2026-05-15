package com.ciart.blogzio.post.service;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.repository.AssetRepository;
import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.category.repository.CategoryRepository;
import com.ciart.blogzio.config.IpEncoder;
import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.PostLike;
import com.ciart.blogzio.post.domain.PostLikeId;
import com.ciart.blogzio.post.domain.Tag;
import com.ciart.blogzio.post.dto.PostCreateRequest;
import com.ciart.blogzio.post.dto.PostResponse;
import com.ciart.blogzio.post.dto.PostUpdateRequest;
import com.ciart.blogzio.post.repository.PostLikeRepository;
import com.ciart.blogzio.post.repository.PostRepository;
import com.ciart.blogzio.post.repository.TagRepository;
import com.ciart.blogzio.user.domain.User;
import com.ciart.blogzio.user.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.annotation.Nullable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

        private final PostRepository postRepository;
        private final UserRepository userRepository;
        private final TagRepository tagRepository;
        private final CategoryRepository categoryRepository;
        private final AssetRepository assetRepository;
        private final PostLikeRepository postLikeRepository;
        private final IpEncoder ipEncoder;

        // get /post
        @Transactional
        public PostResponse CreatePost(UUID userId, PostCreateRequest request) {

                User author = userRepository.findById(userId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.BAD_REQUEST, "유저를 찾을 수 없습니다."));

                List<Tag> tags = resolveOrcreateTag(request.getTags());
                Category category = resolveCategory(request.getCategoryId());

                Post post = Post.builder()
                                .author(author)
                                .title(request.getTitle())
                                .content(request.getContent())
                                .pinned(request.getPinned())
                                .is_visiable(request.getIsVisible())
                                .category(category)
                                .tags(tags)
                                .build();

                postRepository.save(post);

                applyContentMetadata(post, request.getContent());

                return PostResponse.from(post);
        }

        @Transactional
        public PostResponse UpdatePost(UUID postId, PostUpdateRequest request) {
                Post post = postRepository.findById(postId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));

                List<Tag> tags = resolveOrcreateTag(request.getTags());
                Category category = resolveCategory(request.getCategoryId());

                post.update(
                                request.getTitle(),
                                request.getContent(),
                                request.getPinned(),
                                request.getIsVisible(),
                                category,
                                tags);

                if (request.getContent() != null) {
                        applyContentMetadata(post, request.getContent());
                }

                tagRepository.deleteUnusedTags();

                return PostResponse.from(post);

        }

        @Transactional
        public void deletePost(UUID postId) {
                Post post = postRepository.findById(postId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));

                postRepository.delete(post);

                tagRepository.deleteUnusedTags();
        }

        // 단건 읽기
        @Transactional(readOnly = true)
        public PostResponse GetPost(UUID postId) {
                Post post = postRepository.findById(postId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));

                return PostResponse.from(post);
        }

        private static final int PAGE_SIZE = 12;

        @Transactional(readOnly = true)
        public int getPageOfPost(UUID postId, @Nullable Category category) {
                Post post = postRepository.findById(postId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));

                long index = category != null
                                ? postRepository.countByCategoryAndPostedAtGreaterThan(category, post.getPostedAt())
                                : postRepository.countByPostedAtGreaterThan(post.getPostedAt());

                return (int) (index / PAGE_SIZE);
        }

        @Transactional(readOnly = true)
        public long getLikeOfPost(UUID postId) {
                Post post = postRepository.findById(postId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));

                return postLikeRepository.countByPost(post);
        }

        @Transactional(readOnly = true)
        public boolean isPostLikedByIp(UUID postId, String ip) {
                String encodedIp = ipEncoder.encode(ip);

                if (postLikeRepository.existsById(new PostLikeId(postId, encodedIp))) {
                        return true;
                }

                return false;
        }

        @Transactional
        public long incrementLikeOfPost(UUID postId, String ip) {
                Post post = postRepository.findById(postId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."));

                String encodedIp = ipEncoder.encode(ip);

                if (!postLikeRepository.existsById(new PostLikeId(postId, encodedIp))) {
                        PostLike like = PostLike.builder().post(post).ipHash(encodedIp).build();
                        postLikeRepository.save(like);
                }

                return postLikeRepository.countByPost(post);
        }

        @Transactional(readOnly = true)
        public Page<Post> getPosts(@Nullable String keyword, @Nullable Category category,
                        @Nullable Integer page, boolean thumbnailOnly, @Nullable List<String> tagNames) {
                Pageable pageable = PageRequest.of(page != null ? page : 0, PAGE_SIZE);
                UUID categoryId = category != null ? category.getId() : null;
                List<UUID> tagIds = null;
                if (tagNames != null && !tagNames.isEmpty()) {
                        List<Tag> foundTags = tagRepository.findByTitleIn(tagNames);
                        if (foundTags.size() != tagNames.size()) {
                                return Page.empty(pageable);
                        }
                        tagIds = foundTags.stream().map(Tag::getId).toList();
                }
                return postRepository.findAllDynamic(pageable, keyword, categoryId, thumbnailOnly, tagIds);
        }

        // category 체크
        public Category resolveCategory(UUID categoryId) {
                return categoryRepository.findById(categoryId)
                                .orElseThrow(() -> new ResponseStatusException(
                                                HttpStatus.BAD_REQUEST, "카테고리를 찾을 수 없습니다."));
        }

        private void applyContentMetadata(Post post, JsonNode content) {
                var parser = new ProseMirrorParser(content);

                // contentText 저장
                post.setContentText(parser.getPlainText());

                // 기존 asset의 owner 해제
                List<Asset> existingAssets = assetRepository.findAllByOwner(post);
                existingAssets.forEach(asset -> asset.setOwner(null));

                // 현재 content의 이미지 asset에 owner 연결
                List<String> imageUrls = parser.getImageUrls();
                if (!imageUrls.isEmpty()) {
                        List<Asset> assets = assetRepository.findAllByUrlIn(imageUrls);

                        if (assets.size() != imageUrls.size()) {
                                List<String> foundUrls = assets.stream().map(Asset::getUrl).toList();
                                List<String> missing = imageUrls.stream()
                                                .filter(url -> !foundUrls.contains(url))
                                                .toList();
                                throw new ResponseStatusException(
                                                HttpStatus.BAD_REQUEST,
                                                "등록되지 않은 이미지가 포함되어 있습니다: " + missing);
                        }

                        assets.forEach(asset -> asset.setOwner(post));

                        // 첫 번째 이미지를 썸네일로 설정
                        String firstUrl = imageUrls.get(0);
                        assets.stream()
                                        .filter(asset -> asset.getUrl().equals(firstUrl))
                                        .findFirst()
                                        .ifPresent(post::setThumbnail);
                } else {
                        post.setThumbnail(null);
                }
        }

        // tag값 체크 후 DB에 없을 경우 추가
        public List<Tag> resolveOrcreateTag(List<String> tags) {
                if (tags == null || tags.isEmpty()) {
                        return new ArrayList<>();
                }
                return tags.stream()
                                .map(Title -> tagRepository.findByTitle(Title)
                                                .orElseGet(() -> tagRepository.save(new Tag(Title))))
                                .toList();
        }

}
