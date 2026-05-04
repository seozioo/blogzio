package com.ciart.blogzio.visit.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_logs")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VisitorLog {

    @Id
    @Column(nullable = false, length = 64)
    private String ipHash;

    @Column(nullable = false)
    private LocalDateTime visitedAt;

    public VisitorLog(String ipHash) {
        this.ipHash = ipHash;
        this.visitedAt = LocalDateTime.now();
    }
}
