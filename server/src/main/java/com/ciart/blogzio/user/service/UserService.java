package com.ciart.blogzio.user.service;

import com.ciart.blogzio.asset.domain.Asset;
import com.ciart.blogzio.asset.repository.AssetRepository;
import com.ciart.blogzio.user.domain.User;
import com.ciart.blogzio.user.dto.UserProfileResponse;
import com.ciart.blogzio.user.dto.UserProfileUpdateRequest;
import com.ciart.blogzio.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AssetRepository assetRepository;

    // TODO: 멀티 쓰레드 혹은 멀티 인스턴스 환경에서 문제될 수 있음. 관리자 계정 구조 변경하면서 수정해야 함.
    private boolean isAdminExists;

    public User registerAdmin(String username, String email, String rawPassword) {
        if (userRepository.count() > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "관리자 계정이 존재합니다.");
        }

        User user = User.builder()
                .username(username)
                .nickname("유저")
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .build();

        return userRepository.save(user);
    }

    public User login(String username, String rawPassword) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("유저 이름을 다시 입력해주십시오."));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return user;
    }

    public boolean checkAdminExists() {
        try {
            if (isAdminExists) {
                return true;
            }

            isAdminExists = userRepository.count() > 0;
            return isAdminExists;
        } catch (Exception e) {
            log.error("관리자 계정 존재 여부 확인 중 오류 발생: {}", e);
            throw new RuntimeException("관리자 계정 존재 여부 확인 중 오류가 발생했습니다.");
        }
    }

    public UserProfileResponse getProfile(UUID userid) {
        User user = userRepository.findById(userid)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "유저를 찾을 수 없습니다."));

        return new UserProfileResponse(user.getNickname(), user.getBio(), user.getProfileImageUrl());
    }

    @Transactional
    public UserProfileResponse updateProfile(UUID userid, UserProfileUpdateRequest request) {

        User user = userRepository.findById(userid)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."));

        user.update(request.getNickname(), request.getBio(), request.getProfileImageUrl());

        userRepository.save(user);

        return new UserProfileResponse(request.getNickname(), request.getBio(), request.getProfileImageUrl());
    }

}
