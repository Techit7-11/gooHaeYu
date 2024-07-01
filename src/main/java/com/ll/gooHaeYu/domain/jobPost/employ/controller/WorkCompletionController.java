package com.ll.gooHaeYu.domain.jobPost.employ.controller;

import com.ll.gooHaeYu.domain.jobPost.employ.service.WorkCompletionService;
import com.ll.gooHaeYu.global.rsData.RsData;
import com.ll.gooHaeYu.global.security.MemberDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "WorkCompletion", description = "알바완료 처리 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs/complete")
public class WorkCompletionController {
    private final WorkCompletionService workCompletionService;

    @PatchMapping ("/{applicationId}/manually")
    @Operation(summary = "구인자가 수동으로 알바완료 처리")
    public RsData<Void> completeJobManually(@AuthenticationPrincipal MemberDetails memberDetails,
                                         @PathVariable (name = "applicationId") Long applicationId) {

        workCompletionService.completeJobManually(memberDetails.getUsername(), applicationId);

        return RsData.of("204", "NO_CONTENT");
    }
}
