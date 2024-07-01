package com.ll.gooHaeYu.domain.application.application.entity;

import com.ll.gooHaeYu.domain.application.application.entity.type.WageStatus;
import com.ll.gooHaeYu.domain.jobPost.jobPost.entity.JobPostDetail;
import com.ll.gooHaeYu.domain.member.member.entity.Member;
import com.ll.gooHaeYu.global.jpa.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Table(name = "application")
public class Application extends BaseTimeEntity {

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
    private WageStatus wageStatus = WageStatus.UNDEFINED;

    private int earn = 0;

    private boolean receive = false;

    private Boolean jobCompleted = null;

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

    public void setEarn(int earn) {
        this.earn = earn;
    }

    public void setReceive(boolean receive) {
        this.receive = receive;
    }
}
