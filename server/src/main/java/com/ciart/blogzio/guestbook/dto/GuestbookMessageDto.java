package com.ciart.blogzio.guestbook.dto;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import com.ciart.blogzio.guestbook.domain.GuestbookMessageBackgoundColor;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GuestbookMessageDto {
    @NotNull
    private UUID id;

    @NotBlank
    private String nickname;

    @NotNull
    private GuestbookMessageContentType contentType;

    @NotBlank
    private String content;

    private GuestbookMessageBackgoundColor backgroundColor;

    @NotNull
    private LocalDateTime createdAt;
}
