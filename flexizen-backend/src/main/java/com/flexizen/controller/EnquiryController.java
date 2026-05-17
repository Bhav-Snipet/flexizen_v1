package com.flexizen.controller;

import com.flexizen.model.Enquiry;
import com.flexizen.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    // Public API
    @PostMapping("/enquiries")
    public ResponseEntity<Enquiry> submitEnquiry(@RequestBody Enquiry enquiry) {
        return ResponseEntity.ok(enquiryService.submitEnquiry(enquiry));
    }

    // Admin APIs
    @GetMapping("/admin/enquiries")
    public ResponseEntity<List<Enquiry>> getAllEnquiries() {
        return ResponseEntity.ok(enquiryService.getAllEnquiries());
    }

    @PutMapping("/admin/enquiries/{id}/read")
    public ResponseEntity<Enquiry> markAsRead(@PathVariable Long id) {
        Enquiry updated = enquiryService.markAsRead(id);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/admin/enquiries/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}
