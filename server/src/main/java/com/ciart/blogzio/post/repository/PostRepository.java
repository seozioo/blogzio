package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long>{
    // 글 목록 개수 정렬은 프론트에서
    // 최대제한 20개
    

}
