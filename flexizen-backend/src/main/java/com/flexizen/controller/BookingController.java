package com.flexizen.controller;

import com.flexizen.model.AppUser;
import com.flexizen.model.Booking;
import com.flexizen.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // ----- PUBLIC ENDPOINTS -----

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody Map<String, Object> payload) {
        try {
            // Extract AppUser details
            Map<String, String> userMap = (Map<String, String>) payload.get("user");
            AppUser user = new AppUser();
            user.setName(userMap.get("name"));
            user.setPhone(userMap.get("phone"));
            user.setEmail(userMap.get("email"));

            // Extract Class ID
            Long classId = Long.valueOf(payload.get("classId").toString());

            Booking booking = bookingService.createBooking(user, classId);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ----- ADMIN ENDPOINTS -----

    @GetMapping("/admin/bookings")
    public ResponseEntity<List<Booking>> getAllBookings(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
        }
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PutMapping("/admin/bookings/{id}/status")
    public ResponseEntity<Booking> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        Booking updatedBooking = bookingService.updateStatus(id, status);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/admin/bookings/{id}/remark")
    public ResponseEntity<Booking> updateRemark(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String remark = payload.get("remark");
        Booking updatedBooking = bookingService.updateRemark(id, remark);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        }
        return ResponseEntity.notFound().build();
    }
}
