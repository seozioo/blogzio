package com.ciart.blogzio.config;

import org.springframework.validation.Errors;
import java.util.stream.Collectors;

public class ValidationFailedException extends RuntimeException {
    public ValidationFailedException(Errors errors) {
        super(errors.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", ")));
    }
}
