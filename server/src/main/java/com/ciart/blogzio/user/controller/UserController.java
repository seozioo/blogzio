package com.ciart.blogzio.user.controller;

import com.ciart.blogzio.user.dto.UserRequest;
import com.ciart.blogzio.user.dto.UserResponse;
import com.ciart.blogzio.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody UserRequest request) {
        var user = userService.registerAdmin(request.getUsername(), request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new UserResponse("관리자 계정 생성 완료: " + user.getEmail()));
    }
}
