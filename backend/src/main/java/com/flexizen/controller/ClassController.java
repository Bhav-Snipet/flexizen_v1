package com.flexizen.controller;

import com.flexizen.model.YogaClass;
import com.flexizen.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClassController {

    private final ClassService classService;

    @Autowired
    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    // User side: list classes (no auth needed - spring-security.xml permits all /** right now)
    @GetMapping("/classes")
    public List<YogaClass> listClasses() {
        return classService.getAll();
    }

    // Admin side: manage classes
    @PostMapping("/admin/classes")
    public ResponseEntity<YogaClass> addClass(@RequestBody YogaClass yogaClass) {
        return ResponseEntity.status(HttpStatus.CREATED).body(classService.add(yogaClass));
    }

    @PutMapping("/admin/classes/{id}")
    public YogaClass updateClass(@PathVariable Long id, @RequestBody YogaClass yogaClass) {
        return classService.update(id, yogaClass);
    }

    @DeleteMapping("/admin/classes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClass(@PathVariable Long id) {
        classService.delete(id);
    }
}

