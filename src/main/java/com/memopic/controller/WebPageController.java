package com.memopic.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebPageController {

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Jika pakai Thymeleaf, letakkan register.html di src/main/resources/templates/
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    // ... halaman lain jika perlu
}
