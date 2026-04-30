package com.ciart.blogzio.asset.service;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.domain.AssetOwner;
import com.ciart.blogzio.asset.repository.AssetRepository;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final AssetRepository assetRepository;
    private final S3Template s3Template;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    @Transactional
    public String upload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "파일이 비어있습니다.");
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "파일 크기는 10MB를 초과할 수 없습니다.");
        }

        try (var inputStream = file.getInputStream()) {
            var originalFilename = file.getOriginalFilename();
            var fileName = generateFileName(originalFilename);

            var resource = s3Template.upload(bucketName, fileName, inputStream);
            var url = resource.getURL().toString();

            TransactionSynchronizationManager.registerSynchronization(
                    new TransactionSynchronization() {
                        @Override
                        public void afterCompletion(int status) {
                            if (status == STATUS_ROLLED_BACK) {
                                s3Template.deleteObject(bucketName, fileName);
                            }
                        }
                    });

            var asset = Asset.builder()
                    .originalFilename(originalFilename)
                    .url(url)
                    .build();
            assetRepository.save(asset);

            return url;
        } catch (Exception e) {
            log.error("파일 업로드 실패", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
    }

    public Asset findByUrl(String url) {
        return assetRepository.findByUrl(url).orElseThrow(() -> new IllegalArgumentException("해당 URL의 자산을 찾을 수 없습니다."));
    }

    public List<Asset> findAllByOwner(AssetOwner owner) {
        return assetRepository.findAllByOwner(owner);
    }

    public void save(Asset asset) {
        assetRepository.save(asset);
    }

    private String generateFileName(String originalFilename) {
        var newFileName = UUID.randomUUID().toString();

        if (originalFilename == null) {
            return newFileName;
        }

        var position = originalFilename.lastIndexOf('.');
        var extension = position != -1 ? originalFilename.substring(position + 1) : "";
        return newFileName + (extension.isEmpty() ? "" : "." + extension);
    }

    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void cleanExpired() {
        var expiredAssets = assetRepository
                .findAllByOwnerIsNullAndDeletedAtIsNullAndCreatedAtBefore(LocalDateTime.now().minusDays(1));

        for (var asset : expiredAssets) {
            asset.softDelete();

            try {
                var key = extractS3Key(asset.getUrl());
                s3Template.deleteObject(bucketName, key);
                log.info("S3 object deleted: {}", key);
            } catch (Exception e) {
                asset.restore();
                log.error("Failed to delete S3 object: {}", asset.getUrl(), e);
            }
        }
    }

    private String extractS3Key(String url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }
}
