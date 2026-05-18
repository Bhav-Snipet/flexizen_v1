package com.flexizen.controller;

import com.flexizen.model.Admin;
import com.flexizen.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardKPIs() {
        return ResponseEntity.ok(adminService.getDashboardKPIs());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> payload) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        Admin updated = adminService.updateProfile(username, payload.get("name"), payload.get("email"));
        if (updated != null) {
            return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Update failed"));
    }

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        boolean success = adminService.changePassword(username, payload.get("currentPassword"), payload.get("newPassword"));
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
        }
        return ResponseEntity.badRequest().body(Map.of("error", "Incorrect current password"));
    }
}
