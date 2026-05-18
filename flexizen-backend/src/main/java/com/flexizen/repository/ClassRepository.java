package com.flexizen.repository;

import com.flexizen.model.YogaClass;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClassRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<YogaClass> findAll() {
        return entityManager.createQuery("SELECT y FROM YogaClass y ORDER BY y.id DESC", YogaClass.class).getResultList();
    }

    public List<YogaClass> findActive() {
        return entityManager.createQuery("SELECT y FROM YogaClass y WHERE y.active = true ORDER BY y.id DESC", YogaClass.class).getResultList();
    }

    public Long countActive() {
        return entityManager.createQuery("SELECT COUNT(y) FROM YogaClass y WHERE y.active = true", Long.class).getSingleResult();
    }

    public YogaClass findById(Long id) {
        return entityManager.find(YogaClass.class, id);
    }

    public void save(YogaClass yogaClass) {
        if (yogaClass.getId() == null) {
            entityManager.persist(yogaClass);
        } else {
            entityManager.merge(yogaClass);
        }
    }

    public void delete(YogaClass yogaClass) {
        entityManager.remove(entityManager.contains(yogaClass) ? yogaClass : entityManager.merge(yogaClass));
    }
}
