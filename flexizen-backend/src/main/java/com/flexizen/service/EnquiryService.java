package com.flexizen.service;

import com.flexizen.model.Enquiry;
import com.flexizen.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EmailService emailService;

    public Enquiry submitEnquiry(Enquiry enquiry) {
        enquiry.setReadStatus(false);
        enquiryRepository.save(enquiry);

        // NOTE: Email dispatch is disabled for demo purposes.
        // To enable, configure SMTP credentials in applicationContext.xml and uncomment the block below.
        // try {
        //     String subject = "New FlexiZen Enquiry from " + enquiry.getName();
        //     String body = "Dear Admin,\n\n" +
        //             "A new enquiry has been submitted on FlexiZen.\n\n" +
        //             "Details:\n" +
        //             "Name: " + enquiry.getName() + "\n" +
        //             "Email: " + enquiry.getEmail() + "\n" +
        //             "Phone: " + (enquiry.getPhone() != null && !enquiry.getPhone().isBlank() ? enquiry.getPhone() : "N/A") + "\n" +
        //             "Session: " + (enquiry.getSessionTitle() != null && !enquiry.getSessionTitle().isBlank() ? enquiry.getSessionTitle() : "General Enquiry") + "\n\n" +
        //             "Message:\n" + enquiry.getMessage() + "\n\n" +
        //             "Best regards,\n" +
        //             "FlexiZen System";
        //     emailService.sendEmail("bhav9bothare@gmail.com", subject, body);
        // } catch (Exception ex) {
        //     System.err.println("Failed to send email notification to admin: " + ex.getMessage());
        // }

        // Trigger in-app notification (Future Scope)
        try {
            String sessionPart = (enquiry.getSessionTitle() != null && !enquiry.getSessionTitle().isBlank())
                    ? " for session '" + enquiry.getSessionTitle() + "'"
                    : "";
            notificationService.createNotification(
                "New enquiry received from " + enquiry.getName() + " (" + enquiry.getEmail() + ")" + sessionPart,
                "ENQUIRY"
            );
        } catch (Exception ex) {
            System.err.println("Failed to create in-app alert for enquiry: " + ex.getMessage());
        }

        return enquiry;
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAll();
    }

    public Enquiry markAsRead(Long id) {
        Enquiry enquiry = enquiryRepository.findById(id);
        if (enquiry != null) {
            enquiry.setReadStatus(true);
            enquiryRepository.save(enquiry);
        }
        return enquiry;
    }

    public void deleteEnquiry(Long id) {
        Enquiry enquiry = enquiryRepository.findById(id);
        if (enquiry != null) {
            enquiryRepository.delete(enquiry);
        }
    }

    public Enquiry replyToEnquiry(Long id, String replyMessage) {
        Enquiry enquiry = enquiryRepository.findById(id);
        if (enquiry == null) {
            throw new RuntimeException("Enquiry not found.");
        }

        // Send email reply (Future Scope)
        try {
            String subject = "FlexiZen Support: Reply to your enquiry";
            String body = "Hello " + enquiry.getName() + ",\n\n" +
                    "Thank you for contacting FlexiZen. Here is our response to your message:\n\n" +
                    "--------------------------------------------------\n" +
                    replyMessage + "\n" +
                    "--------------------------------------------------\n\n" +
                    "Original Message:\n" +
                    "\"" + enquiry.getMessage() + "\"\n\n" +
                    "Warm regards,\nThe FlexiZen Team";
            emailService.sendEmail(enquiry.getEmail(), subject, body);
        } catch (Exception ex) {
            System.err.println("Failed to send enquiry reply email: " + ex.getMessage());
        }

        // Mark as read after replying
        enquiry.setReadStatus(true);
        enquiryRepository.save(enquiry);
        return enquiry;
    }
}
