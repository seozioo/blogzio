package com.ciart.blogzio.user.service;

import com.ciart.blogzio.user.domain.User;
import com.ciart.blogzio.user.repository.UserRepository;
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


    public User login(String email, String rawPassword){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("이메일을 다시 입력해주세요."));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        return user;
    }


}