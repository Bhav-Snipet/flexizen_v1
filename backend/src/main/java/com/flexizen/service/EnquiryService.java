package com.flexizen.service;

import com.flexizen.model.Enquiry;
import com.flexizen.repository.EnquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    @Autowired
    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @Transactional
    public Enquiry submit(String name, String email, String message) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(name);
        enquiry.setEmail(email);
        enquiry.setMessage(message);
        enquiry.setReadStatus("UNREAD");
        enquiry.setCreatedAt(java.time.LocalDateTime.now());
        return enquiryRepository.save(enquiry);
    }

    @Transactional(readOnly = true)
    public List<Enquiry> getAll() {
        return enquiryRepository.findAll();
    }

    @Transactional
    public Enquiry markRead(Long id) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enquiry not found id=" + id));
        enquiry.setReadStatus("READ");
        return enquiryRepository.save(enquiry);
    }

    @Transactional
    public void delete(Long id) {
        if (!enquiryRepository.existsById(id)) {
            throw new IllegalArgumentException("Enquiry not found id=" + id);
        }
        enquiryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long countRead() {
        return enquiryRepository.findByReadStatus("READ").size();
    }

    @Transactional(readOnly = true)
    public long countUnread() {
        return enquiryRepository.findByReadStatus("UNREAD").size();
    }

    @Transactional(readOnly = true)
    public long countAll() {
        return enquiryRepository.count();
    }
}

