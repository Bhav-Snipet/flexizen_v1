package com.flexizen.controller;

import com.flexizen.model.YogaClass;
import com.flexizen.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ClassController {

    @Autowired
    private ClassService classService;

    // Public Endpoint
    @GetMapping("/classes")
    public ResponseEntity<List<YogaClass>> getActiveClasses() {
        return ResponseEntity.ok(classService.getActiveClasses());
    }

    // Admin Endpoints
    @GetMapping("/admin/classes")
    public ResponseEntity<List<YogaClass>> getAllClasses() {
        return ResponseEntity.ok(classService.getAllClasses());
    }

    @PostMapping("/admin/classes")
    public ResponseEntity<YogaClass> createClass(@RequestBody YogaClass yogaClass) {
        return ResponseEntity.ok(classService.saveClass(yogaClass));
    }

    @PutMapping("/admin/classes/{id}")
    public ResponseEntity<YogaClass> updateClass(@PathVariable Long id, @RequestBody YogaClass yogaClassDetails) {
        YogaClass existingClass = classService.getClassById(id);
        if (existingClass == null) {
            return ResponseEntity.notFound().build();
        }
        
        existingClass.setTitle(yogaClassDetails.getTitle());
        existingClass.setDescription(yogaClassDetails.getDescription());
        existingClass.setSchedule(yogaClassDetails.getSchedule());
        existingClass.setCapacity(yogaClassDetails.getCapacity());
        existingClass.setActive(yogaClassDetails.getActive());
        
        return ResponseEntity.ok(classService.saveClass(existingClass));
    }

    @DeleteMapping("/admin/classes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}
