package com.ciart.blogzio.guestbook.service;

import com.ciart.blogzio.guestbook.GuestbookMessageRepository;
import com.ciart.blogzio.guestbook.domain.GuestbookMessage;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuestbookService {
    private final GuestbookMessageRepository guestbookMessageRepository;
    private final PasswordEncoder passwordEncoder;

    public GuestbookMessage createMessage(GuestbookMessageContentType contentType, JsonNode content, String password) {
        var guestbookMessage = GuestbookMessage.builder().content_type(contentType).content(content).password(passwordEncoder.encode(password)).build();

        guestbookMessageRepository.save(guestbookMessage);

        return guestbookMessage;
    }
}
