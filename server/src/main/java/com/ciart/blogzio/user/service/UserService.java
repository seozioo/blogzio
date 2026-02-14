package com.ciart.blogzio.user.service;

import com.ciart.blogzio.user.domain.User;
import com.ciart.blogzio.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerAdmin(String email, String rawPassword){
        if(userRepository.count() > 0){
            throw new RuntimeException("관리자 계정이 존재합니다.");
        }

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(rawPassword))
                .build();

        return userRepository.save(user);
    }


}