package com.ciart.blogzio.user.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileUpdateRequest {

    @NotBlank
    @Size(max = 20)
    private String nickname;

    @Size(max = 50)
    private String bio;

    private String profileImageUrl;

}
