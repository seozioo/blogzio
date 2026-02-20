package com.ciart.blogzio.post.domain;

import com.ciart.blogzio.user.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.UuidGenerator;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Getter
public class Post {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="author_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private String title;

    @Type(JsonBinaryType.class)
    @Column(nullable = false, columnDefinition = "jsonb")
    private JsonNode content;

    @Column(nullable = false)
    private Boolean pinned = false;

    // 수정 불가
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // 비공개시 공개로 돌릴 때 새 글로 올릴 시 시간 업데트해서 postedAt시간으로 업로드 되도록
    @Column(nullable = true)
    private LocalDateTime postedAt;

    @Column(nullable = false)
    private int likes = 0;

    @PrePersist
    public void prePersisst(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = LocalDateTime.now();
        this.postedAt = LocalDateTime.now();
    }
}
