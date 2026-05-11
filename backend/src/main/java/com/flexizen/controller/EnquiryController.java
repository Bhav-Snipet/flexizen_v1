package com.flexizen.controller;

import com.flexizen.model.Enquiry;
import com.flexizen.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EnquiryController {

    private final EnquiryService enquiryService;

    @Autowired
    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    // USER: submit enquiry (no auth)
    @PostMapping("/enquiries")
    public ResponseEntity<Enquiry> submit(@RequestBody SubmitEnquiryRequest req) {
        Enquiry enquiry = enquiryService.submit(req.getName(), req.getEmail(), req.getMessage());
        return ResponseEntity.status(HttpStatus.CREATED).body(enquiry);
    }

    // ADMIN: list enquiries
    @GetMapping("/admin/enquiries")
    public List<Enquiry> getAll() {
        return enquiryService.getAll();
    }

    // ADMIN: mark read
    @PutMapping("/admin/enquiries/{id}/read")
    public Enquiry markRead(@PathVariable Long id) {
        return enquiryService.markRead(id);
    }

    // ADMIN: delete enquiry
    @DeleteMapping("/admin/enquiries/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        enquiryService.delete(id);
    }

    public static class SubmitEnquiryRequest {
        private String name;
        private String email;
        private String message;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}

