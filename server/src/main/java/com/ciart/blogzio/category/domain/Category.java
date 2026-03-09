package com.ciart.blogzio.category.domain;

import com.ciart.blogzio.post.domain.Post;
import jakarta.persistence.*;
import jdk.jfr.Enabled;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Enabled
@Table(name="categorys")
public class Category {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int order;

    @OneToMany
    @JoinColumn(name = "category")
    private List<Post> posts = new ArrayList<>();
}
