package com.ll.gooHaeYu.domain.member.member.controller;

import com.ll.gooHaeYu.domain.application.application.dto.ApplicationDto;
import com.ll.gooHaeYu.domain.application.application.service.ApplicationService;
import com.ll.gooHaeYu.domain.jobPost.comment.dto.CommentDto;
import com.ll.gooHaeYu.domain.jobPost.comment.service.CommentService;
import com.ll.gooHaeYu.domain.jobPost.jobPost.dto.JobPostDto;
import com.ll.gooHaeYu.domain.jobPost.jobPost.service.JobPostService;
import com.ll.gooHaeYu.domain.member.member.dto.MemberDto;
import com.ll.gooHaeYu.domain.member.member.dto.MemberForm;
import com.ll.gooHaeYu.domain.member.member.service.MemberService;
import com.ll.gooHaeYu.global.apiResponse.ApiResponse;
import com.ll.gooHaeYu.global.security.MemberDetails;
import com.ll.gooHaeYu.standard.base.Empty;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Mypage", description = "회원 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MypageController {
    private final MemberService memberService;
    private final JobPostService jobPostService;
    private final ApplicationService applicationService;
    private final CommentService commentService;

    @GetMapping
    @Operation(summary = "내 정보 조회")
    public ApiResponse<MemberDto> detailMember(@AuthenticationPrincipal MemberDetails memberDetails) {
        return ApiResponse.ok(memberService.findByUsername(memberDetails.getUsername()));
    }

    @PutMapping
    @Operation(summary = "내 정보 수정")
    public ApiResponse<Empty> modifyMember(@AuthenticationPrincipal MemberDetails memberDetails,
                                           @Valid @RequestBody MemberForm.Modify form) {
        memberService.modifyMember(memberDetails.getUsername(), form);

        return ApiResponse.noContent();
    }

    @GetMapping("/myposts")
    @Operation(summary = "내 공고 조회")
    public ApiResponse<List<JobPostDto>> detailMyPosts(@AuthenticationPrincipal MemberDetails memberDetails) {
        return ApiResponse.ok(jobPostService.findByUsername(memberDetails.getUsername()));
    }


    @GetMapping("/myapplications")
    @Operation(summary = "내 지원서 조회")
    public ApiResponse<List<ApplicationDto>> detailMyApplications(@AuthenticationPrincipal MemberDetails memberDetails) {
        return ApiResponse.ok(applicationService.findByUsername(memberDetails.getUsername()));
    }

    @GetMapping("/mycomments")
    @Operation(summary = "내 댓글 조회")
    public ApiResponse<List<CommentDto>> detailMyComments(@AuthenticationPrincipal MemberDetails memberDetails) {
        return ApiResponse.ok(commentService.findByUsername(memberDetails.getUsername()));
    }

    @GetMapping("/myinterest")
    @Operation(summary = "내 관심 공고 조회")
    public ApiResponse<List<JobPostDto>> detailMyInterestingPosts(@AuthenticationPrincipal MemberDetails memberDetails) {
        return ApiResponse.ok(jobPostService.findByInterestAndUsername(memberDetails.getId()));
    }
}
