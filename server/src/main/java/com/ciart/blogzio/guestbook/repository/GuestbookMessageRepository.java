package com.ciart.blogzio.guestbook.repository;

import com.ciart.blogzio.guestbook.domain.GuestbookMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GuestbookMessageRepository extends JpaRepository<GuestbookMessage, UUID> {
    public List<GuestbookMessage> findAllByOrderByCreatedAtDesc();
}
