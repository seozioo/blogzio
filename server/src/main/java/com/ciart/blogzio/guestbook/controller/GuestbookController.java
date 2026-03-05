package com.ciart.blogzio.guestbook.controller;

import com.ciart.blogzio.guestbook.dto.CreateGuestbookMessageRequest;
import com.ciart.blogzio.guestbook.dto.CreateGuestbookMessageResponse;
import com.ciart.blogzio.guestbook.service.GuestbookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/guestbook")
@RequiredArgsConstructor
public class GuestbookController {
    private final GuestbookService guestbookService;

    @PostMapping("/")
    public ResponseEntity<CreateGuestbookMessageResponse> create(@RequestBody CreateGuestbookMessageRequest request) {
        guestbookService.createMessage(request.getContentType(), request.getContent(), request.getPassword());
    }
}
