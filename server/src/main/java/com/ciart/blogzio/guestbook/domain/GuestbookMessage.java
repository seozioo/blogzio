package com.ciart.blogzio.guestbook.domain;

import com.ciart.blogzio.asset.domain.AssetOwner;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "guestbook_messages")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GuestbookMessage extends AssetOwner {
    @Column(nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GuestbookMessageContentType contentType;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column()
    private GuestbookMessageBackgroundColor backgroundColor;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
    }
}
