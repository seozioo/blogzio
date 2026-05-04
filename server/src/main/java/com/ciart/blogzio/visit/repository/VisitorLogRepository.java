package com.ciart.blogzio.visit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.ciart.blogzio.visit.domain.VisitorLog;
import com.ciart.blogzio.visit.domain.VisitorLogId;

import java.time.LocalDate;

public interface VisitorLogRepository extends JpaRepository<VisitorLog, VisitorLogId> {

    boolean existsByIpHashAndVisitDate(String ipHash, LocalDate visitDate);

    @Modifying
    @Query("DELETE FROM VisitorLog v WHERE v.visitDate < :threshold")
    void deleteExpired(LocalDate threshold);
}
