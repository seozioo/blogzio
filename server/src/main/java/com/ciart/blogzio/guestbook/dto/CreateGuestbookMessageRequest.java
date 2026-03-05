package com.ciart.blogzio.guestbook.dto;

import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateGuestbookMessageRequest {
    private GuestbookMessageContentType contentType;
    private JsonNode content;
    private String password;
}
