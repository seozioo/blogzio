package com.ciart.blogzio.post.domain;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

public class PostLikeId implements Serializable {

    private UUID post;
    private String ipHash;

    public PostLikeId() {}

    public PostLikeId(UUID post, String ipHash) {
        this.post = post;
        this.ipHash = ipHash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PostLikeId that)) return false;
        return Objects.equals(post, that.post) && Objects.equals(ipHash, that.ipHash);
    }

    @Override
    public int hashCode() {
        return Objects.hash(post, ipHash);
    }
}
