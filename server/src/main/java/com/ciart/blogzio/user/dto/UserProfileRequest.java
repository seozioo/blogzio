package com.ciart.blogzio.user.dto;

import com.ciart.blogzio.asset.domain.Asset;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserProfileRequest {
    private String name;
    private String bio;
    private Asset profileImage;
}