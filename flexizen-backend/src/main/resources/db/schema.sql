-- ============================================================
-- FlexiZen — schema.sql
-- PostgreSQL schema for all application tables.
-- Run this ONCE before starting the application.
-- ============================================================

-- Create database (run manually if needed):
-- CREATE DATABASE flexizen;

-- ===== ADMIN =====
CREATE TABLE IF NOT EXISTS admin (
    id       BIGSERIAL    PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- BCrypt hash
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE
);

-- ===== YOGA CLASS =====
CREATE TABLE IF NOT EXISTS yoga_class (
    id          BIGSERIAL     PRIMARY KEY,
    title       VARCHAR(150)  NOT NULL,
    description TEXT,
    schedule    VARCHAR(200)  NOT NULL,  -- e.g. "Mon/Wed/Fri 7:00 AM"
    capacity    INT           NOT NULL DEFAULT 20,
    active      BOOLEAN       NOT NULL DEFAULT TRUE
);

-- ===== APP USER (no registration — just name + phone for booking) =====
CREATE TABLE IF NOT EXISTS app_user (
    id    BIGSERIAL    PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    phone VARCHAR(20)  NOT NULL,
    email VARCHAR(100)
);

-- ===== BOOKING =====
CREATE TABLE IF NOT EXISTS booking (
    id          BIGSERIAL    PRIMARY KEY,
    booking_no  VARCHAR(20)  NOT NULL UNIQUE,    -- auto-generated, e.g. FZ-20240001
    user_id     BIGINT       NOT NULL REFERENCES app_user(id),
    class_id    BIGINT       NOT NULL REFERENCES yoga_class(id),
    status      VARCHAR(20)  NOT NULL DEFAULT 'NEW',  -- NEW | APPROVED | CANCELLED
    remark      TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===== ENQUIRY =====
CREATE TABLE IF NOT EXISTS enquiry (
    id          BIGSERIAL    PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    message     TEXT         NOT NULL,
    read_status BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===== PAGE CONTENT (CMS — About Us / Contact Us) =====
CREATE TABLE IF NOT EXISTS page_content (
    id        BIGSERIAL    PRIMARY KEY,
    page_type VARCHAR(20)  NOT NULL UNIQUE,  -- ABOUT | CONTACT
    content   TEXT         NOT NULL
);

-- ===== Indexes for common queries =====
CREATE INDEX IF NOT EXISTS idx_booking_status    ON booking(status);
CREATE INDEX IF NOT EXISTS idx_booking_no        ON booking(booking_no);
CREATE INDEX IF NOT EXISTS idx_booking_created   ON booking(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiry_read      ON enquiry(read_status);
CREATE INDEX IF NOT EXISTS idx_yoga_class_active ON yoga_class(active);
