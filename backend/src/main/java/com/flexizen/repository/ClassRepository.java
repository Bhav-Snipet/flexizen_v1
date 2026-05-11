package com.flexizen.repository;

import com.flexizen.model.YogaClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<YogaClass, Long> {
    // Placeholder for future filters (e.g., active classes by date). For now, default CRUD is enough.
    List<YogaClass> findAll();
}

