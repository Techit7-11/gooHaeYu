package com.ll.goohaeyou.jobApplication.domain;

import com.ll.goohaeyou.jobApplication.domain.type.WageStatus;
import com.ll.goohaeyou.jobPost.jobPost.domain.JobPostDetail;
import com.ll.goohaeyou.member.member.domain.Member;
import com.ll.goohaeyou.global.jpa.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "application")
public class JobApplication extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_post_detail_id", nullable = false)
    private JobPostDetail jobPostDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column
    private Boolean approve = null;

    private String body;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WageStatus wageStatus;

    private int earn;

    private boolean receive;

    private Boolean jobCompleted;

    private LocalDate jobEndDate;

    private JobApplication(
            Member member,
            JobPostDetail jobPostDetail,
            String body,
            WageStatus wageStatus
    ) {
        this.member = member;
        this.jobPostDetail = jobPostDetail;
        this.body = body;
        this.wageStatus = wageStatus;
    }

    public static JobApplication create(
            Member member,
            JobPostDetail jobPostDetail,
            String body
    ) {
        return new JobApplication(
                member,
                jobPostDetail,
                body,
                WageStatus.UNDEFINED
        );
    }

    public void updateBody(String body) {
        if (body != null && !body.isBlank()) {
            this.body = body;
        }
    }

    public void approve(){
        this.approve = true;
    }

    public void reject() {
        this.approve = false;
    }

    public void updateWageStatus(WageStatus newStatus) {
        if (newStatus != null) {
            this.wageStatus = newStatus;
        }
    }


    public void changeToCompleted() {
        this.jobCompleted = true;
    }

    public void changeToNotCompleted() {
        this.jobCompleted = false;
    }

    public void setEarn(int earn) {
        this.earn = earn;
    }

    public void setReceive(boolean receive) {
        this.receive = receive;
    }

    public void setJobEndDate(LocalDate jobEndDate) {
        this.jobEndDate = jobEndDate;
    }
}
