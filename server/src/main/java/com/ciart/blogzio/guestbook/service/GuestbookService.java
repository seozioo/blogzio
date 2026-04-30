package com.ciart.blogzio.guestbook.service;

import com.ciart.blogzio.asset.service.AssetService;
import com.ciart.blogzio.guestbook.domain.GuestbookMessage;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageBackgroundColor;
import com.ciart.blogzio.guestbook.domain.GuestbookMessageContentType;
import com.ciart.blogzio.guestbook.repository.GuestbookMessageRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class GuestbookService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final GuestbookMessageRepository guestbookMessageRepository;
    private final PasswordEncoder passwordEncoder;
    private final AssetService assetService;

    public List<GuestbookMessage> getAllMessages() {
        return guestbookMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public GuestbookMessage createMessage(
        String nickname,
        GuestbookMessageContentType contentType,
        String content,
        GuestbookMessageBackgroundColor backgroundColor,
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

        if (guestbookMessage.getContentType() == GuestbookMessageContentType.IMAGE) {
            var url = content;

            try {
                var asset = assetService.findByUrl(url);
                asset.setOwner(guestbookMessage);
                assetService.save(asset);
            } catch (Exception e) {
                log.error("방명록 그림 등록 실패", e);
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "방명록 그림 등록에 실패했습니다.");
            }
        }

        return guestbookMessage;
    }

    @Transactional
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

        var assets = assetService.findAllByOwner(guestbookMessage);
        for (var asset : assets) {
            asset.setOwner(null);
        }

        guestbookMessageRepository.delete(guestbookMessage);
    }
}
