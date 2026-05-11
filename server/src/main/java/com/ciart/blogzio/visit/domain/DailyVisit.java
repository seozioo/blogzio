package com.ciart.blogzio.visit.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "daily_visits")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyVisit {

    @Id
    @Column(nullable = false)
    private LocalDate visitDate;

    @Column(nullable = false)
    private int visitCount = 0;

    public DailyVisit(LocalDate visitDate) {
        this.visitDate = visitDate;
        this.visitCount = 1;
    }
}
