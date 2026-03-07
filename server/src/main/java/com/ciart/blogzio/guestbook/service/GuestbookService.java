package com.ciart.blogzio.guestbook.service;

import com.ciart.blogzio.guestbook.domain.GuestbookMessage;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageBackgoundColor;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;
import com.ciart.blogzio.guestbook.repository.GuestbookMessageRepository;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class GuestbookService {

    private final GuestbookMessageRepository guestbookMessageRepository;
    private final PasswordEncoder passwordEncoder;

    public List<GuestbookMessage> getAllMessages() {
        return guestbookMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public GuestbookMessage createMessage(
        String nickname,
        GuestbookMessageContentType contentType,
        Map<String, Object> content,
        GuestbookMessageBackgoundColor backgroundColor,
        String password
    ) {
        var guestbookMessage = GuestbookMessage.builder()
            .nickname(nickname)
            .contentType(contentType)
            .content(content)
            .password(passwordEncoder.encode(password))
            .backgroundColor(backgroundColor)
            .build();

        guestbookMessageRepository.save(guestbookMessage);

        return guestbookMessage;
    }

    public void deleteMessage(UUID id, String password) {
        var guestbookMessage = guestbookMessageRepository
            .findById(id)
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "방명록 메시지를 찾을 수 없습니다."
                )
            );

        if (
            !passwordEncoder.matches(password, guestbookMessage.getPassword())
        ) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "비밀번호가 일치하지 않습니다."
            );
        }

        guestbookMessageRepository.delete(guestbookMessage);
    }
}
