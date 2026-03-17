package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID>{

}
