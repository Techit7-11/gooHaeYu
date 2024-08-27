package com.ll.goohaeyou.category.domain;

import com.ll.goohaeyou.jobPost.jobPost.domain.JobPost;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "job_post_category", indexes = {
        @Index(name = "idx_category_id_job_post_id", columnList = "category_id, job_post_id")
})
@AllArgsConstructor(access = PROTECTED)
@NoArgsConstructor(access = PROTECTED)
@Builder
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

    public void updateCategory(Category category) {
        this.category = category;
    }
}
