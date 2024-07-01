package com.ll.gooHaeYu.domain.payment.payment.entity;

import com.ll.gooHaeYu.domain.member.member.entity.Member;
import com.ll.gooHaeYu.domain.payment.payment.dto.request.PaymentResDto;
import com.ll.gooHaeYu.domain.payment.payment.entity.type.PayStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@AllArgsConstructor(access = PROTECTED)
@NoArgsConstructor(access = PROTECTED)
@Builder
@Getter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String paymentKey;

    private Long totalAmount;

    private String payStatus;

    private String orderId;

    private String orderName;

    private boolean paid;

    private boolean canceled;

    private String cancelReason;

    private String failReason;

    private Long applicationId;

    public void updatePayer(Member member) {
        this.member = member;
    }

    public void updatePayStatus(PayStatus payStatus) {
        this.payStatus = payStatus.getDescription();
    }

    public void updatePaymentKey(String paymentKey) {
        this.paymentKey = paymentKey;
    }

    public void markAsPaid() {
        this.paid = true;
    }

    public void markAsUnpaid() {
        this.paid = false;
    }

    public void recordFailReason(String failReason) {
        this.failReason = failReason;
    }

    public void cancelPayment(String cancelReason) {
        this.canceled = true;
        this.cancelReason = cancelReason;
    }

    public PaymentResDto toPaymentRespDto() {
        PayStatus payStatusEnum = PayStatus.findPayTypeByDescription(payStatus);

        return PaymentResDto.builder()
                .payStatus(payStatusEnum)
                .amount(totalAmount)
                .orderId(orderId)
                .orderName(orderName)
                .payer(member.getUsername())
                .canceled(canceled)
                .failReason(failReason)
                .build();
    }
}
