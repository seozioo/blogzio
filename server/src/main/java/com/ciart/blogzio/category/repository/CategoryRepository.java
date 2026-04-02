package com.ciart.blogzio.category.repository;

import com.ciart.blogzio.category.domain.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends CrudRepository<Category, UUID> {
    Optional<Category> findById(UUID id);

    @Query("SELECT COALESCE(MAX(c.sortOrder), 0) FROM Category c")
    int findMaxSortOrder();

    List<Category> findAllByOrderBySortOrderAsc();
}
