package com.ciart.blogzio.asset.repository;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.domain.AssetOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AssetRepository extends JpaRepository<Asset, UUID> {
    Optional<Asset> findByUrl(String url);

    List<Asset> findAllByUrlIn(List<String> urls);

    List<Asset> findAllByOwner(AssetOwner owner);

    List<Asset> findAllByOwnerIsNullAndDeletedAtIsNullAndCreatedAtBefore(LocalDateTime dateTime);
}
