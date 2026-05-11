package com.ciart.blogzio.asset.controller;

import com.ciart.blogzio.asset.dto.CreateAssetRequest;
import com.ciart.blogzio.asset.dto.CreateAssetResponse;
import com.ciart.blogzio.asset.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;
    private final AtomicInteger anonymousUploadCount = new AtomicInteger(0);
    private volatile long currentSecond = System.currentTimeMillis() / 1000;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreateAssetResponse> create(@ModelAttribute CreateAssetRequest request) {
        if (request.getFile() == null || request.getFile().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "파일이 비어있습니다.");
        }

        var auth = SecurityContextHolder.getContext().getAuthentication();
        var isAnonymous = auth == null || auth.getPrincipal().equals("anonymousUser");

        if (isAnonymous) {
            long now = System.currentTimeMillis() / 1000;
            if (now != currentSecond) {
                currentSecond = now;
                anonymousUploadCount.set(0);
            }
            if (anonymousUploadCount.incrementAndGet() > 10) {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "업로드 요청이 너무 많습니다. 다시 시도 해주세요.");
            }
        }

        var url = assetService.upload(request.getFile());

        return ResponseEntity.ok(new CreateAssetResponse(url));
    }
}
