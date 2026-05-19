-- ============================================================
-- FlexiZen — demo-schema.sql
-- Database creation schema for PostgreSQL.
-- Execute this script to set up all required application tables.
-- ============================================================

-- ===== 1. ADMIN USER TABLE =====
CREATE TABLE IF NOT EXISTS admin (
    id       BIGSERIAL    PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- BCrypt hash
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE
);

-- ===== 2. YOGA CLASS TABLE =====
CREATE TABLE IF NOT EXISTS yoga_class (
    id          BIGSERIAL     PRIMARY KEY,
    title       VARCHAR(150)  NOT NULL,
    description TEXT,
    schedule    VARCHAR(200)  NOT NULL,
    capacity    INT           NOT NULL DEFAULT 20,
    active      BOOLEAN       NOT NULL DEFAULT TRUE
);

-- ===== 3. VISITOR USER DETAILS TABLE =====
CREATE TABLE IF NOT EXISTS app_user (
    id    BIGSERIAL    PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    phone VARCHAR(20)  NOT NULL,
    email VARCHAR(100)
);

-- ===== 4. CLASS BOOKINGS TABLE =====
CREATE TABLE IF NOT EXISTS booking (
    id          BIGSERIAL    PRIMARY KEY,
    booking_no  VARCHAR(20)  NOT NULL UNIQUE,
    user_id     BIGINT       NOT NULL REFERENCES app_user(id),
    class_id    BIGINT       NOT NULL REFERENCES yoga_class(id),
    status      VARCHAR(20)  NOT NULL DEFAULT 'NEW',  -- NEW | APPROVED | CANCELLED
    remark      TEXT,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===== 5. GENERAL & SESSION ENQUIRIES TABLE =====
CREATE TABLE IF NOT EXISTS enquiry (
    id            BIGSERIAL    PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL,
    phone         VARCHAR(20),
    session_id    BIGINT,
    session_title VARCHAR(150),
    message       TEXT         NOT NULL,
    read_status   BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===== 6. PAGE CONTENT (CMS) TABLE =====
CREATE TABLE IF NOT EXISTS page_content (
    id        BIGSERIAL    PRIMARY KEY,
    page_type VARCHAR(20)  NOT NULL UNIQUE,  -- ABOUT | CONTACT
    content   TEXT         NOT NULL
);

-- ===== 7. IN-APP NOTIFICATIONS TABLE =====
CREATE TABLE IF NOT EXISTS notification (
    id          BIGSERIAL    PRIMARY KEY,
    message     VARCHAR(255) NOT NULL,
    read_status BOOLEAN      NOT NULL DEFAULT FALSE,
    type        VARCHAR(50)  NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===== INDEXES FOR QUERY OPTIMIZATION =====
CREATE INDEX IF NOT EXISTS idx_booking_status     ON booking(status);
CREATE INDEX IF NOT EXISTS idx_booking_no         ON booking(booking_no);
CREATE INDEX IF NOT EXISTS idx_booking_created    ON booking(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiry_read       ON enquiry(read_status);
CREATE INDEX IF NOT EXISTS idx_yoga_class_active  ON yoga_class(active);
CREATE INDEX IF NOT EXISTS idx_notification_read  ON notification(read_status);
