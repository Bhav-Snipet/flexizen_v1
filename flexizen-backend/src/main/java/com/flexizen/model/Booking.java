package com.flexizen.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_no", nullable = false, unique = true, length = 20)
    private String bookingNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "class_id", nullable = false)
    private YogaClass yogaClass;

    @Column(nullable = false, length = 20)
    private String status = "NEW";

    @Column(columnDefinition = "TEXT")
    private String remark;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Timestamp createdAt;

    public Booking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingNo() { return bookingNo; }
    public void setBookingNo(String bookingNo) { this.bookingNo = bookingNo; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public YogaClass getYogaClass() { return yogaClass; }
    public void setYogaClass(YogaClass yogaClass) { this.yogaClass = yogaClass; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
}
