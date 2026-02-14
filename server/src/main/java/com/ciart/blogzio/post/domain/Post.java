package com.ciart.blogzio.post.domain;

import jakarta.persistence.*;
import lombok.Getter;
import tools.jackson.databind.JsonNode;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Getter
public class Post {

    @Id
    @Column(nullable = false, unique = true)
    private UUID uuid;

    //

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "jsonb")
    private JsonNode content;

    @Column(nullable = false)
    private Boolean pinned = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // 임시저장
    @Column(nullable = false)
    private LocalDateTime postedAt;

    @Column(nullable = false)
    private int likes = 0;
}
