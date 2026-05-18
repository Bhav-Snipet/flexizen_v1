package com.flexizen.controller;

import com.flexizen.model.Booking;
import com.flexizen.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/reports/bookings")
    public ResponseEntity<List<Booking>> getBookingsReport(
            @RequestParam(required = false) String start,
            @RequestParam(required = false) String end) {
        return ResponseEntity.ok(reportService.getBookingsByDateRange(start, end));
    }

    @GetMapping("/bookings/search")
    public ResponseEntity<?> searchBooking(@RequestParam String bookingNo) {
        Booking booking = reportService.searchByBookingNo(bookingNo);
        if (booking != null) {
            return ResponseEntity.ok(booking);
        }
        return ResponseEntity.notFound().build();
    }
}
