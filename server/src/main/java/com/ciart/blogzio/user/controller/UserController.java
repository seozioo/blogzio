package com.blogzio.user.controller;

import com.blogzio.user.dto.UserRequest;
import com.blogzio.user.dto.UserResponse;
import com.blogzio.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody UserRequest request) {
        try {
            var user = userService.registerAdmin(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(new UserResponse("관리자 계정 생성 완료: " + user.getEmail()));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(new UserResponse(e.getMessage()));
        }
    }

}
