package com.flexizen.model;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String message;

    @Column(name = "read_status", nullable = false)
    private Boolean readStatus = false;

    @Column(nullable = false, length = 50)
    private String type;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private Timestamp createdAt;

    public Notification() {}

    public Notification(String message, String type) {
        this.message = message;
        this.type = type;
        this.readStatus = false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getReadStatus() { return readStatus; }
    public void setReadStatus(Boolean readStatus) { this.readStatus = readStatus; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
}
