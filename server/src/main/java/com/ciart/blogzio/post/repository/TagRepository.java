package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.post.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag,Long> {
    Optional<Tag> findByTitle(String title);

    @Modifying
    @Query("Delete From Tag t WHERE t.posts IS EMPTY")
    void deleteUnusedTags();
}
