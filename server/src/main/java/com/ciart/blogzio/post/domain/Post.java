package com.ciart.blogzio.post.domain;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.domain.AssetOwner;
import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.user.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import lombok.*;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "posts")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 빌더로만 만들도록 강제
public class Post extends AssetOwner {

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

    @Column(nullable = false)
    private LocalDateTime postedAt;

    @Column(nullable = false)
    private int likes = 0;

    @Column(nullable = false)
    private Boolean is_visiable = false;

    @Setter
    @Column(columnDefinition = "text")
    private String contentText;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_id")
    private Asset thumbnail;

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

    @Builder
    public Post(User author, String title, JsonNode content, Boolean pinned,Boolean is_visiable, Category category, List<Tag> tags) {
        this.author = author;
        this.title = title;
        this.content = content;
        this.pinned = pinned;
        this.is_visiable = is_visiable;
        this.category = category;
        this.tags = tags;
    }


    public void update( String title, JsonNode content, Boolean pinned,Boolean is_visiable, Category category, List<Tag> tags){
        if(title != null) this.title = title;
        if(content != null) this.content = content;
        if(pinned != null) this.pinned = pinned;
        if(is_visiable != null) this.is_visiable = is_visiable;
        if(category != null) this.category = category;
        if(tags != null) this.tags = tags;
    }
}
