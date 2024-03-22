package com.ll.gooHaeYu.controller.application;

import com.ll.gooHaeYu.domain.application.application.dto.ApplicationForm;
import com.ll.gooHaeYu.domain.jobPost.jobPost.dto.JobPostDto;
import com.ll.gooHaeYu.domain.jobPost.jobPost.service.JobPostService;
import com.ll.gooHaeYu.domain.member.member.entity.Member;
import com.ll.gooHaeYu.domain.member.member.service.MemberService;
import com.ll.gooHaeYu.global.security.JwtTokenProvider;
import com.ll.utils.builder.JobPostWriteFormBuilder;
import com.ll.utils.builder.JoinFormBuilder;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

import static com.ll.gooHaeYu.global.config.AppConfig.objectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
public class ApplicationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MemberService memberService;

    @Autowired
    private JobPostService jobPostService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private static final Duration ACCESS_TOKEN_DURATION = Duration.ofMinutes(30);
    private static final String ACCESS_TOKEN_COOKIE_NAME = "access_token";

    @DisplayName("지원서 작성 성공")
    @Test
    void writeApplicationSuccess() throws Exception {
        // Given
        memberService.join(new JoinFormBuilder().setUsername("recruiter").build());
        jobPostService.writePost("recruiter", new JobPostWriteFormBuilder().build());

        List<JobPostDto> jobPostDtos = jobPostService.findByUsername("recruiter");

        memberService.join(new JoinFormBuilder().setUsername("applicant").build());

        ApplicationForm.Register form = writeApplicationForm();

        Member member = memberService.getMember("applicant");

        String accessToken = jwtTokenProvider.generateToken(member, ACCESS_TOKEN_DURATION);

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/applications/{id}", jobPostDtos.get(0).getId())
                        .cookie(new Cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(form)))
                .andDo(print());

        // Then
        resultActions.andExpect(jsonPath("$.statusCode").value(201))
                .andExpect(jsonPath("$.message").value("Created"))
                .andExpect(jsonPath("$.data").isEmpty());
    }

    @DisplayName("지원서 작성 실패 - 존재하지 않는 공고에 지원")
    @Test
    void writeApplicationFail() throws Exception {
        // Given
        memberService.join(new JoinFormBuilder().setUsername("applicant").build());

        ApplicationForm.Register form = writeApplicationForm();

        Member member = memberService.getMember("applicant");

        String accessToken = jwtTokenProvider.generateToken(member, ACCESS_TOKEN_DURATION);

        // When
        ResultActions resultActions = mockMvc.perform(post("/api/applications/{id}", 10)
                        .cookie(new Cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(form)))
                .andDo(print());

        // Then
        resultActions.andExpect(jsonPath("$.statusCode").value(404))
                .andExpect(jsonPath("$.resultType").value("CUSTOM_EXCEPTION"))
                .andExpect(jsonPath("$.message").value("해당 공고는 존재하지 않습니다."))
                .andExpect(jsonPath("$.data").isEmpty());
    }

    private ApplicationForm.Register writeApplicationForm() {
        return ApplicationForm.Register.builder()
                .body("지원서 내용.")
                .build();
    }
}
