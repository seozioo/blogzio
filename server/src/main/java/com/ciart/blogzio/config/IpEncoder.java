package com.ciart.blogzio.config;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

public class IpEncoder {

    private final String salt;

    public IpEncoder(String salt) {
        this.salt = salt;
    }

    public String encode(String ip) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest((ip + salt).getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean matches(String rawIp, String encodedIp) {
        return encode(rawIp).equals(encodedIp);
    }
}
