package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface PostRepositoryCustom {
    Page<Post> findAllDynamic(Pageable pageable, String keyword, UUID categoryId, boolean thumbnailOnly, List<UUID> tagIds);
}
