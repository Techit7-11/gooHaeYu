package com.ll.goohaeyou.category.domain.entity;

import com.ll.goohaeyou.category.domain.type.CategoryType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "category")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
    private int level;
    private boolean enabled;

    @Enumerated(EnumType.STRING)
    private CategoryType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Category> subCategories = new ArrayList<>();

    private Category(
            String name,
            int level,
            boolean enabled,
            CategoryType type,
            Category parent
    ) {
        this.name = name;
        this.level = level;
        this.enabled = true;
        this.type = type;
        this.parent = parent;
    }

    public static Category create(
            String name,
            int level,
            boolean enabled,
            CategoryType type,
            Category parent
    ) {
        return new Category(
                name,
                level,
                enabled,
                type,
                parent
        );
    }

    public boolean isLeaf() {
        return this.getSubCategories().isEmpty();
    }
}
