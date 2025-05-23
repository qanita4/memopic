package com.memopic.controller;

import com.memopic.model.User;
import com.memopic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Utility hash password
    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] bytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return "Username already exists";
        }
        user.setPassword(hashPassword(user.getPassword())); // Hash password!
        userRepository.save(user);
        return "Register successful";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User u = userRepository.findByUsername(user.getUsername());
        if (u != null && u.getPassword().equals(hashPassword(user.getPassword()))) {
            return u.getId().toString();
        }
        return "Invalid username or password";
    }
}


