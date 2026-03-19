package com.ciart.blogzio.asset.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "assets")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Asset {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Setter
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private AssetOwner owner;

    @Column(nullable = false)
    private String originalFilename;

    @Column(nullable = false, unique = true)
    private String url;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
    }
}
