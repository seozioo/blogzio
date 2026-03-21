package com.ciart.blogzio.category.domain;

import com.ciart.blogzio.post.domain.Post;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jdk.jfr.Enabled;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Enabled
@Getter
@Table(name="categorys")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private int sortOrder;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryType type;

    @OneToMany
    @JoinColumn(name = "category")
    private List<Post> posts = new ArrayList<>();

    @Builder
    public Category(String name, String slug, int sortOrder, CategoryType type) {
        this.name = name;
        this.slug = slug;
        this.sortOrder = sortOrder;
        this.type = type;
    }

    public void update(String name, String slug) {
        this.name = name;
        this.slug = slug;
    }
}