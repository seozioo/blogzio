package com.ciart.blogzio.config;

import org.springframework.validation.Errors;

public class ValidationFailedException extends RuntimeException {
    public ValidationFailedException(Errors errors) {

    }
}
