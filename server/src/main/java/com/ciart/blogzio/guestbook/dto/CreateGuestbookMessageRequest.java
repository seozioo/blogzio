package com.ciart.blogzio.guestbook.dto;

import java.util.Map;

import com.ciart.blogzio.guestbook.domain.GuestbookMessageBackgoundColor;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateGuestbookMessageRequest {
    @NotBlank
    private String nickname;

    @NotNull
    private GuestbookMessageContentType contentType;

    @NotNull
    private Map<String, Object> content;

    @NotBlank
    private String password;

    private GuestbookMessageBackgoundColor backgroundColor;
}
