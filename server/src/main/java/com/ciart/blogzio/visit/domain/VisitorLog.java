package com.ciart.blogzio.visit.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitor_logs")
@IdClass(VisitorLogId.class)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VisitorLog {

    @Id
    @Column(nullable = false, length = 64)
    private String ipHash;

    @Id
    @Column(nullable = false)
    private LocalDate visitDate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public VisitorLog(String ipHash) {
        this.ipHash = ipHash;
        this.visitDate = LocalDate.now();
        this.createdAt = LocalDateTime.now();
    }
}
