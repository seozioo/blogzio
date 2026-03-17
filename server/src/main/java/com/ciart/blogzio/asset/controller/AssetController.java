package com.ciart.blogzio.asset.controller;

import com.ciart.blogzio.asset.dto.CreateAssetRequest;
import com.ciart.blogzio.asset.dto.CreateAssetResponse;
import com.ciart.blogzio.asset.service.AssetService;
import com.ciart.blogzio.guestbook.dto.GetAllGuestbookMessagesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService assetService;

    @PostMapping("")
    public ResponseEntity<CreateAssetResponse> create(@ModelAttribute CreateAssetRequest request) {
        var url = assetService.upload(request.getFile());

        return ResponseEntity.ok(new CreateAssetResponse(url));
    }
}
