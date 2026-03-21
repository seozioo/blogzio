package com.ciart.blogzio.asset.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAssetRequest {
    @NotNull
    private MultipartFile file;
}
