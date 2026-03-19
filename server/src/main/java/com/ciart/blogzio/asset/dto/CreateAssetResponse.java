package com.ciart.blogzio.asset.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateAssetResponse {
    @NotNull
    private String url;
}
