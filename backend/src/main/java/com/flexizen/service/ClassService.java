package com.flexizen.service;

import com.flexizen.model.YogaClass;
import com.flexizen.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService {

    private final ClassRepository classRepository;

    @Autowired
    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @Transactional(readOnly = true)
    public List<YogaClass> getAll() {
        return classRepository.findAll();
    }

    @Transactional
    public YogaClass add(YogaClass yogaClass) {
        yogaClass.setId(null);
        return classRepository.save(yogaClass);
    }

    @Transactional
    public YogaClass update(Long id, YogaClass yogaClass) {
        Optional<YogaClass> existingOpt = classRepository.findById(id);
        if (existingOpt.isEmpty()) {
            throw new IllegalArgumentException("YogaClass not found with id=" + id);
        }
        YogaClass existing = existingOpt.get();
        existing.setTitle(yogaClass.getTitle());
        existing.setDescription(yogaClass.getDescription());
        existing.setSchedule(yogaClass.getSchedule());
        existing.setCapacity(yogaClass.getCapacity());
        return classRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        if (!classRepository.existsById(id)) {
            throw new IllegalArgumentException("YogaClass not found with id=" + id);
        }
        classRepository.deleteById(id);
    }
}

