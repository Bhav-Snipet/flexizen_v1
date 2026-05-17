package com.flexizen.service;

import com.flexizen.model.PageContent;
import com.flexizen.repository.PageContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PageService {

    @Autowired
    private PageContentRepository pageContentRepository;

    public PageContent getPageContent(String pageType) {
        return pageContentRepository.findByPageType(pageType.toUpperCase());
    }

    public PageContent updatePageContent(String pageType, String content) {
        String type = pageType.toUpperCase();
        PageContent page = pageContentRepository.findByPageType(type);
        if (page == null) {
            page = new PageContent();
            page.setPageType(type);
        }
        page.setContent(content);
        pageContentRepository.save(page);
        return page;
    }
}
