package com.ciart.blogzio.visit.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciart.blogzio.visit.dto.VisitResponse;
import com.ciart.blogzio.visit.service.VisitService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/visit")
public class VisitController {
    private final VisitService visitService;

    @GetMapping
    public ResponseEntity<VisitResponse> getVisitCount() {
        return ResponseEntity.ok(visitService.getVisitCount());
    }

    @PostMapping("/daily")
    public ResponseEntity<Void> logDailyVisitor(HttpServletRequest request) {
        visitService.log(request.getRemoteAddr());
        return ResponseEntity.ok().build();
    }
}
