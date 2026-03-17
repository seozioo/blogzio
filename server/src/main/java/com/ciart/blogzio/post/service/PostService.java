package com.ciart.blogzio.post.service;


import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.category.repository.CategoryRepository;
import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.Tag;
import com.ciart.blogzio.post.dto.PostCreateRequest;
import com.ciart.blogzio.post.dto.PostResponse;
import com.ciart.blogzio.post.dto.PostUpdateRequest;
import com.ciart.blogzio.post.repository.PostRepository;
import com.ciart.blogzio.post.repository.TagRepository;
import com.ciart.blogzio.user.domain.User;
import com.ciart.blogzio.user.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    // get /post
    @Transactional
    public PostResponse CreatePost(UUID userId, PostCreateRequest request) {

        User author = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST
                        ,"유저를 찾을 수 없습니다."));


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
        return  PostResponse.from(postRepository.save(post));
    }

    @Transactional
    public PostResponse UpdatePost(UUID postId, PostUpdateRequest request){
        Post post = postRepository.findById(postId)
                .orElseThrow(()-> new ResponseStatusException(
                        HttpStatus.NOT_FOUND
                        ,"해당 게시글을 찾을 수 없습니다."));

        List<Tag> tags = resolveOrcreateTag(request.getTags());
        Category category = resolveCategory(request.getCategoryId());

        post.update(
                request.getTitle(),
                request.getContent(),
                request.getPinned(),
                request.getIsVisible(),
                category,
                tags
        );

        tagRepository.deleteUnusedTags();

        return  PostResponse.from(post);

    }

    // category 체크
    public Category resolveCategory(UUID categoryId){
        return categoryRepository.findById(categoryId)
                .orElseThrow(() ->  new ResponseStatusException(
                        HttpStatus.BAD_REQUEST
                , "카테고리를 찾을 수 없습니다."));
    }

    // tag값 체크 후 DB에 없을 경우 추가
    public List<Tag> resolveOrcreateTag(List<String> tags){
        if (tags == null || tags.isEmpty()){return new ArrayList<>(); }
        return tags.stream()
                .map(Title -> tagRepository.findByTitle(Title)
                        .orElseGet(() -> tagRepository.save(new Tag(Title))))
                .toList();
    }

}
