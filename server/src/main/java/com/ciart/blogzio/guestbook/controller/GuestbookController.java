package com.ciart.blogzio.guestbook.controller;

import com.ciart.blogzio.guestbook.dto.*;
import com.ciart.blogzio.guestbook.service.GuestbookService;
import java.util.UUID;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/guestbook")
@RequiredArgsConstructor
public class GuestbookController {

    private final GuestbookService guestbookService;

    @GetMapping
    public ResponseEntity<GetAllGuestbookMessagesResponse> getAll() {
        var messages = guestbookService
            .getAllMessages()
            .stream()
            .map(m ->
                new GuestbookMessageDto(
                    m.getId(),
                    m.getNickname(),
                    m.getContentType(),
                    m.getContent(),
                    m.getBackgroundColor(),
                    m.getCreatedAt()
                )
            )
            .toArray(GuestbookMessageDto[]::new);

        return ResponseEntity.ok(new GetAllGuestbookMessagesResponse(messages));
    }

    @PostMapping
    public ResponseEntity<CreateGuestbookMessageResponse> create(
        @Valid @RequestBody CreateGuestbookMessageRequest request,
        Errors errors
    ) {
        if (errors.hasErrors()) {
            var errorMessages = new StringBuilder();

            for (var error : errors.getFieldErrors()) {
                errorMessages
                    .append(error.getField())
                    .append(": ")
                    .append(error.getDefaultMessage())
                    .append("; ");
            }

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "유효하지 않은 입력입니다." + errorMessages.toString()
            );
        }

        var guestbookMessage = guestbookService.createMessage(
            request.getNickname(),
            request.getContentType(),
            request.getContent(),
            request.getBackgroundColor(),
            request.getPassword()
        );

        return ResponseEntity.ok(
            new CreateGuestbookMessageResponse(
                guestbookMessage.getId(),
                guestbookMessage.getCreatedAt()
            )
        );
    }

    @DeleteMapping("/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "200"),
        @ApiResponse(responseCode = "404", description = "방명록 메시지를 찾을 수 없습니다."),
        @ApiResponse(responseCode = "403", description = "비밀번호가 일치하지 않습니다.")
    })
    public ResponseEntity<Void> delete(
        @PathVariable UUID id,
        @RequestBody DeleteGuestbookMessageRequest request
    ) {
        guestbookService.deleteMessage(id, request.getPassword());

        return ResponseEntity.noContent().build();
    }
}
