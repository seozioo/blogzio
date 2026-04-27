package com.ciart.blogzio.visit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ciart.blogzio.visit.domain.VisitorLog;

import java.time.LocalDateTime;

public interface VisitorLogRepository extends JpaRepository<VisitorLog, String> {

    @Modifying
    @Query("DELETE FROM VisitorLog v WHERE v.visitedAt < :threshold")
    void deleteExpired(LocalDateTime threshold);
}
