package com.ciart.blogzio.asset.service;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.repository.AssetRepository;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AssetService {
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

            var asset = Asset.builder()
                    .originalFilename(originalFilename)
                    .url(url)
                    .build();
            assetRepository.save(asset);

            return url;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }
    }

    public Asset findByUrl(String url) {
        return assetRepository.findByUrl(url).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "해당 URL의 자산을 찾을 수 없습니다."));
    }

    public Asset save(Asset asset) {
        return assetRepository.save(asset);
    }

    private String generateFileName(String originalFilename) {
        var position = originalFilename.lastIndexOf('.');
        var extension = position != -1 ? originalFilename.substring(position + 1) : "";
        return UUID.randomUUID() + (extension.isEmpty() ? "" : "." + extension);
    }
}
