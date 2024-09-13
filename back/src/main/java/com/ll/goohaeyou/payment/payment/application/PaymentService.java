package com.ll.goohaeyou.payment.payment.application;

import com.ll.goohaeyou.global.config.TossPaymentsConfig;
import com.ll.goohaeyou.global.exception.EntityNotFoundException;
import com.ll.goohaeyou.global.standard.retryOnOptimisticLock.RetryOnOptimisticLock;
import com.ll.goohaeyou.jobApplication.domain.entity.JobApplication;
import com.ll.goohaeyou.jobApplication.domain.repository.JobApplicationRepository;
import com.ll.goohaeyou.jobApplication.domain.type.WageStatus;
import com.ll.goohaeyou.member.member.domain.entity.Member;
import com.ll.goohaeyou.member.member.domain.repository.MemberRepository;
import com.ll.goohaeyou.member.member.exception.MemberException;
import com.ll.goohaeyou.payment.payment.application.dto.PaymentRequest;
import com.ll.goohaeyou.payment.payment.application.dto.PaymentResponse;
import com.ll.goohaeyou.payment.payment.application.dto.fail.PaymentFailResponse;
import com.ll.goohaeyou.payment.payment.application.dto.success.PaymentSuccessResponse;
import com.ll.goohaeyou.payment.payment.domain.PaymentProcessor;
import com.ll.goohaeyou.payment.payment.domain.entity.Payment;
import com.ll.goohaeyou.payment.payment.domain.policy.PaymentPolicy;
import com.ll.goohaeyou.payment.payment.domain.repository.PaymentRepository;
import com.ll.goohaeyou.payment.payment.domain.type.PayStatus;
import com.ll.goohaeyou.payment.payment.infrastructure.PaymentProcessorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final TossPaymentsConfig tossPaymentsConfig;
    private final MemberRepository memberRepository;
    private final PaymentProcessor paymentProcessor;
    private final JobApplicationRepository jobApplicationRepository;
    private final PaymentPolicy paymentPolicy;

    @Transactional
    @RetryOnOptimisticLock(attempts = 2, backoff = 500L)
    public PaymentResponse requestTossPayment(PaymentRequest request, String username) {
        Payment payment = createPaymentEntity(request, username);

        Payment savedPayment = paymentRepository.save(payment);

        return PaymentResponse.from(savedPayment, tossPaymentsConfig.getSuccessUrl(), tossPaymentsConfig.getFailUrl());
    }

    private Payment createPaymentEntity(PaymentRequest request, String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(EntityNotFoundException.MemberNotFoundException::new);

        Payment payment = Payment.create(request);
        payment.updatePayer(member);

        return payment;
    }

    @Transactional
    public PaymentSuccessResponse tossPaymentSuccess(String paymentKey, String orderId, Long amount) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(MemberException.MemberNotFoundException::new);

        paymentPolicy.verifyPaymentAmount(payment, amount);

        PaymentSuccessResponse successDto = requestPaymentAccept(paymentKey, orderId, amount);

        updatePayment(payment, successDto);

        JobApplication jobApplication = jobApplicationRepository.findById(payment.getJobApplicationId())
                        .orElseThrow(EntityNotFoundException.JobApplicationNotExistsException::new);

        jobApplication.updateWageStatus(WageStatus.PAYMENT_COMPLETED);
        jobApplication.updateEarn(Math.toIntExact(amount));

        return successDto;
    }

    @Transactional
    public PaymentSuccessResponse requestPaymentAccept(String paymentKey, String orderId, Long amount) {
        JSONObject params = createPaymentRequestParams(orderId, amount);

        PaymentProcessorResponse paymentProcessorResponse = paymentProcessor.sendPaymentRequest(
                paymentKey, params, PaymentProcessorResponse.class);

        Long jobApplicationId = findPaymentByOrderId(orderId).getJobApplicationId();

        return PaymentSuccessResponse.from(
                paymentProcessorResponse.getPaymentKey(),
                paymentProcessorResponse.getOrderId(),
                jobApplicationId,
                paymentProcessorResponse.getOrderName(),
                paymentProcessorResponse.getMethod(),
                paymentProcessorResponse.getTotalAmount(),
                paymentProcessorResponse.getApprovedAt(),
                paymentProcessorResponse.getCard(),
                paymentProcessorResponse.getEasyPay()
        );
    }

    private JSONObject createPaymentRequestParams(String orderId, Long amount) {
        JSONObject params = new JSONObject();
        params.put("orderId", orderId);
        params.put("amount", amount);

        return params;
    }

    private void updatePayment(Payment payment, PaymentSuccessResponse successDto) {
        payment.updatePaymentKey(successDto.paymentKey());
        payment.markAsPaid();
        updatePayStatusByPayment(payment, successDto.method());
    }

    private void updatePayStatusByPayment(Payment payment, String method) {
        PayStatus payStatus = PayStatus.findByMethod(method);
        payment.updatePayStatus(payStatus);
    }

    @Transactional
    public PaymentFailResponse tossPaymentFail(String code, String message, String orderId) {
        handlePaymentFailure(orderId, message);

        Payment payment = findPaymentByOrderId(orderId);
        paymentRepository.delete(payment);

        return new PaymentFailResponse(code, message, orderId);
    }

    private void handlePaymentFailure(String orderId, String message) {
        Payment payment = findPaymentByOrderId(orderId);
        payment.markAsUnpaid();
    }

    private Payment findPaymentByOrderId(String orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(EntityNotFoundException.PaymentNotFoundException::new);
    }
}
