package com.ciart.blogzio.asset.domain;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name = "asset_owners")
@Getter
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AssetOwner {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;
}
