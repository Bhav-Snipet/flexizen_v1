package com.flexizen.repository;

import com.flexizen.model.Notification;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Notification> findAllUnread() {
        return entityManager.createQuery("SELECT n FROM Notification n WHERE n.readStatus = false ORDER BY n.id DESC", Notification.class)
                .getResultList();
    }

    public Notification findById(Long id) {
        return entityManager.find(Notification.class, id);
    }

    public void save(Notification notification) {
        if (notification.getId() == null) {
            entityManager.persist(notification);
        } else {
            entityManager.merge(notification);
        }
    }

    public int markAllAsRead() {
        return entityManager.createQuery("UPDATE Notification n SET n.readStatus = true WHERE n.readStatus = false")
                .executeUpdate();
    }
}
