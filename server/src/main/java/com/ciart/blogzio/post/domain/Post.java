package com.ciart.blogzio.post.domain;

import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.user.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Getter
public class Post {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="author_id", nullable = false)
    private User author;

    @Column(nullable = false)
    private String title;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private JsonNode content;

    @Column(nullable = false)
    private Boolean pinned = false;

    // 수정 불가
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // 수정 날자
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // 비공개시 공개로 돌릴 때 새 글로 올릴 시 < postedAt 업데이트 // 새글로 올리지 않으면 업데이트 X
    @Column(nullable = false)
    private LocalDateTime postedAt;

    @Column(nullable = false)
    private int likes = 0;

    @Column(nullable = false)
    private Boolean is_visiable = false;

    @ManyToOne
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "post_tag",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags = new ArrayList<>();

    @PrePersist
    public void prePersisst(){
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.postedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}
