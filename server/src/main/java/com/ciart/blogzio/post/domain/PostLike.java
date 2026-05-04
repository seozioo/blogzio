package com.ciart.blogzio.post.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_likes")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @Column(nullable = false)
    private String ipHash;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public PostLike(Post post, String ipHash) {
        this.post = post;
        this.ipHash = ipHash;
        this.createdAt = LocalDateTime.now();
    }
}
