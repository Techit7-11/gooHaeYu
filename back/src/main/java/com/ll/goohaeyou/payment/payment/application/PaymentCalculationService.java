package com.ll.goohaeyou.payment.payment.application;

import com.ll.goohaeyou.payment.payment.domain.type.PayStatus;
import com.ll.goohaeyou.payment.payment.domain.type.PayTypeFee;
import com.ll.goohaeyou.payment.payment.exception.PaymentException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PaymentCalculationService {

    // 토스페이먼츠 결제 부과세 10% 반환
    public long getVat(long totalAmount) {
        return (int) (totalAmount * 0.1);
    }

    // 결제 수수료 반환
    public long getPaymentFee(PayStatus payStatus, long totalAmount) {
        PayTypeFee payTypeFee = matchPayTypeFee(payStatus);

        double feePercentage = payTypeFee.getFeePercentage();
        int transactionFee = payTypeFee.getTransactionFee();

        return (int) ((totalAmount * feePercentage / 100.0) + transactionFee);
    }

    private PayTypeFee matchPayTypeFee(PayStatus payStatus) {
        return Arrays.stream(PayTypeFee.values())
                .filter(payTypeFee -> payTypeFee.getTypeName().equals(payStatus.getDescription()))
                .findFirst()
                .orElseThrow(PaymentException.NoEnumConstantFoundException::new);
    }

    // 부가세와 결제 수수료의 합 반환
    public long getTotalTaxAndFees(PayStatus payStatus, long totalAmount) {
        return getVat(totalAmount) + getPaymentFee(payStatus, totalAmount);
    }

    // 순금액 반환
    public long getNetAmount (PayStatus payStatus, long totalAmount) {
        return totalAmount - getTotalTaxAndFees(payStatus, totalAmount);
    }
}
