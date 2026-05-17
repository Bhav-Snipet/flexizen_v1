package com.flexizen.service;

import com.flexizen.model.YogaClass;
import com.flexizen.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<YogaClass> getAllClasses() {
        return classRepository.findAll();
    }

    public List<YogaClass> getActiveClasses() {
        return classRepository.findActive();
    }
    
    public YogaClass getClassById(Long id) {
        return classRepository.findById(id);
    }

    public YogaClass saveClass(YogaClass yogaClass) {
        classRepository.save(yogaClass);
        return yogaClass; // Object will have ID set by Hibernate
    }

    public void deleteClass(Long id) {
        YogaClass yogaClass = classRepository.findById(id);
        if (yogaClass != null) {
            classRepository.delete(yogaClass);
        }
    }
}
