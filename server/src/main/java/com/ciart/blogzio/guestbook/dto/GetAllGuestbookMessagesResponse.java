package com.ciart.blogzio.guestbook.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetAllGuestbookMessagesResponse {
    private final GuestbookMessageDto[] messages;
}
