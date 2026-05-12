package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID>{
    Page<Post> findAll(Pageable pageable);

    Page<Post> findAllByCategory(Pageable pageable, Category category);

    Page<Post> findAllByThumbnailIsNotNull(Pageable pageable);

    Page<Post> findAllByCategoryAndThumbnailIsNotNull(Pageable pageable, Category category);

    long countByCategoryAndPostedAtGreaterThan(Category category, java.time.LocalDateTime postedAt);

    long countByPostedAtGreaterThan(java.time.LocalDateTime postedAt);

    @Query(value = "SELECT p.*, ao.id AS ao_id, " +
            "(SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = p.id) AS likeCount " +
            "FROM posts p " +
            "JOIN asset_owners ao ON ao.id = p.id " +
            "WHERE (p.title LIKE '%' || :keyword || '%' " +
            "OR p.content_text LIKE '%' || :keyword || '%' " +
            "OR bigm_similarity(p.title, :keyword) >= 0.06 " +
            "OR bigm_similarity(COALESCE(p.content_text, ''), :keyword) >= 0.06) " +
            "AND (:categoryId IS NULL OR p.category_id = :categoryId) " +
            "ORDER BY " +
            "  GREATEST(bigm_similarity(p.title, :keyword), bigm_similarity(COALESCE(p.content_text, ''), :keyword)) DESC, " +
            "  p.posted_at DESC",
            countQuery = "SELECT COUNT(*) FROM posts p " +
                    "WHERE (p.title LIKE '%' || :keyword || '%' " +
                    "OR p.content_text LIKE '%' || :keyword || '%' " +
                    "OR bigm_similarity(p.title, :keyword) >= 0.06 " +
                    "OR bigm_similarity(COALESCE(p.content_text, ''), :keyword) >= 0.06) " +
                    "AND (:categoryId IS NULL OR p.category_id = :categoryId)",
            nativeQuery = true)
    Page<Post> searchByKeyword(Pageable pageable, @Param("keyword") String keyword, @Param("categoryId") UUID categoryId);
}
