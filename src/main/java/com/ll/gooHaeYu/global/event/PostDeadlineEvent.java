package com.ll.gooHaeYu.global.event;

import com.ll.gooHaeYu.domain.jobPost.jobPost.entity.JobPost;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class PostDeadlineEvent extends ApplicationEvent {
    private final JobPost jobPost;

    public PostDeadlineEvent(Object object, JobPost jobPost) {
        super(object);
        this.jobPost = jobPost;
    }
}
