package com.ll.gooHaeYu.domain.notification.controller;

import com.ll.gooHaeYu.domain.notification.dto.NotificationDto;
import com.ll.gooHaeYu.domain.notification.service.NotificationService;
import com.ll.gooHaeYu.global.rsData.RsData;
import com.ll.gooHaeYu.global.security.MemberDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Notification", description = "알림 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    @Operation(summary = "유저 별 알림리스트")
    public RsData<List<NotificationDto>> getList(Authentication authentication) {
        return RsData.of(notificationService.getList(authentication.getName()));
    }

    @DeleteMapping("/all")
    @Operation(summary = "알림 전부 삭제")
    public ResponseEntity<Void> deleteAll(Authentication authentication) {
        notificationService.deleteAllNotification(authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/read")
    @Operation(summary = "읽은 알림 전부 삭제")
    public ResponseEntity<Void> deleteReadAll(Authentication authentication) {
        notificationService.deleteReadAllNotification(authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "알림 읽음 처리")
    public ResponseEntity<Void> read(Authentication authentication,
                                     @PathVariable(name = "id") Long id) {
        notificationService.readNotification(authentication.getName(),id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/new")
    @Operation(summary = "읽지 않은 알림 유무 확인")
    public RsData<Boolean> unreadNotification(Authentication memberDetails) {
        return RsData.of(notificationService.unreadNotification(memberDetails.getName()));
    }

}
