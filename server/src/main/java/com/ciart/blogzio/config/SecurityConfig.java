package com.ciart.blogzio.config;

import com.ciart.blogzio.auth.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public IpEncoder ipPasswordEncoder(@Value("${visitor.secret}") String salt) {
                return new IpEncoder(salt);
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http)
                        throws Exception {

                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/auth/**").permitAll()
                                                .requestMatchers("/user/signup").permitAll()
                                                .requestMatchers("/user/admin-exists").permitAll()
                                                .requestMatchers("/user/profileview").permitAll()
                                                .requestMatchers("/user/profile").authenticated()
                                                .requestMatchers("/v3/api-docs").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/post", "/post/**").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/post/*/like").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/category").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/guestbook").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/guestbook").permitAll()
                                                .requestMatchers(HttpMethod.DELETE, "/guestbook/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/visit").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/visit/daily").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/asset").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/youtube/**").permitAll()
                                                .anyRequest().authenticated())
                                .exceptionHandling(ex -> ex
                                                .authenticationEntryPoint((request, response, authException) -> {
                                                        if (Boolean.TRUE.equals(request.getAttribute("invalidToken"))) {
                                                                response.sendError(401, "Invalid Token");
                                                        } else {
                                                                response.sendError(403, "Forbidden");
                                                        }
                                                }))
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))
                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
