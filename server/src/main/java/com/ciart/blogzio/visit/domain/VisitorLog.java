package com.ciart.blogzio.visit.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HexFormat;

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

    public VisitorLog(String ip, String salt) {
        this.ipHash = hash(ip, salt);
        this.visitedAt = LocalDateTime.now();
    }

    public static String hash(String ip, String salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest((ip + salt).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
