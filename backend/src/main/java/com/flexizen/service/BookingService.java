package com.flexizen.service;

import com.flexizen.model.Booking;
import com.flexizen.model.User;
import com.flexizen.model.YogaClass;
import com.flexizen.repository.BookingRepository;
import com.flexizen.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ClassRepository classRepository;

    // UserRepository doesn't exist in this skeleton yet; we reuse EntityManager via JPA save.
    private final javax.persistence.EntityManager entityManager;

    @Autowired
    public BookingService(BookingRepository bookingRepository,
                           ClassRepository classRepository,
                           javax.persistence.EntityManager entityManager) {
        this.bookingRepository = bookingRepository;
        this.classRepository = classRepository;
        this.entityManager = entityManager;
    }

    @Transactional
    public Booking createBooking(Long classId, String name, String phone, String email) {
        YogaClass yogaClass = classRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("YogaClass not found id=" + classId));

        User user = new User();
        user.setName(name);
        user.setPhone(phone);
        user.setEmail(email);

        // Persist user first
        entityManager.persist(user);

        Booking booking = new Booking();
        booking.setBookingNo(generateBookingNo());
        booking.setYogaClass(yogaClass);
        booking.setUser(user);
        booking.setStatus("NEW");
        booking.setCreatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = true)
    public Booking findByBookingNo(String bookingNo) {
        return bookingRepository.findByBookingNo(bookingNo);
    }

    @Transactional(readOnly = true)
    public List<Booking> findByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public List<Booking> findByDateRange(LocalDateTime from, LocalDateTime to) {
        return bookingRepository.findByCreatedAtBetween(from, to);
    }

    @Transactional
    public Booking approve(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found id=" + bookingId));
        booking.setStatus("APPROVED");
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking cancel(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found id=" + bookingId));
        booking.setStatus("CANCELLED");
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking addRemark(Long bookingId, String remark) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found id=" + bookingId));
        booking.setRemark(remark);
        return bookingRepository.save(booking);
    }

    private String generateBookingNo() {
        // Compact unique reference; replace with stronger scheme if needed.
        return "FZ-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}

