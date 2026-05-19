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

        // Trigger in-app notification (Future Scope)
        try {
            notificationService.createNotification(
                "New enquiry received from " + enquiry.getName() + " (" + enquiry.getEmail() + ")",
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
