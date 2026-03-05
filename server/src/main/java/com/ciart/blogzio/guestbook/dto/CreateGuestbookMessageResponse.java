package com.ciart.blogzio.guestbook.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;
import java.util.UUID;

@Getter
@AllArgsConstructor
public class CreateGuestbookMessageResponse {
    private UUID id;
    private Date createdAt;
}
