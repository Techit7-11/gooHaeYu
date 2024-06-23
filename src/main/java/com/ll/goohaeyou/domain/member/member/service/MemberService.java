package com.ll.goohaeyou.domain.member.member.service;

import com.ll.goohaeyou.domain.member.member.dto.*;
import com.ll.goohaeyou.domain.member.member.entity.Member;
import com.ll.goohaeyou.domain.member.member.entity.type.Role;
import com.ll.goohaeyou.domain.member.member.repository.MemberRepository;
import com.ll.goohaeyou.global.exception.CustomException;
import com.ll.goohaeyou.standard.base.util.Ut;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ll.goohaeyou.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public JoinForm join(JoinForm form) {
        memberRepository.findByUsername(form.getUsername())
                .ifPresent(member -> {
                    throw new CustomException(DUPLICATE_USERNAME);
                });

        Role role = form.getUsername().equals("admin") ? Role.ADMIN : Role.USER;

        memberRepository.save(Member.builder()
                .username(form.getUsername())
                .password(bCryptPasswordEncoder.encode(form.getPassword()))
                .name(form.getName())
                .phoneNumber(form.getPhoneNumber())
                .email(form.getEmail())
                .gender(form.getGender())
                .location(form.getLocation())
                .birth(form.getBirth())
                .role(role)
                .regionCode(Ut.Region.getRegionCodeFromAddress(form.getLocation()))
                .build());
        return form;
    }

    public void login(LoginForm form) {
        Member member = getMember(form.getUsername());

        if (!bCryptPasswordEncoder.matches(form.getPassword(), member.getPassword())) {
            throw new CustomException(INVALID_PASSWORD);
        }
    }

    public Member getMember(String username) {
        return memberRepository.findByUsername(username)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }

    public MemberDto findByUsername(String username) {
        Member member = getMember(username);

        return MemberDto.fromEntity(member);
    }

    @Transactional
    public void modifyMember(String username, MemberForm.Modify form) {
        Member member = getMember(username);

        String password = (form.getPassword() != null && !form.getPassword().isBlank())
                ? bCryptPasswordEncoder.encode(form.getPassword())
                : null;

        member.update(password, form.getGender(), form.getLocation(), form.getBirth());
    }

    public String findUsernameById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() ->
                        new CustomException(MEMBER_NOT_FOUND));

        return member.getUsername();
    }

    public Member findById(Long userId) {
        return memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }

    @Transactional
    public MemberDto updateSocialMemberProfile(String username, SocialProfileForm form) {
        Member member = getMember(username);

        if (member.getEmail() == null) {    // 소셜 회원은 본인인증을 할 필요가 없다
            member.authenticate();
        }

        member.oauthDetailUpdate(form);
        member.updateRole(Role.USER);

        return MemberDto.fromEntity(member);
    }
}
