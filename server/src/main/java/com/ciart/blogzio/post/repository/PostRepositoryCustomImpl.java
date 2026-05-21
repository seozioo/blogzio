package com.ciart.blogzio.post.repository;

import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.category.domain.Category_;
import com.ciart.blogzio.post.domain.Post;
import com.ciart.blogzio.post.domain.Post_;
import com.ciart.blogzio.post.domain.Tag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PostRepositoryCustomImpl implements PostRepositoryCustom {

    private static final double SIMILARITY_THRESHOLD = 0.06;
    private static final char LIKE_ESCAPE_CHAR = '\\';

    private static String escapeLikePattern(String keyword) {
        return keyword
                .replace("\\", "\\\\")
                .replace("%", "\\%")
                .replace("_", "\\_");
    }

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Post> findAllDynamic(Pageable pageable, String keyword, UUID categoryId, Boolean isVisible,
            boolean thumbnailOnly, List<UUID> tagIds) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        boolean hasKeyword = keyword != null && !keyword.isBlank();

        // 데이터 조회
        CriteriaQuery<Post> cq = cb.createQuery(Post.class);
        Root<Post> post = cq.from(Post.class);
        SimilarityExpressions sim = hasKeyword ? new SimilarityExpressions(cb, post, keyword) : null;

        cq.where(buildWhere(cb, sim, post, categoryId, isVisible, thumbnailOnly, tagIds));

        if (hasKeyword) {
            cq.orderBy(cb.desc(sim.max()), cb.desc(post.get(Post_.postedAt)));
        } else {
            cq.orderBy(cb.desc(post.get(Post_.postedAt)));
        }

        List<Post> results = em.createQuery(cq)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();

        // 카운트
        CriteriaQuery<Long> countCq = cb.createQuery(Long.class);
        Root<Post> countRoot = countCq.from(Post.class);
        SimilarityExpressions countSim = hasKeyword ? new SimilarityExpressions(cb, countRoot, keyword) : null;

        countCq.select(cb.count(countRoot));
        countCq.where(buildWhere(cb, countSim, countRoot, categoryId, isVisible, thumbnailOnly, tagIds));

        long total = em.createQuery(countCq).getSingleResult();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public long countNewerThan(Category category, Boolean isVisible, LocalDateTime postedAt) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<Post> post = cq.from(Post.class);
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(cb.greaterThan(post.get(Post_.postedAt), postedAt));

        if (category != null) {
            predicates.add(cb.equal(post.get(Post_.category), category));
        }

        if (isVisible != null) {
            predicates.add(cb.equal(post.get(Post_.isVisible), isVisible));
        }

        cq.select(cb.count(post));
        cq.where(cb.and(predicates.toArray(new Predicate[0])));

        return em.createQuery(cq).getSingleResult();
    }

    private Predicate buildWhere(CriteriaBuilder cb, SimilarityExpressions sim,
            Root<Post> post, UUID categoryId, Boolean isVisible, boolean thumbnailOnly, List<UUID> tagIds) {
        List<Predicate> predicates = new ArrayList<>();

        if (sim != null) {
            String escaped = escapeLikePattern(sim.keyword);
            Expression<String> pattern = cb.concat(cb.concat(cb.literal("%"), cb.literal(escaped)), cb.literal("%"));

            predicates.add(cb.or(
                    cb.like(post.get(Post_.title), pattern, LIKE_ESCAPE_CHAR),
                    cb.like(post.get(Post_.contentText), pattern, LIKE_ESCAPE_CHAR),
                    cb.greaterThanOrEqualTo(sim.title, SIMILARITY_THRESHOLD),
                    cb.greaterThanOrEqualTo(sim.content, SIMILARITY_THRESHOLD)));
        }

        if (categoryId != null) {
            predicates.add(cb.equal(post.get(Post_.category).get(Category_.id), categoryId));
        }

        if (isVisible != null) {
            predicates.add(cb.equal(post.get(Post_.isVisible), isVisible));
        }

        if (thumbnailOnly) {
            predicates.add(cb.isNotNull(post.get(Post_.thumbnail)));
        }

        if (tagIds != null && !tagIds.isEmpty()) {
            for (UUID tagId : tagIds) {
                Subquery<Long> sq = cb.createQuery().subquery(Long.class);
                Root<Post> sqPost = sq.correlate(post);
                Join<Post, Tag> sqTag = sqPost.join(Post_.tags);
                sq.select(cb.literal(1L));
                sq.where(cb.equal(sqTag.get("id"), tagId));
                predicates.add(cb.exists(sq));
            }
        }

        return predicates.isEmpty()
                ? cb.conjunction()
                : cb.and(predicates.toArray(new Predicate[0]));
    }

    private static class SimilarityExpressions {
        final String keyword;
        final Expression<Double> title;
        final Expression<Double> content;
        private final CriteriaBuilder cb;

        SimilarityExpressions(CriteriaBuilder cb, Root<Post> post, String keyword) {
            this.cb = cb;
            this.keyword = keyword;
            this.title = cb.function("bigm_similarity", Double.class,
                    post.get(Post_.title), cb.literal(keyword));
            this.content = cb.function("bigm_similarity", Double.class,
                    cb.coalesce(post.get(Post_.contentText), cb.literal("")), cb.literal(keyword));
        }

        Expression<Double> max() {
            return cb.<Double>selectCase()
                    .when(cb.greaterThanOrEqualTo(title, content), title)
                    .otherwise(content);
        }
    }
}
