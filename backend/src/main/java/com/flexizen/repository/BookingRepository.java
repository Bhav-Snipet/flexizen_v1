allpackage com.flexizen.repository;

import com.flexizen.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findByBookingNo(String bookingNo);

    List<Booking> findByStatus(String status);

    List<Booking> findByCreatedAtBetween(LocalDateTime from, LocalDateTime to);
}

