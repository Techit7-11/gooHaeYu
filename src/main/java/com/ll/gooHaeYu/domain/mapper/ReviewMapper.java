package com.ll.gooHaeYu.domain.mapper;

import com.ll.gooHaeYu.domain.member.review.dto.ApplicantReviewDto;
import com.ll.gooHaeYu.domain.member.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    ReviewMapper INSTANCE = Mappers.getMapper(ReviewMapper.class);

    @Mapping(target="jobPostingId", source="jobPostingId.id")
    @Mapping(target="applicantId", source="applicantId.id")
    ApplicantReviewDto toDto(Review review);

    @Mapping(target="jobPostingId", ignore = true)
    @Mapping(target="applicantId", ignore = true)
    Review toEntity(ApplicantReviewDto applicantReviewDto);
}
