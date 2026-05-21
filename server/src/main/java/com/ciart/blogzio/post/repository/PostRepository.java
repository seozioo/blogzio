package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID>, PostRepositoryCustom {
    Optional<Post> findByIdAndIsVisibleTrue(UUID id);
}
