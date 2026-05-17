package com.flexizen.repository;

import com.flexizen.model.Admin;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class AdminRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public Admin findByUsername(String username) {
        try {
            return entityManager.createQuery(
                "SELECT a FROM Admin a WHERE a.username = :username", Admin.class)
                .setParameter("username", username)
                .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
