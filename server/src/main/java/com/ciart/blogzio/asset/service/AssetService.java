package com.ciart.blogzio.asset.service;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.repository.AssetRepository;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutBucketAclRequest;

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

            if (!s3Template.bucketExists(bucketName)) {
                s3Template.createBucket(bucketName);
            }

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
                    }
            );

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
}
