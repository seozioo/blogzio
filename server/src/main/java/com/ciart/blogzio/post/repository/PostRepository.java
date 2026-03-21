package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID>{
    Page<Post> findAll(Pageable pageable);

    Page<Post> findAllByCategory(Pageable pageable, Category category);
}
