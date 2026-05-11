package com.flexizen.controller;

import com.flexizen.model.Booking;
import com.flexizen.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final BookingRepository bookingRepository;

    @Autowired
    public AdminController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Minimal Phase-2 endpoint to satisfy spring-security default-target-url:
    // /api/admin/dashboard
    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        List<Booking> newBookings = bookingRepository.findByStatus("NEW");
        List<Booking> approvedBookings = bookingRepository.findByStatus("APPROVED");
        List<Booking> cancelledBookings = bookingRepository.findByStatus("CANCELLED");

        int totalNew = newBookings == null ? 0 : newBookings.size();
        int totalApproved = approvedBookings == null ? 0 : approvedBookings.size();
        int totalCancelled = cancelledBookings == null ? 0 : cancelledBookings.size();
        int totalAll = totalNew + totalApproved + totalCancelled;

        return Map.of(
                "totalNewBookings", totalNew,
                "totalApprovedBookings", totalApproved,
                "totalCancelledBookings", totalCancelled,
                "totalBookings", totalAll,
                // Placeholders for Phase-2 unblock; real enquiry counts can be added later.
                "totalReadEnquiries", 0,
                "totalUnreadEnquiries", 0,
                "totalEnquiries", 0,
                "totalActiveClasses", 0
        );
    }
}

