package com.ciart.blogzio.post.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tags")
@Getter
public class Tag {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true)
    private String title;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts =  new ArrayList<>();

    public Tag(String title){
        this.title = title;
    }
}