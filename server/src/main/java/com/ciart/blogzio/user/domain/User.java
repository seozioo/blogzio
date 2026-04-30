package com.ciart.blogzio.user.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.UuidGenerator;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.domain.AssetOwner;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends AssetOwner {

    @Column(nullable = false)
    private String username;

    @Column(nullable = true)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(length = 50, nullable = true)
    private String bio;

    @Column(nullable = true)
    private String profileImageUrl;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public void update(String nickname, String bio, String profileImageUrl) {
        if (nickname != null)
            this.nickname = nickname;
        if (bio != null)
            this.bio = bio;
        if (profileImageUrl != null)
            this.profileImageUrl = profileImageUrl;
    }

}
