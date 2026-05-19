package com.ciart.blogzio.visit.service;

import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ciart.blogzio.config.IpEncoder;
import com.ciart.blogzio.visit.domain.DailyVisit;
import com.ciart.blogzio.visit.domain.VisitorLog;
import com.ciart.blogzio.visit.dto.VisitResponse;
import com.ciart.blogzio.visit.repository.DailyVisitRepository;
import com.ciart.blogzio.visit.repository.VisitorLogRepository;

import java.time.LocalDate;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitorLogRepository visitorLogRepository;
    private final DailyVisitRepository dailyVisitRepository;
    private final EntityManager entityManager;
    private final IpEncoder ipEncoder;

    @PostConstruct
    @Transactional
    public void setUnlogged() {
        // H2는 UNLOGGED 테이블을 지원하지 않으므로, PostgreSQL에서만 적용
        String dialect = entityManager.getEntityManagerFactory().getProperties()
                .getOrDefault("hibernate.dialect", "").toString();
        if (dialect.toLowerCase().contains("postgresql")) {
            entityManager.createNativeQuery("ALTER TABLE visitor_logs SET UNLOGGED").executeUpdate();
        }
    }

    @Transactional
    public boolean log(String ip) {
        String encoded = ipEncoder.encode(ip);
        LocalDate today = LocalDate.now(ZoneId.of("Asia/Seoul"));

        if (!visitorLogRepository.existsByIpHashAndVisitDate(encoded, today)) {
            visitorLogRepository.save(new VisitorLog(encoded));

            if (dailyVisitRepository.incrementVisitCount(today) == 0) {
                dailyVisitRepository.save(new DailyVisit(today));
            }

            return true;
        }

        return false;
    }

    @Transactional(readOnly = true)
    public VisitResponse getVisitCount() {
        int today = dailyVisitRepository.findById(LocalDate.now(ZoneId.of("Asia/Seoul")))
                .map(DailyVisit::getVisitCount)
                .orElse(0);
        long total = dailyVisitRepository.getTotalVisitCount();
        return new VisitResponse(today, total);
    }

    @Scheduled(cron = "0 0 1 * * *")
    @Transactional
    public void cleanExpired() {
        visitorLogRepository.deleteExpired(LocalDate.now(ZoneId.of("Asia/Seoul")));
    }
}
