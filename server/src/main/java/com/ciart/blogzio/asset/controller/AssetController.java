package com.ciart.blogzio.asset.controller;

import com.ciart.blogzio.asset.dto.CreateAssetRequest;
import com.ciart.blogzio.asset.dto.CreateAssetResponse;
import com.ciart.blogzio.asset.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CreateAssetResponse> create(@ModelAttribute CreateAssetRequest request) {
        if (request.getFile() == null || request.getFile().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "파일이 비어있습니다.");
        }

        var url = assetService.upload(request.getFile());

        return ResponseEntity.ok(new CreateAssetResponse(url));
    }
}
