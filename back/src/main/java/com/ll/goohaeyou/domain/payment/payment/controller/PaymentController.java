package com.ll.goohaeyou.domain.payment.payment.controller;

import com.ll.goohaeyou.domain.payment.payment.dto.PaymentDto;
import com.ll.goohaeyou.domain.payment.payment.dto.cancel.PaymentCancelResDto;
import com.ll.goohaeyou.domain.payment.payment.dto.fail.PaymentFailDto;
import com.ll.goohaeyou.domain.payment.payment.dto.request.PaymentReqDto;
import com.ll.goohaeyou.domain.payment.payment.dto.request.PaymentResDto;
import com.ll.goohaeyou.domain.payment.payment.dto.success.PaymentSuccessDto;
import com.ll.goohaeyou.domain.payment.payment.service.PaymentCancelService;
import com.ll.goohaeyou.domain.payment.payment.service.PaymentInfoService;
import com.ll.goohaeyou.domain.payment.payment.service.PaymentService;
import com.ll.goohaeyou.global.apiResponse.ApiResponse;
import com.ll.goohaeyou.global.security.MemberDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payment", description = "결제 관련 API")
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentCancelService paymentCancelService;
    private final PaymentInfoService paymentInfoService;

    @PostMapping()
    @Operation(summary = "결제 요청")
    public ApiResponse<PaymentResDto> requestTossPayments(@AuthenticationPrincipal MemberDetails memberDetails,
                                                          @Valid @RequestBody PaymentReqDto paymentReqDto) {

        PaymentResDto paymentResDto = paymentService.requestTossPayment(paymentReqDto, memberDetails.getUsername());

        return ApiResponse.ok(paymentResDto);
    }

    @GetMapping("/success")
    @Operation(summary = "결제 성공")
    public ApiResponse<PaymentSuccessDto> tossPaymentSuccess(@RequestParam String paymentKey,
                                                             @RequestParam String orderId,
                                                             @RequestParam Long amount) {

        return ApiResponse.ok(paymentService.tossPaymentSuccess(paymentKey, orderId, amount));
    }

    @GetMapping("/fail")
    @Operation(summary = "결제 실패")
    public ApiResponse<PaymentFailDto> tossPaymentFail(@RequestParam String code,
                                                       @RequestParam String message,
                                                       @RequestParam String orderId) {

        return ApiResponse.ok(paymentService.tossPaymentFail(code, message, orderId));
    }

    @PostMapping("/cancel")
    @Operation(summary = "결제 취소")
    public ApiResponse<PaymentCancelResDto> tossPaymentCancel(@AuthenticationPrincipal MemberDetails memberDetails,
                                                              @RequestParam String paymentKey,
                                                              @RequestParam String cancelReason) {

        PaymentCancelResDto resDto = paymentCancelService.tossPaymentCancel(memberDetails.getUsername(), paymentKey, cancelReason);

        return ApiResponse.ok(resDto);
    }

    @GetMapping("/{applicationId}")
    @Operation(summary = "결제정보 가져오기")
    public ApiResponse<PaymentDto> getPaymentKey(@AuthenticationPrincipal MemberDetails memberDetails,
                                                 @PathVariable Long applicationId) {

        return ApiResponse.ok(paymentInfoService.getValidPayment(memberDetails.getUsername(), applicationId));
    }
}
