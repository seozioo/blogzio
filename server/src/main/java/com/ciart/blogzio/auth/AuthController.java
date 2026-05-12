package com.ciart.blogzio.auth;

import com.ciart.blogzio.auth.dto.LoginRequest;
import com.ciart.blogzio.auth.dto.LoginResponse;
import com.ciart.blogzio.user.service.UserService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;

import java.time.Duration;
import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
        private final UserService userService;
        private final JwtUtil jwtUtil;
        private final long ATEXP = 1000L * 60 * 30; // 1000 * 60 * 60; 1시간
        private final Duration RT_DURATION = Duration.ofDays(30);
        private final long RTEXP = RT_DURATION.toMillis();

        @PostMapping("/login")
        public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

                var user = userService.login(
                                request.getUsername(),
                                request.getPassword());

                String token = jwtUtil.generateToken(
                                user.getId(),
                                ATEXP);

                String refreshToken = jwtUtil.generateToken(
                                user.getId(),
                                RTEXP);

                ResponseCookie responseCookie = ResponseCookie.from("RT", refreshToken)
                                .maxAge(RT_DURATION)
                                .secure(true)
                                .httpOnly(true)
                                .path("/")
                                .build();

                return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                                .body(new LoginResponse(token));
        }

        @PostMapping("/logout")
        public ResponseEntity<Void> logout() {
                ResponseCookie deleteCookie = ResponseCookie.from("RT", "")
                                .maxAge(0)
                                .secure(true)
                                .httpOnly(true)
                                .path("/")
                                .build();

                return ResponseEntity.ok()
                                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                                .build();
        }

        @PostMapping("/refresh")
        public ResponseEntity<LoginResponse> refresh(@CookieValue("RT") String refreshToken) {

                try {
                        UUID userId = jwtUtil.getUserId(refreshToken);

                        String token = jwtUtil.generateToken(userId, ATEXP);

                        String refresh = jwtUtil.generateToken(userId, RTEXP);

                        ResponseCookie responseCookie = ResponseCookie.from("RT", refresh)
                                        .maxAge(RT_DURATION)
                                        .secure(true)
                                        .httpOnly(true)
                                        .path("/")
                                        .build();

                        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                                        .body(new LoginResponse(token));

                } catch (Exception e) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
                }
        }

        /*
         * @GetMapping("/me")
         * public String me(Authentication authentication) {
         * User user = (User) authentication.getPrincipal();
         * return user.getEmail();
         * }
         */

}
