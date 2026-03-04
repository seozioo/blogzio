package com.ciart.blogzio.category.domain;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Enabled
@Table(name="categorys")
public class Category {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID uuid;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int order;
}
