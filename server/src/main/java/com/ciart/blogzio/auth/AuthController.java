package com.ciart.blogzio.auth;

import com.ciart.blogzio.auth.dto.LoginRequest;
import com.ciart.blogzio.auth.dto.LoginResponse;
import com.ciart.blogzio.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        var user = userService.login(
                request.getUsername(),
                request.getPassword()
        );

        String token = jwtUtil.generateToken(
                user.getUuid(),
                user.getUsername(),
                user.getEmail()
        );

        return ResponseEntity.ok(new LoginResponse(token));
    }

    /*
    @GetMapping("/me")
    public String me(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return user.getEmail();
    }
    */

}
