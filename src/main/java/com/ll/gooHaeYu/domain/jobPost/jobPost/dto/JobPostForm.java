package com.ll.gooHaeYu.domain.jobPost.jobPost.dto;

import com.ll.gooHaeYu.domain.jobPost.jobPost.entity.type.PayBasis;
import com.ll.gooHaeYu.domain.jobPost.jobPost.entity.type.WagePaymentMethod;
import com.ll.gooHaeYu.domain.member.member.entity.type.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class JobPostForm {

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Register {
        @NotBlank(message = "제목은 필수 입력 항목입니다.")
        private String title;

        @NotBlank(message = "내용은 필수 입력 항목입니다.")
        private String body;

        @NotBlank(message = "지역 설정은 필수입니다.")
        private String location;

        private int minAge;

        private Gender gender = Gender.UNDEFINED;

        @NotNull(message = "마감 기한은 필수입니다.")
        @FutureOrPresent
        private LocalDate deadLine;

        @NotBlank(message = "도움시간 또는 도움일수 입력은 필수입니다.")
        private String workTime;

        private PayBasis payBasis;

        @NotNull(message = "급여 입력은 필수 입니다.")
        @Min(value = 0, message = "급여는 0원 이상 이여야 합니다.")
        private int cost;

        private WagePaymentMethod wagePaymentMethod;
    }

    @Builder
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Modify {
        @NotBlank(message = "제목은 필수 입력 항목입니다.")
        private String title;

        @NotBlank(message = "내용은 필수 입력 항목입니다.")
        private String body;

        @NotBlank(message = "지역 설정은 필수입니다.")
        private String location;

        private int minAge;

        private Gender gender;

        @NotNull(message = "마감 기한은 필수입니다.")
        @FutureOrPresent
        private LocalDate deadLine;

        @NotBlank(message = "도움시간 또는 도움일수 입력은 필수입니다.")
        private String workTime;

        private PayBasis payBasis;

        @NotNull(message = "급여 입력은 필수 입니다.")
        @Min(value = 0, message = "급여는 0원 이상 이여야 합니다.")
        private int cost;

    }
}