package com.flexizen.service;

import com.flexizen.model.Booking;
import com.flexizen.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class ReportService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getBookingsByDateRange(String startDateStr, String endDateStr) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        
        // Default to last 30 days if null
        LocalDate start = startDateStr != null ? LocalDate.parse(startDateStr, formatter) : LocalDate.now().minusDays(30);
        LocalDate end = endDateStr != null ? LocalDate.parse(endDateStr, formatter) : LocalDate.now();

        // Convert to start of day and end of day
        Timestamp startTimestamp = Timestamp.valueOf(start.atStartOfDay());
        Timestamp endTimestamp = Timestamp.valueOf(end.atTime(23, 59, 59));

        return bookingRepository.findByDateRange(startTimestamp, endTimestamp);
    }
    
    public Booking searchByBookingNo(String bookingNo) {
        return bookingRepository.findByBookingNo(bookingNo);
    }
}
