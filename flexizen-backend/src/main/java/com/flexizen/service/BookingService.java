package com.flexizen.service;

import com.flexizen.model.AppUser;
import com.flexizen.model.Booking;
import com.flexizen.model.YogaClass;
import com.flexizen.repository.BookingRepository;
import com.flexizen.repository.ClassRepository;
import com.flexizen.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ClassRepository classRepository;

    public Booking createBooking(AppUser userDetails, Long classId) {
        // 1. Check or save user (basic logic based on phone number)
        AppUser user = userRepository.findByPhone(userDetails.getPhone());
        if (user == null) {
            user = new AppUser();
            user.setName(userDetails.getName());
            user.setPhone(userDetails.getPhone());
            user.setEmail(userDetails.getEmail());
            userRepository.save(user);
        }

        // 2. Fetch class
        YogaClass yogaClass = classRepository.findById(classId);
        if (yogaClass == null || !yogaClass.getActive()) {
            throw new RuntimeException("Class not found or inactive.");
        }

        // 3. Generate Booking No (e.g. FZ-20260517-1234)
        String bookingNo = "FZ-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        // 4. Create booking
        Booking booking = new Booking();
        booking.setBookingNo(bookingNo);
        booking.setUser(user);
        booking.setYogaClass(yogaClass);
        booking.setStatus("NEW");

        bookingRepository.save(booking);
        return booking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }

    public Booking updateStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id);
        if (booking != null) {
            booking.setStatus(status);
            bookingRepository.save(booking);
        }
        return booking;
    }

    public Booking updateRemark(Long id, String remark) {
        Booking booking = bookingRepository.findById(id);
        if (booking != null) {
            booking.setRemark(remark);
            bookingRepository.save(booking);
        }
        return booking;
    }
}
