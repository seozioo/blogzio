package com.ciart.blogzio.visit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ciart.blogzio.visit.domain.DailyVisit;

import java.time.LocalDate;

public interface DailyVisitRepository extends JpaRepository<DailyVisit, LocalDate> {

    @Modifying
    @Query("UPDATE DailyVisit d SET d.visitCount = d.visitCount + 1 WHERE d.visitDate = :date")
    int incrementVisitCount(@Param("date") LocalDate date);

    @Query("SELECT COALESCE(SUM(d.visitCount), 0) FROM DailyVisit d")
    long getTotalVisitCount();
}
