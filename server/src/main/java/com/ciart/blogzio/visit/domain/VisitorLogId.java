package com.ciart.blogzio.visit.domain;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class VisitorLogId implements Serializable {
    private String ipHash;
    private LocalDate visitDate;
}
