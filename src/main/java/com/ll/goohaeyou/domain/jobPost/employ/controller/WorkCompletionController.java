package com.ll.goohaeyou.domain.jobPost.employ.controller;

import com.ll.goohaeyou.domain.jobPost.employ.service.WorkCompletionService;
import com.ll.goohaeyou.global.apiResponse.ApiResponse;
import com.ll.goohaeyou.global.security.MemberDetails;
import com.ll.goohaeyou.global.standard.base.Empty;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "WorkCompletion", description = "알바완료 처리 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class WorkCompletionController {
    private final WorkCompletionService workCompletionService;

    @PatchMapping ("/complete/{applicationId}/manually")
    @Operation(summary = "구인자가 수동으로 알바완료 처리")
    public ApiResponse<Empty> completeJobManually(@AuthenticationPrincipal MemberDetails memberDetails,
                                                  @PathVariable (name = "applicationId") Long applicationId) {

        workCompletionService.completeJobManually(memberDetails.getUsername(), applicationId);

        return ApiResponse.noContent();
    }

    @PatchMapping("/individual/no-work/{applicationId}")
    @Operation(summary = "개인 지급 알바 미완료 처리")
    public ApiResponse<Empty> cancelIndividualNoWork(@AuthenticationPrincipal MemberDetails memberDetails,
                                                     @PathVariable (name = "applicationId") Long applicationId) {

        workCompletionService.cancelByIndividualPayment(memberDetails.getUsername(), applicationId);

        return ApiResponse.noContent();
    }
}
