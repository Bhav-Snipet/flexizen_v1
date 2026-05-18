package com.flexizen.service;

import com.flexizen.model.Admin;
import com.flexizen.repository.AdminRepository;
import com.flexizen.repository.BookingRepository;
import com.flexizen.repository.ClassRepository;
import com.flexizen.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private EnquiryRepository enquiryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, Long> getDashboardKPIs() {
        Map<String, Long> kpis = new HashMap<>();
        kpis.put("activeClasses", classRepository.countActive());
        kpis.put("newBookings", bookingRepository.countByStatus("NEW"));
        kpis.put("approvedBookings", bookingRepository.countByStatus("APPROVED"));
        kpis.put("unreadEnquiries", enquiryRepository.countUnread());
        return kpis;
    }

    public Admin updateProfile(String username, String name, String email) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null) {
            admin.setName(name);
            admin.setEmail(email);
            adminRepository.save(admin);
        }
        return admin;
    }

    public boolean changePassword(String username, String currentPassword, String newPassword) {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null && passwordEncoder.matches(currentPassword, admin.getPassword())) {
            admin.setPassword(passwordEncoder.encode(newPassword));
            adminRepository.save(admin);
            return true;
        }
        return false;
    }
}
