package com.flexizen.repository;

import com.flexizen.model.AppUser;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public void save(AppUser user) {
        if (user.getId() == null) {
            entityManager.persist(user);
        } else {
            entityManager.merge(user);
        }
    }
    
    public AppUser findByPhone(String phone) {
        List<AppUser> users = entityManager.createQuery("SELECT u FROM AppUser u WHERE u.phone = :phone", AppUser.class)
                .setParameter("phone", phone)
                .getResultList();
        return users.isEmpty() ? null : users.get(0);
    }
}
