package com.ciart.blogzio.category.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import com.ciart.blogzio.category.categoryDto.CategoryCreateRequset;

import com.ciart.blogzio.category.categoryDto.CategoryResponse;
import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.category.repository.CategoryRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Optional<Category> find(UUID categoryId) {
        return categoryRepository.findById(categoryId);
    }

    // 카테고리 순서 변경시 전체 값 불러와서 새로 정렬되도록

    // 생성시 생성만 가능(카테고리 순서를 바꾸는 건 생성과 별개) (생성 후에 순서를 바꿀 수 있음)
    @Transactional
    public CategoryResponse createCategory(CategoryCreateRequset requset) {

        int sortOrder = categoryRepository.findMaxSortOrder() + 1;

        Category category = Category.builder()
                .name(requset.getName())
                .slug(requset.getSlug())
                .type(requset.getType())
                .sortOrder(sortOrder)
                .build();
        return CategoryResponse.from(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse updateCategory(UUID categoryId, String name, String slug) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NoSuchElementException(
                        "해당 카테고리를 찾을 수 없습니다."));

        category.update(
                name,
                slug);
        return CategoryResponse.from(category);
    }

    @Transactional
    public ResponseEntity<Void> deleteCategory(UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NoSuchElementException(
                        "해당 카테고리를 찾을 수 없습니다."));

        categoryRepository.deleteById(categoryId);
        return ResponseEntity.noContent().build();
    }

    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderBySortOrderAsc();
    }
}