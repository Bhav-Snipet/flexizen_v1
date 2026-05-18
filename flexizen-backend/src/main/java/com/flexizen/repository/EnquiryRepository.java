package com.flexizen.repository;

import com.flexizen.model.Enquiry;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EnquiryRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Enquiry> findAll() {
        return entityManager.createQuery("SELECT e FROM Enquiry e ORDER BY e.id DESC", Enquiry.class).getResultList();
    }
    
    public List<Enquiry> findByReadStatus(Boolean readStatus) {
        return entityManager.createQuery("SELECT e FROM Enquiry e WHERE e.readStatus = :status ORDER BY e.id DESC", Enquiry.class)
                .setParameter("status", readStatus)
                .getResultList();
    }

    public Long countUnread() {
        return entityManager.createQuery("SELECT COUNT(e) FROM Enquiry e WHERE e.readStatus = false", Long.class).getSingleResult();
    }

    public Enquiry findById(Long id) {
        return entityManager.find(Enquiry.class, id);
    }

    public void save(Enquiry enquiry) {
        if (enquiry.getId() == null) {
            entityManager.persist(enquiry);
        } else {
            entityManager.merge(enquiry);
        }
    }

    public void delete(Enquiry enquiry) {
        entityManager.remove(entityManager.contains(enquiry) ? enquiry : entityManager.merge(enquiry));
    }
}
