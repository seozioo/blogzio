package com.ciart.blogzio.user.controller;

import com.ciart.blogzio.user.dto.UserRequest;
import com.ciart.blogzio.user.dto.UserResponse;
import com.ciart.blogzio.user.service.UserService;
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
