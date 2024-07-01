package com.ll.gooHaeYu.domain.notification.eventListener;

import com.ll.gooHaeYu.domain.notification.entity.type.CauseTypeCode;
import com.ll.gooHaeYu.domain.notification.service.NotificationService;
import com.ll.gooHaeYu.global.event.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import static com.ll.gooHaeYu.domain.notification.entity.type.CauseTypeCode.APPLICATION_APPROVED;
import static com.ll.gooHaeYu.domain.notification.entity.type.ResultTypeCode.*;

@Component
@RequiredArgsConstructor
@Transactional
@Slf4j
public class NotificationEventListener {
    private final NotificationService notificationService;

    @EventListener
    public void postCorrectionEventListen(ChangeOfPostEvent event) {
        if (event.getResultTypeCode() == NOTICE) {
            notificationService.notifyApplicantsAboutPost(event);
        }else {
            notificationService.deleteApplicationNotification(event);
        }
    }

    @EventListener
    public void postDeletedEventListen(PostDeletedEvent event) {
        // 공고 삭제 시 지원자들에게 알림
        log.debug("공고 삭제 알림");
        notificationService.postDeletedNotification(event);
    }

    @EventListener
    public void commentCreatedEventListen(CommentCreatedEvent event) {
        // 댓글 작성 시 공고 작성자에게 알림
        log.debug("댓글 작성 알림");
        notificationService.commentCreatedNotification(event);
    }

    @EventListener
    public void postGetInterestedEventListen(PostGetInterestedEvent event) {
        // 공고 관심 등록 시 작성자에게 알림
        log.debug("관심 등록 알림");
        notificationService.postGetInterestedNotification(event);
    }

    @EventListener
    public void ApplicationCreatedAndChangedEventListen(ApplicationCreateAndChangedEvent event) {
        // 지원서 작성 시
        log.debug("지원서 작성 및 수정 알림");
        notificationService.applicationCreatedAndChangedNotification(event);
    }

    @EventListener
    public void jobPostClosedEventListen(PostDeadlineEvent event) {
        // 공고 마감 시
        log.debug("공고 마감 시 작성자에게 알림");
        notificationService.jobPostClosedNotificationEventListen(event);
    }

//    프록시 문제로 알림기능 고도화 시 매칭에 관한 채팅방 생성 알림 발송
//    @EventListener
//    public void createdChatRoomEventListen(CreateChatRoomEvent event) {
//
//        notificationService.notifyAboutChatRoom(event);
//    }
}
