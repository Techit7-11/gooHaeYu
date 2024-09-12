package com.ll.goohaeyou.jobPost.employ.domain;

import com.ll.goohaeyou.global.standard.anotations.DomainService;
import com.ll.goohaeyou.jobApplication.domain.type.WageStatus;
import com.ll.goohaeyou.jobPost.employ.exception.EmployException;
import com.ll.goohaeyou.jobPost.jobPost.domain.type.WagePaymentMethod;

@DomainService
public class EmployDomainService {

    public WageStatus determineWageStatus(WagePaymentMethod wagePaymentMethod) {
        return switch (wagePaymentMethod) {
            case SERVICE_PAYMENT -> WageStatus.PAYMENT_PENDING;
            case INDIVIDUAL_PAYMENT -> WageStatus.APPLICATION_APPROVED;
            default -> throw new EmployException.InvalidWagePaymentMethodException();
        };
    }
}
