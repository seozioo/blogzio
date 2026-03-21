package com.ciart.blogzio.asset.repository;

import com.ciart.blogzio.asset.domain.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AssetRepository extends JpaRepository<Asset, UUID> {
    Optional<Asset> findByUrl(String url);
}
