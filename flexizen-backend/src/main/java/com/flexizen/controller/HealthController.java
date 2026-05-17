package com.flexizen.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * HealthController — Phase 1 verification endpoint.
 *
 * GET /api/health → 200 OK JSON
 * Used to confirm the Spring MVC context has loaded and DispatcherServlet is responding.
 * Can be removed after Phase 1 verification.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "status",    "UP",
            "app",       "FlexiZen Backend",
            "version",   "1.0-SNAPSHOT",
            "timestamp", LocalDateTime.now().toString()
        ));
    }
}
