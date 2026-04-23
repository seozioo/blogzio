package com.ciart.blogzio.post.domain;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.ArrayList;
import java.util.List;

public class ProseMirrorParser {

    private final StringBuilder textBuilder = new StringBuilder();
    private final List<String> imageUrls = new ArrayList<>();

    public ProseMirrorParser(JsonNode root) {
        walk(root);
    }

    private void walk(JsonNode node) {
        if (node == null || node.isMissingNode()) return;

        String type = node.has("type") ? node.get("type").asText() : null;

        if ("text".equals(type)) {
            if (node.has("text")) {
                textBuilder.append(node.get("text").asText());
            }
            return;
        }

        if ("image".equals(type)) {
            JsonNode attrs = node.get("attrs");
            if (attrs != null && attrs.has("src")) {
                imageUrls.add(attrs.get("src").asText());
            }
            return;
        }

        // 블록 노드 사이에 공백 삽입 (paragraph, heading 등)
        boolean isBlock = type != null && !"doc".equals(type);

        if (isBlock && !textBuilder.isEmpty()) {
            textBuilder.append(' ');
        }

        JsonNode content = node.get("content");
        if (content != null && content.isArray()) {
            for (JsonNode child : content) {
                walk(child);
            }
        }
    }

    public String getPlainText() {
        return textBuilder.toString().strip();
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }
}
