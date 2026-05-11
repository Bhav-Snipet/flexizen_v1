package com.flexizen.controller;

import com.flexizen.model.Booking;
import com.flexizen.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // USER: create booking (no auth)
    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody CreateBookingRequest req) {
        Booking booking = bookingService.createBooking(req.getClassId(), req.getName(), req.getPhone(), req.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }

    // USER/ADMIN: search booking by booking number
    @GetMapping("/bookings/search")
    public ResponseEntity<Booking> searchByBookingNo(@RequestParam String bookingNo) {
        Booking booking = bookingService.findByBookingNo(bookingNo);
        return booking != null ? ResponseEntity.ok(booking) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // ADMIN: list bookings by status
    @GetMapping("/admin/bookings")
    public List<Booking> listByStatus(@RequestParam(defaultValue = "NEW") String status) {
        return bookingService.findByStatus(status);
    }

    // ADMIN: approve/cancel/add remark
    @PutMapping("/admin/bookings/{id}/approve")
    public Booking approve(@PathVariable Long id) {
        return bookingService.approve(id);
    }

    @PutMapping("/admin/bookings/{id}/cancel")
    public Booking cancel(@PathVariable Long id) {
        return bookingService.cancel(id);
    }

    @PutMapping("/admin/bookings/{id}/remark")
    public Booking addRemark(@PathVariable Long id, @RequestBody RemarkRequest req) {
        return bookingService.addRemark(id, req.getRemark());
    }

    // ADMIN: booking report by date range
    @GetMapping("/admin/bookings/report")
    public List<Booking> bookingReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {
        return bookingService.findByDateRange(from, to);
    }

    public static class CreateBookingRequest {
        private Long classId;
        private String name;
        private String phone;
        private String email;

        public Long getClassId() {
            return classId;
        }

        public void setClassId(Long classId) {
            this.classId = classId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    public static class RemarkRequest {
        private String remark;

        public String getRemark() {
            return remark;
        }

        public void setRemark(String remark) {
            this.remark = remark;
        }
    }
}

