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

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EmailService emailService;

    public Booking createBooking(AppUser userDetails, Long classId) {
        // 1. Check or save user (basic logic based on phone number)
        AppUser user = userRepository.findByPhone(userDetails.getPhone());
        if (user == null) {
            user = new AppUser();
            user.setName(userDetails.getName());
            user.setPhone(userDetails.getPhone());
            user.setEmail(userDetails.getEmail());
            userRepository.save(user);
        } else if (userDetails.getEmail() != null && !userDetails.getEmail().isBlank()) {
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

        // 5. Trigger notifications & emails (Future Scope)
        try {
            notificationService.createNotification(
                "New booking " + bookingNo + " requested for class '" + yogaClass.getTitle() + "' by " + user.getName(),
                "BOOKING"
            );
        } catch (Exception ex) {
            System.err.println("In-app notification creation failed: " + ex.getMessage());
        }

        if (user.getEmail() != null && !user.getEmail().isBlank()) {
            try {
                String subject = "FlexiZen Booking Confirmation - " + bookingNo;
                String body = "Hello " + user.getName() + ",\n\n" +
                        "Your booking has been requested successfully!\n" +
                        "Booking Reference: " + bookingNo + "\n" +
                        "Class Title: " + yogaClass.getTitle() + "\n" +
                        "Schedule: " + yogaClass.getSchedule() + "\n\n" +
                        "Our team will review your booking details shortly.\n\n" +
                        "Warm regards,\nThe FlexiZen Team";
                emailService.sendEmail(user.getEmail(), subject, body);
            } catch (Exception ex) {
                System.err.println("Failed to send booking confirmation email: " + ex.getMessage());
            }
        }

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

            // Trigger notifications & emails (Future Scope)
            try {
                notificationService.createNotification(
                    "Booking " + booking.getBookingNo() + " status changed to: " + status,
                    "BOOKING"
                );
            } catch (Exception ex) {
                System.err.println("In-app status update notification failed: " + ex.getMessage());
            }

            AppUser user = booking.getUser();
            if (user != null && user.getEmail() != null && !user.getEmail().isBlank()) {
                try {
                    String remarkStr = (booking.getRemark() != null && !booking.getRemark().isBlank())
                            ? "\nAdmin Remark: " + booking.getRemark() : "";
                    String subject = "FlexiZen Booking " + status + " - " + booking.getBookingNo();
                    String body = "Hello " + user.getName() + ",\n\n" +
                            "Your booking (" + booking.getBookingNo() + ") for class '" +
                            booking.getYogaClass().getTitle() + "' has been " + status + "." +
                            remarkStr + "\n\n" +
                            "Warm regards,\nThe FlexiZen Team";
                    emailService.sendEmail(user.getEmail(), subject, body);
                } catch (Exception ex) {
                    System.err.println("Failed to send booking status email update: " + ex.getMessage());
                }
            }
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
