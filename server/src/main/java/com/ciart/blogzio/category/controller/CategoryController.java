package com.ciart.blogzio.category.controller;

import com.ciart.blogzio.category.categoryDto.CategoryCreateRequset;
import com.ciart.blogzio.category.categoryDto.CategoryResponse;
import com.ciart.blogzio.category.categoryDto.CategoryUpdateRequest;
import com.ciart.blogzio.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public CategoryResponse create(@Valid @RequestBody CategoryCreateRequset request) {
        var category = categoryService.createCategory(request);
        return ResponseEntity.ok(category).getBody();
    }

    @PutMapping("/{categoryId}")
    public CategoryResponse update(@PathVariable UUID categoryId, @Valid @RequestBody CategoryUpdateRequest request) {
        try {
            var category = categoryService.updateCategory(categoryId, request.getName(), request.getSlug());
            return ResponseEntity.ok(category).getBody();
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> delete(@PathVariable UUID categoryId) {
        try {
            var category = categoryService.deleteCategory(categoryId);
            return ResponseEntity.ok(category).getBody();
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAll() {
        var categories = categoryService.getAllCategories()
                .stream()
                .map(CategoryResponse::from)
                .toList();

        return ResponseEntity.ok(categories);
    }
}
