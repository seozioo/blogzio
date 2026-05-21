package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface PostRepositoryCustom {
    Page<Post> findAllDynamic(Pageable pageable, String keyword, UUID categoryId, Boolean isVisible,
            boolean thumbnailOnly, List<UUID> tagIds);

    long countNewerThan(Category category, Boolean isVisible, LocalDateTime postedAt);
}
