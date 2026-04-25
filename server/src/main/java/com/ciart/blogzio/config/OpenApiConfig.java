package com.ciart.blogzio.config;

import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenApiCustomizer globalErrorResponseCustomizer() {
        var errorContent = new Content().addMediaType(
                "text/plain",
                new MediaType().schema(new StringSchema()));

        return openApi -> openApi.getPaths().values().forEach(pathItem ->
                pathItem.readOperations().forEach(operation -> {
                    var responses = operation.getResponses();

                    responses.putIfAbsent("400",
                            new ApiResponse()
                                    .description("잘못된 요청")
                                    .content(errorContent));

                    responses.putIfAbsent("401",
                            new ApiResponse()
                                    .description("인증 실패")
                                    .content(errorContent));

                    responses.putIfAbsent("500",
                            new ApiResponse()
                                    .description("서버 내부 오류")
                                    .content(errorContent));
                }));
    }
}
