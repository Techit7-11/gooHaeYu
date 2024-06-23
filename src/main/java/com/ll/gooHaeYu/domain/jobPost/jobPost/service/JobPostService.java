package com.ll.gooHaeYu.domain.jobPost.jobPost.service;

import com.ll.gooHaeYu.domain.application.application.entity.Application;
import com.ll.gooHaeYu.domain.category.entity.Category;
import com.ll.gooHaeYu.domain.category.repository.CategoryRepository;
import com.ll.gooHaeYu.domain.fileupload.service.S3ImageService;
import com.ll.gooHaeYu.domain.jobPost.jobPost.dto.JobPostDetailDto;
import com.ll.gooHaeYu.domain.jobPost.jobPost.dto.JobPostDto;
import com.ll.gooHaeYu.domain.jobPost.jobPost.dto.JobPostForm;
import com.ll.gooHaeYu.domain.jobPost.jobPost.entity.*;
import com.ll.gooHaeYu.domain.jobPost.jobPost.repository.*;
import com.ll.gooHaeYu.domain.member.member.entity.Member;
import com.ll.gooHaeYu.domain.member.member.entity.type.Role;
import com.ll.gooHaeYu.domain.member.member.repository.MemberRepository;
import com.ll.gooHaeYu.domain.member.member.service.MemberService;
import com.ll.gooHaeYu.global.event.notification.*;
import com.ll.gooHaeYu.global.exception.CustomException;
import com.ll.gooHaeYu.standard.base.RegionType;
import com.ll.gooHaeYu.standard.base.util.Ut;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.ll.gooHaeYu.domain.notification.entity.type.CauseTypeCode.POST_MODIFICATION;
import static com.ll.gooHaeYu.domain.notification.entity.type.ResultTypeCode.DELETE;
import static com.ll.gooHaeYu.domain.notification.entity.type.ResultTypeCode.NOTICE;
import static com.ll.gooHaeYu.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class JobPostService {
    private final JobPostRepository jobPostRepository;
    private final JobPostDetailRepository jobPostdetailRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final EssentialRepository essentialRepository;
    private final ApplicationEventPublisher publisher;
    private final WageRepository wageRepository;
    private final S3ImageService s3ImageService;
    private final CategoryRepository categoryRepository;

    @Transactional
    public JobPostForm.Register writePost(String username, JobPostForm.Register form) {
        JobPost newPost = JobPost.builder()
                .member(memberService.getMember(username))
                .title(form.getTitle())
                .location(form.getLocation())
                .deadline(form.getDeadLine())
                .jobStartDate(form.getJobStartDate())
                .regionCode(Ut.Region.getRegionCodeFromAddress(form.getLocation()))
                .category(categoryRepository.findById(form.getCategoryId())
                        .orElseThrow(() -> new CustomException(NOT_FOUND_CATEGORY)))
                .build();

        JobPostDetail postDetail = JobPostDetail.builder()
                .jobPost(newPost)
                .author(username)
                .body(form.getBody())
                .build();

        Essential essential = Essential.builder()
                .minAge(form.getMinAge())
                .gender(form.getGender())
                .jobPostDetail(postDetail)
                .build();

        Wage wage = Wage.builder()
                .cost(form.getCost())
                .workTime(form.getWorkTime())
                .workDays(form.getWorkDays())
                .payBasis(form.getPayBasis())
                .wagePaymentMethod(form.getWagePaymentMethod())
                .jobPostDetail(postDetail)
                .build();

        jobPostRepository.save(newPost);
        jobPostdetailRepository.save(postDetail);
        essentialRepository.save(essential);
        wageRepository.save(wage);

        return form;
    }

    public JobPostDetailDto findById(Long id) {
        JobPostDetail postDetail = findByJobPostAndNameAndValidate(id);
        return JobPostDetailDto.fromEntity(postDetail.getJobPost(), postDetail, postDetail.getEssential(), postDetail.getWage());
    }

    public List<JobPostDto> findAll() {
        return JobPostDto.toDtoList(jobPostRepository.findAll());
    }

    @Transactional
    public JobPostForm.Modify modifyPost(String username, Long id, JobPostForm.Modify form) {
        JobPostDetail postDetail = findByJobPostAndNameAndValidate(id);
        JobPost jobPost = postDetail.getJobPost();
        if (!canEditPost(username, postDetail.getJobPost().getMember().getUsername()))
            throw new CustomException(NOT_ABLE);

        postDetail.getJobPost().update(form.getTitle(),form.getDeadLine(), form.getJobStartDate(), Ut.Region.getRegionCodeFromAddress(form.getLocation()));
        postDetail.updatePostDetail(form.getBody());
        postDetail.getEssential().update(form.getMinAge(), form.getGender());
        postDetail.getWage().updateWageInfo(form.getCost(), form.getPayBasis(), form.getWorkTime(), form.getWorkDays());



        // TODO : 삭제 후 알림 날리기
        List<Application> applicationsToRemove = new ArrayList<>();
        Iterator<Application> iterator = postDetail.getApplications().iterator();
       while (iterator.hasNext()) {
           Application application = iterator.next();
           if (form.getMinAge() > LocalDateTime.now().plusYears(1).getYear() - application.getMember().getBirth().getYear()){
               applicationsToRemove.add(application);
               publisher.publishEvent(new ChangeOfPostEvent(this,jobPost,application, POST_MODIFICATION,DELETE));
           }else {
               publisher.publishEvent(new ChangeOfPostEvent(this,jobPost,application,POST_MODIFICATION,NOTICE));
           }
       }
       postDetail.getApplications().removeAll(applicationsToRemove);
        return form;
    }

    @Transactional
    public void deleteJobPost(String username, Long postId) {
        JobPost post = findByIdAndValidate(postId);
        List<JobPostImage> jobPostImages = post.getJobPostDetail().getJobPostImages();
        Member member = findUserByUserNameValidate(username);

        publisher.publishEvent(new PostDeletedEvent(this,post,member,DELETE));

        if (member.getRole() == Role.ADMIN || post.getMember().equals(member)) {
            if (!jobPostImages.isEmpty()) {
                s3ImageService.deletePostImagesFromS3(jobPostImages);
            }
            jobPostRepository.deleteById(postId);
        } else {
            throw new CustomException(NOT_ABLE);
        }
    }

    private Member findUserByUserNameValidate(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }


    public boolean canEditPost(String username, String author) {
        return username.equals(author);
    }

    public JobPost findByIdAndValidate(Long id) {
        return jobPostRepository.findById(id)
                .orElseThrow(() -> new CustomException(POST_NOT_EXIST));
    }

    public JobPostDetail findByJobPostAndNameAndValidate(Long postId) {
        JobPost post = findByIdAndValidate(postId);
        return jobPostdetailRepository.findByJobPostAndAuthor(post,post.getMember().getUsername())
                .orElseThrow(() -> new CustomException(POST_NOT_EXIST));
    }

    @Transactional
    public void interest(String username, Long postId){
        JobPostDetail postDetail = findByJobPostAndNameAndValidate(postId);
        Member member = memberService.getMember(username);

        if (hasInterest(postDetail,member)) throw new CustomException(NOT_ABLE);

        postDetail.getInterests().add(Interest.builder()
                .jobPostDetail(postDetail)
                .member(member)
                .build());

        postDetail.getJobPost().increaseInterestCount();
        if (!postDetail.getAuthor().equals(username)) {
            publisher.publishEvent(new PostGetInterestedEvent(this, postDetail, member));
        }
    }

    @Transactional
    public void disinterest(String username, Long postId){
        JobPostDetail postDetail = findByJobPostAndNameAndValidate(postId);
        Member member = memberService.getMember(username);

        if (!hasInterest(postDetail,member)) throw new CustomException(NOT_ABLE);

        postDetail.getInterests().removeIf(interest -> interest.getMember().equals(member));
        postDetail.getJobPost().decreaseInterestCount();
    }

    public boolean hasInterest(JobPostDetail post, Member member) {
        return post.getInterests().stream().anyMatch(interest -> interest.getMember().equals(member));
    }

    public boolean isInterested(String username, Long id) {
        List<String> interestedUsernames = findById(id).getInterestedUsernames();

        return interestedUsernames.stream().anyMatch(username::equals);
    }

    public List<JobPostDto> findByUsername(String username) {

        Member member = memberService.getMember(username);

        return JobPostDto.toDtoList(jobPostRepository.findByMemberId(member.getId()));
    }

    public Page<JobPost> findByKw(List<String> kwTypes, String kw, String closed, String gender, int[] min_Age, List<String> location, Pageable pageable) {
        return jobPostRepository.findByKw(kwTypes, kw, closed, gender, min_Age, location, pageable);
    }

    public Page<JobPost> findBySort(Pageable pageable) {
        return jobPostRepository.findBySort(pageable);
    }

    public List<JobPostDto> findByInterestAndUsername(Long memberId) {
        return jobPostdetailRepository.findByInterestsMemberId(memberId)
                .stream()
                .map(JobPostDetail::getJobPost)
                .map(JobPostDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public void increaseViewCount(Long jobPostId) {
        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new CustomException(POST_NOT_EXIST));
        jobPost.increaseViewCount();
    }

    public List<JobPostDto> searchJobPostsByTitleAndBody(String titleAndBody, String titleOnly, String bodyOnly) {
        Specification<JobPost> spec = Specification.where(null);

        spec = applyTitleAndBodySearch(spec, titleAndBody);
        spec = applyTitleOnlySearch(spec, titleOnly);
        spec = applyBodyOnlySearch(spec, bodyOnly);

        return jobPostRepository.findAll(spec)
                .stream()
                .map(JobPostDto::fromEntity)
                .collect(Collectors.toList());
    }

    private Specification<JobPost> applyTitleAndBodySearch(Specification<JobPost> spec, String titleAndBody) {
        if (titleAndBody != null) {
            return spec.and(JobPostSpecifications.titleContains(titleAndBody))
                    .or(JobPostSpecifications.bodyContains(titleAndBody));
        }
        return spec;
    }

    private Specification<JobPost> applyTitleOnlySearch(Specification<JobPost> spec, String titleOnly) {
        if (titleOnly != null) {
            return spec.and(JobPostSpecifications.titleContains(titleOnly));
        }
        return spec;
    }

    private Specification<JobPost> applyBodyOnlySearch(Specification<JobPost> spec, String bodyOnly) {
        if (bodyOnly != null) {
            return spec.and(JobPostSpecifications.bodyContains(bodyOnly));
        }
        return spec;
    }

    public List<JobPost> findExpiredJobPosts(LocalDate currentDate) { //    ver.  LocalDate
        return jobPostRepository.findByClosedFalseAndDeadlineBefore(currentDate);
    }

    @EventListener
    @Transactional
    public void jobPostClosedEventListen(PostDeadlineEvent event) {
        JobPost jobPost = event.getJobPost();
        jobPost.close();
        jobPostRepository.save(jobPost);
    }

    @EventListener
    @Transactional
    public void jobPostEmployedEventListen(PostEmployedEvent event) {
        JobPost jobPost = event.getJobPost();
        jobPost.employed();
        jobPostRepository.save(jobPost);
    }

    @Transactional
    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul") // 00:00:00.000000에 실행
//    @Scheduled(cron = "*/10 * * * * *")
    public void checkAndCloseExpiredJobPosts() {
        List<JobPost> expiredJobPosts = findExpiredJobPosts(LocalDate.now());
        for (JobPost jobPost : expiredJobPosts) {
            publisher.publishEvent(new PostDeadlineEvent(this, jobPost));
        }
    }

    @Transactional
    public void postEarlyClosing(String username, Long id) {
        JobPost jobPost = findByIdAndValidate(id);
        if (!canEditPost(username, jobPost.getMember().getUsername())) {
            throw new CustomException(NOT_ABLE);
        }
        jobPost.SetDeadlineNull();
        publisher.publishEvent(new PostDeadlineEvent(this, jobPost));
    }

    public List<JobPostDto> getPostsByCategory(String categoryName) {
        Category category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new CustomException(NOT_FOUND_CATEGORY));

        List<JobPost> jobPosts = null;

        if (category.getParent().getId() == 1) {   // 업무
            jobPosts = jobPostRepository.findAllByCategoryOrderByCreatedAtDesc(category);
        }

        if (category.getParent().getId() == 2) {   // 지역
            int regionCode = RegionType.getCodeByName(categoryName);
            jobPosts =  jobPostRepository.findAllByRegionCodeOrderByCreatedAtDesc(regionCode);
        }

        return JobPostDto.toDtoList(Objects.requireNonNull(jobPosts));
    }
}
