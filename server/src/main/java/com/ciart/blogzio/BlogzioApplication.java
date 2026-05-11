package com.ciart.blogzio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BlogzioApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogzioApplication.class, args);
	}

}
