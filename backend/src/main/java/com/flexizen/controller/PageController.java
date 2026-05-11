package com.flexizen.controller;

import com.flexizen.model.PageContent;
import com.flexizen.service.PageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PageController {

    private final PageService pageService;

    @Autowired
    public PageController(PageService pageService) {
        this.pageService = pageService;
    }

    // USER: fetch CMS page content
    @GetMapping("/pages/{pageType}")
    public PageContent getPage(@PathVariable String pageType) {
        return pageService.getByType(pageType);
    }

    // ADMIN: update CMS content
    @PutMapping("/admin/pages/{pageType}")
    public ResponseEntity<PageContent> updatePage(
            @PathVariable String pageType,
            @RequestBody UpdatePageRequest req) {
        return ResponseEntity.status(HttpStatus.OK).body(pageService.update(pageType, req.getContent()));
    }

    public static class UpdatePageRequest {
        private String content;

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}

