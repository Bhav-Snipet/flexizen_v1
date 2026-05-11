-- Seed admin and example content

-- NOTE: password should be BCrypt hashed. This placeholder uses a commonly used bcrypt hash.
-- Replace it in real usage.
INSERT INTO admin (username, password, email)
VALUES ('admin', '$2a$10$DowJonesQyYxY0Vw7cCzW9e.7g6xG1K4vHf9x0yWbF9v1aJ9pXxjJq', 'admin@flexizen.local')
ON CONFLICT (username) DO NOTHING;

INSERT INTO page_content (page_type, content)
VALUES ('ABOUT', 'FlexiZen is a digital yoga registration and scheduling portal.\n\nBreathe. Move. Relax.' )
ON CONFLICT (page_type) DO NOTHING;

INSERT INTO page_content (page_type, content)
VALUES ('CONTACT', 'Contact us at contact@flexizen.local')
ON CONFLICT (page_type) DO NOTHING;

