package com.flexizen.controller;

import com.flexizen.model.PageContent;
import com.flexizen.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PageController {

    @Autowired
    private PageService pageService;

    // Public API
    @GetMapping("/pages/{type}")
    public ResponseEntity<PageContent> getPage(@PathVariable String type) {
        PageContent content = pageService.getPageContent(type);
        if (content != null) {
            return ResponseEntity.ok(content);
        }
        // Return empty if not initialized
        PageContent empty = new PageContent();
        empty.setPageType(type.toUpperCase());
        empty.setContent("");
        return ResponseEntity.ok(empty);
    }

    // Admin API
    @PutMapping("/admin/pages/{type}")
    public ResponseEntity<PageContent> updatePage(@PathVariable String type, @RequestBody Map<String, String> payload) {
        String content = payload.get("content");
        return ResponseEntity.ok(pageService.updatePageContent(type, content));
    }
}
