package com.ll.gooHaeYu.domain.member.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OAuthController {
    @GetMapping("/login")
    public  String login() {
        return "oauthLogin";
    }
}
