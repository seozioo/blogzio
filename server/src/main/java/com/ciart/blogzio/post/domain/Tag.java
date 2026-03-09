package com.ciart.blogzio.post.domain;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tags")
@Getter
public class Tag {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true)
    private String title;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts =  new ArrayList<>();
}

// 만약 내가 삭제할 post의 tag가 더이상 db에 저장될 필요가 없대 이걸 어떻게 알아내?
// post 삭제시 태그 확인 // 해당 태그 사용하는 게 1개(현재ㅑ) post만 사용시 함께 삭제
// post 삭제시에 체크 후 삭제할 tag 함께 삭제
// 결론: 태그 검색 기능 및 태그 사용 개수가 보여질 수도 있기 때문에 필요할듯