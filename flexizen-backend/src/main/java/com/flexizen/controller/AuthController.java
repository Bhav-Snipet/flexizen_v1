package com.flexizen.controller;

import com.flexizen.security.SecurityUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> getCurrentUser() {
        if (SecurityUtil.isAuthenticated()) {
            return ResponseEntity.ok(Map.of(
                "username", SecurityUtil.getCurrentUsername(),
                "role", "ADMIN"
            ));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
    }
}
