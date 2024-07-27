package com.ll.goohaeyou.domain.category.service;

import com.ll.goohaeyou.domain.category.entity.JobPostCategory;
import com.ll.goohaeyou.domain.category.entity.repository.JobPostCategoryRepository;
import com.ll.goohaeyou.domain.category.entity.type.CategoryType;
import com.ll.goohaeyou.domain.jobPost.jobPost.entity.JobPost;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class JobPostCategoryService {
    private final JobPostCategoryRepository jobPostCategoryRepository;

    public JobPostCategory findByJobPostAndCategoryType(JobPost jobPost, CategoryType categoryType) {
        return jobPostCategoryRepository.findByJobPostAndCategory_Type(jobPost, categoryType);
    }
}
