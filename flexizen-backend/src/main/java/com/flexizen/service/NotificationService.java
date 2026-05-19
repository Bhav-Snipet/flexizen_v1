package com.flexizen.service;

import com.flexizen.model.Notification;
import com.flexizen.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Transactional(readOnly = true)
    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findAllUnread();
    }

    public void createNotification(String message, String type) {
        Notification notification = new Notification(message, type);
        notificationRepository.save(notification);
    }

    public void markAllAsRead() {
        notificationRepository.markAllAsRead();
    }

    public void markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id);
        if (notification != null) {
            notification.setReadStatus(true);
            notificationRepository.save(notification);
        }
    }
}
