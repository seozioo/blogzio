package com.ciart.blogzio.user.controller;

import com.ciart.blogzio.user.dto.UserAdminExistsResponse;
import com.ciart.blogzio.user.dto.UserRequest;
import com.ciart.blogzio.user.dto.UserResponse;
import com.ciart.blogzio.user.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/admin-exists")
    @Operation(description = "관리자 계정 존재 여부를 확인합니다.")
    public ResponseEntity<UserAdminExistsResponse> getAdminExists() {
        try {
            boolean isExists = userService.checkAdminExists();
            return ResponseEntity.ok(new UserAdminExistsResponse(isExists));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "관리자 계정 존재 여부 확인 중 오류가 발생했습니다.");
        }
    }
}
