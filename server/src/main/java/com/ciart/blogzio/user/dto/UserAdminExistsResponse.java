package com.ciart.blogzio.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAdminExistsResponse {
    private boolean exists;
}
