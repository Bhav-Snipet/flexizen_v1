package com.flexizen.repository;

import com.flexizen.model.PageContent;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PageContentRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public PageContent findByPageType(String pageType) {
        List<PageContent> pages = entityManager.createQuery("SELECT p FROM PageContent p WHERE p.pageType = :pageType", PageContent.class)
                .setParameter("pageType", pageType)
                .getResultList();
        return pages.isEmpty() ? null : pages.get(0);
    }

    public void save(PageContent pageContent) {
        if (pageContent.getId() == null) {
            entityManager.persist(pageContent);
        } else {
            entityManager.merge(pageContent);
        }
    }
}
