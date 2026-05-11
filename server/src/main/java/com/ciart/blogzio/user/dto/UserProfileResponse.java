package com.ciart.blogzio.user.dto;

import com.ciart.blogzio.asset.domain.Asset;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserProfileResponse {
    private String nickname;
    private String bio;
    private String profileImageUrl;
}
