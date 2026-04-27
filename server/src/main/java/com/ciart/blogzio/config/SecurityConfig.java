package com.ciart.blogzio.config;

import com.ciart.blogzio.auth.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
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
        public SecurityFilterChain filterChain(HttpSecurity http)
                        throws Exception {

                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/auth/**").permitAll()
                                                .requestMatchers("/user/signup").permitAll()
                                                .requestMatchers("/user/admin-exists").permitAll()
                                                .requestMatchers("/v3/api-docs").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/post", "/post/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/category").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/guestbook").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/guestbook").permitAll()
                                                .requestMatchers(HttpMethod.DELETE, "/guestbook/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/visit").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/visit/daily").permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session.sessionCreationPolicy(
                                                SessionCreationPolicy.STATELESS))
                                .addFilterBefore(
                                                jwtAuthenticationFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
