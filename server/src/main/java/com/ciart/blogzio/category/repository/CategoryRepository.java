package com.ciart.blogzio.category.repository;

import com.ciart.blogzio.category.domain.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface CategoryRepository extends CrudRepository<Category, UUID> {
}
