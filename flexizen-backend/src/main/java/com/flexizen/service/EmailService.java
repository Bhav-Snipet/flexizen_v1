package com.flexizen.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    private static final String LOG_FILE_PATH = "d:/Java Fullstack/Flexizen_v1/sent-emails.log";

    public void sendEmail(String to, String subject, String body) {
        // 1. Always log locally for verification
        logEmailToFile(to, subject, body);

        // 2. Dispatch via mailSender if it exists
        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(to);
                message.setSubject(subject);
                message.setText(body);
                mailSender.send(message);
                System.out.println("Email successfully dispatched via SMTP to: " + to);
            } catch (MailException ex) {
                System.err.println("SMTP Dispatch failed. Graceful fallback executed. Error: " + ex.getMessage());
            }
        } else {
            System.out.println("No JavaMailSender configured. Logged email locally to: " + LOG_FILE_PATH);
        }
    }

    private synchronized void logEmailToFile(String to, String subject, String body) {
        try (FileWriter fw = new FileWriter(LOG_FILE_PATH, true);
             PrintWriter pw = new PrintWriter(fw)) {
            pw.println("=================================================================");
            pw.println("TIMESTAMP: " + LocalDateTime.now());
            pw.println("RECIPIENT: " + to);
            pw.println("SUBJECT  : " + subject);
            pw.println("CONTENT  : ");
            pw.println(body);
            pw.println("=================================================================");
            pw.println();
        } catch (IOException e) {
            System.err.println("Failed to write email log: " + e.getMessage());
        }
    }
}
