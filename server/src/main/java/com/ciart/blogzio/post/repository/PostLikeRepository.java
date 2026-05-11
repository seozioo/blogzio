package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.PostLike;
import com.ciart.blogzio.post.domain.PostLikeId;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, PostLikeId> {
    long countByPost(Post post);

}
