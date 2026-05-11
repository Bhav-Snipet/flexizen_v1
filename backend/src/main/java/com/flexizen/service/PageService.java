package com.flexizen.service;

import com.flexizen.model.PageContent;
import com.flexizen.repository.PageContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PageService {

    private final PageContentRepository pageContentRepository;

    @Autowired
    public PageService(PageContentRepository pageContentRepository) {
        this.pageContentRepository = pageContentRepository;
    }

    @Transactional(readOnly = true)
    public PageContent getByType(String pageType) {
        return pageContentRepository.findByPageType(pageType)
                .orElseThrow(() -> new IllegalArgumentException("Page content not found for pageType=" + pageType));
    }

    @Transactional
    public PageContent update(String pageType, String content) {
        PageContent page = pageContentRepository.findByPageType(pageType)
                .orElseThrow(() -> new IllegalArgumentException("Page content not found for pageType=" + pageType));

        page.setContent(content);
        return pageContentRepository.save(page);
    }
}

