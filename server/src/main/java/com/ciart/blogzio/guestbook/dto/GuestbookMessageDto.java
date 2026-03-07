package com.ciart.blogzio.guestbook.dto;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GuestbookMessageDto {
    private UUID id;

    private String nickname;

    private GuestbookMessageContentType contentType;

    private Map<String, Object> content;

    private LocalDateTime createdAt;
}
