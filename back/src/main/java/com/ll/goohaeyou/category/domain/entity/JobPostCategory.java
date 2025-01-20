package com.ll.goohaeyou.category.domain.entity;

import com.ll.goohaeyou.jobPost.jobPost.domain.entity.JobPost;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "job_post_category")
@NoArgsConstructor(access = PROTECTED)
@Getter
public class JobPostCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "job_post_id", nullable = false)
    private JobPost jobPost;

    private JobPostCategory(
            Category category,
            JobPost jobPost
    ) {
        this.category = category;
        this.jobPost = jobPost;
    }

    public static JobPostCategory create(
            Category category,
            JobPost jobPost
    ) {
        return new JobPostCategory(
                category,
                jobPost
        );
    }

    public void updateCategory(Category category) {
        this.category = category;
    }

}
