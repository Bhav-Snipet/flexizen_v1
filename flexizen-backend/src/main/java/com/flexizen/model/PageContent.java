package com.flexizen.model;

import jakarta.persistence.*;

@Entity
@Table(name = "page_content")
public class PageContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "page_type", nullable = false, unique = true, length = 20)
    private String pageType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    public PageContent() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPageType() { return pageType; }
    public void setPageType(String pageType) { this.pageType = pageType; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
