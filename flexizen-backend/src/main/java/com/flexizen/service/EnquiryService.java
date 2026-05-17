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

    public Enquiry submitEnquiry(Enquiry enquiry) {
        enquiry.setReadStatus(false);
        enquiryRepository.save(enquiry);
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
}
