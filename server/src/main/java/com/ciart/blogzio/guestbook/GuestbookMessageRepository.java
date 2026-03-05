package com.ciart.blogzio.guestbook;

import com.ciart.blogzio.guestbook.domain.GuestbookMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GuestbookMessageRepository extends JpaRepository<GuestbookMessage, UUID> {
}
