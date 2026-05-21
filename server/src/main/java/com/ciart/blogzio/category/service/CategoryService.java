package com.ciart.blogzio.category.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import com.ciart.blogzio.category.categoryDto.CategoryCreateRequset;

import com.ciart.blogzio.category.categoryDto.CategoryResponse;
import com.ciart.blogzio.category.domain.Category;
import com.ciart.blogzio.category.domain.CategoryType;
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
        if (categoryId == null) {
            return Optional.empty();
        }
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
    public CategoryResponse updateCategory(UUID categoryId, String name, String slug, CategoryType type) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NoSuchElementException(
                        "해당 카테고리를 찾을 수 없습니다."));

        category.update(
                name,
                slug,
                type);
        return CategoryResponse.from(category);
    }

    @Transactional
    public List<Category> updateCategoryOrder(UUID categoryId, int move) {
        List<Category> categories = categoryRepository.findAllByOrderBySortOrderAscForUpdate();
        int currentIndex = findCategoryIndex(categories, categoryId);
        int startSortOrder = categories.get(0).getSortOrder();

        Category category = categories.remove(currentIndex);
        int targetIndex = Math.max(0, Math.min(categories.size(), currentIndex + move));
        categories.add(targetIndex, category);

        normalizeSortOrder(categories, startSortOrder);

        return categories;
    }

    @Transactional
    public ResponseEntity<Void> deleteCategory(UUID categoryId) {
        List<Category> categories = categoryRepository.findAllByOrderBySortOrderAscForUpdate();
        int categoryIndex = findCategoryIndex(categories, categoryId);
        Category category = categories.remove(categoryIndex);
        int deletedSortOrder = category.getSortOrder();

        categoryRepository.delete(category);
        categories.stream()
                .filter(nextCategory -> nextCategory.getSortOrder() > deletedSortOrder)
                .forEach(nextCategory -> nextCategory.updateSortOrder(nextCategory.getSortOrder() - 1));

        return ResponseEntity.noContent().build();
    }

    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderBySortOrderAsc();
    }

    private int findCategoryIndex(List<Category> categories, UUID categoryId) {
        for (int i = 0; i < categories.size(); i++) {
            if (categories.get(i).getId().equals(categoryId)) {
                return i;
            }
        }
        throw new NoSuchElementException("해당 카테고리를 찾을 수 없습니다.");
    }

    private void normalizeSortOrder(List<Category> categories, int startSortOrder) {
        for (int i = 0; i < categories.size(); i++) {
            categories.get(i).updateSortOrder(startSortOrder + i);
        }
    }
}
