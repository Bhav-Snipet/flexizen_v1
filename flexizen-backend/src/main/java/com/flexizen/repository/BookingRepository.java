package com.flexizen.repository;

import com.flexizen.model.Booking;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookingRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Booking> findAll() {
        return entityManager.createQuery("SELECT b FROM Booking b ORDER BY b.id DESC", Booking.class).getResultList();
    }

    public List<Booking> findByStatus(String status) {
        return entityManager.createQuery("SELECT b FROM Booking b WHERE b.status = :status ORDER BY b.id DESC", Booking.class)
                .setParameter("status", status)
                .getResultList();
    }

    public Booking findById(Long id) {
        return entityManager.find(Booking.class, id);
    }
    
    public Booking findByBookingNo(String bookingNo) {
        List<Booking> bookings = entityManager.createQuery("SELECT b FROM Booking b WHERE b.bookingNo = :bookingNo", Booking.class)
                .setParameter("bookingNo", bookingNo)
                .getResultList();
        return bookings.isEmpty() ? null : bookings.get(0);
    }

    public List<Booking> findByDateRange(java.sql.Timestamp from, java.sql.Timestamp to) {
        return entityManager.createQuery("SELECT b FROM Booking b WHERE b.createdAt BETWEEN :from AND :to ORDER BY b.createdAt DESC", Booking.class)
                .setParameter("from", from)
                .setParameter("to", to)
                .getResultList();
    }

    public void save(Booking booking) {
        if (booking.getId() == null) {
            entityManager.persist(booking);
        } else {
            entityManager.merge(booking);
        }
    }
}
