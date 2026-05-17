package com.flexizen.model;

import jakarta.persistence.*;

@Entity
@Table(name = "yoga_class")
public class YogaClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 200)
    private String schedule;

    @Column(nullable = false)
    private Integer capacity = 20;

    @Column(nullable = false)
    private Boolean active = true;

    // Constructors
    public YogaClass() {}

    public YogaClass(String title, String description, String schedule, Integer capacity, Boolean active) {
        this.title = title;
        this.description = description;
        this.schedule = schedule;
        this.capacity = capacity;
        this.active = active;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }
    
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
