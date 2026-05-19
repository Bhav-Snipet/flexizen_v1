-- ============================================================
-- FlexiZen — demo-data.sql
-- Seed & Mock Data: Admin, Classes, Users, Bookings, Enquiries.
-- ============================================================

-- ===== 1. SEED DEFAULT ADMIN =====
-- Username: admin | Password: admin123 (BCrypt hash)
INSERT INTO admin (username, password, name, email)
VALUES (
    'admin',
    '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iKat6Z5EHsM8lE9lBaUsl7iAt6Zu',
    'FlexiZen Admin',
    'admin@flexizen.com'
)
ON CONFLICT (username) DO NOTHING;


-- ===== 2. SEED YOGA CLASSES =====
INSERT INTO yoga_class (id, title, description, schedule, capacity, active) VALUES
(1, 'Morning Flow Yoga', 'A gentle morning yoga session to awaken the body and set a positive tone for the day. Suitable for all levels.', 'Mon / Wed / Fri — 7:00 AM to 8:00 AM', 20, TRUE),
(2, 'Power Vinyasa', 'A dynamic and energetic class linking breath with movement. Builds strength, flexibility, and focus.', 'Tue / Thu — 6:30 PM to 7:45 PM', 15, TRUE),
(3, 'Yin Yoga & Meditation', 'A slow-paced, restorative practice targeting deep connective tissues. Ends with a 15-minute guided meditation.', 'Sat / Sun — 9:00 AM to 10:30 AM', 18, TRUE),
(4, 'Beginner Hatha Yoga', 'Perfect for complete beginners. Focuses on foundational postures, breathing techniques, and body awareness.', 'Mon / Wed — 5:00 PM to 6:15 PM', 20, TRUE),
(5, 'Advanced Ashtanga', 'A rigorous, structured series for experienced practitioners. Requires prior yoga experience.', 'Tue / Thu / Sat — 7:00 AM to 8:30 AM', 12, TRUE)
ON CONFLICT (id) DO NOTHING;


-- ===== 3. SEED DUMMY VISITORS (APP USERS) =====
INSERT INTO app_user (id, name, phone, email) VALUES
(1, 'Aarav Sharma', '+91 98234 56789', 'aarav.sharma@example.com'),
(2, 'Emma Watson', '+1 415 555 2671', 'emma.watson@example.com'),
(3, 'Rohan Mehta', '+91 91234 56780', 'rohan.mehta@example.com'),
(4, 'Sophia Loren', '+39 02 5555 4321', 'sophia@example.com'),
(5, 'Kabir Malhotra', '+91 99887 76655', 'kabir@example.com')
ON CONFLICT (id) DO NOTHING;


-- ===== 4. SEED DUMMY BOOKINGS =====
INSERT INTO booking (id, booking_no, user_id, class_id, status, remark, created_at) VALUES
(1, 'FZ-20260001', 1, 1, 'APPROVED', 'Paid online via card.', CURRENT_TIMESTAMP - INTERVAL '5 days'),
(2, 'FZ-20260002', 2, 2, 'NEW', 'Requested front-row spot.', CURRENT_TIMESTAMP - INTERVAL '3 days'),
(3, 'FZ-20260003', 3, 3, 'APPROVED', 'Wants to focus on back pain relief.', CURRENT_TIMESTAMP - INTERVAL '2 days'),
(4, 'FZ-20260004', 4, 1, 'CANCELLED', 'User requested rescheduling.', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(5, 'FZ-20260005', 5, 4, 'NEW', 'First session ever.', CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;


-- ===== 5. SEED DUMMY ENQUIRIES =====
INSERT INTO enquiry (id, name, email, phone, session_id, session_title, message, read_status, created_at) VALUES
(1, 'Ananya Sen', 'ananya.sen@example.com', '+91 97766 55443', 1, 'Morning Flow Yoga', 'Hello, do you provide yoga mats for this morning session or should I bring my own?', FALSE, CURRENT_TIMESTAMP - INTERVAL '4 hours'),
(2, 'David Miller', 'david.miller@example.com', '+1 650 555 8192', NULL, NULL, 'Could you tell me if you offer corporate membership plans or monthly packages for local residents?', TRUE, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(3, 'Priya Patel', 'priya.patel@example.com', '+91 93322 11004', 3, 'Yin Yoga & Meditation', 'Hi, is this session recommended for someone recovering from a minor hamstring strain?', FALSE, CURRENT_TIMESTAMP - INTERVAL '3 hours'),
(4, 'James Anderson', 'james@example.com', NULL, 5, 'Advanced Ashtanga', 'I have practiced Hatha for 2 years. Would I be able to keep up with the pacing of this Advanced Ashtanga series?', TRUE, CURRENT_TIMESTAMP - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;


-- ===== 6. SEED PAGE CONTENT (CMS) =====
INSERT INTO page_content (id, page_type, content) VALUES
(
    1,
    'ABOUT',
    '<h2>About FlexiZen</h2>
<p>Welcome to FlexiZen — a sanctuary for mind, body, and spirit. Founded with a passion for holistic wellness, we offer a diverse range of yoga classes suitable for all experience levels.</p>
<p>Our certified instructors bring years of experience and a deep commitment to helping every student grow in their practice. Whether you are a complete beginner or an advanced yogi, FlexiZen has a class for you.</p>
<h3>Our Mission</h3>
<p>To make yoga accessible, enjoyable, and transformative for everyone — fostering a community built on mindfulness, compassion, and growth.</p>'
),
(
    2,
    'CONTACT',
    '<h2>Contact Us</h2>
<p><strong>Studio Address:</strong> 42, Serenity Lane, Koregaon Park, Pune — 411001, Maharashtra, India</p>
<p><strong>Phone:</strong> +91 98765 43210</p>
<p><strong>Email:</strong> hello@flexizen.com</p>
<p><strong>Studio Hours:</strong> Monday to Saturday — 6:00 AM to 8:00 PM | Sunday — 8:00 AM to 12:00 PM</p>
<p>Feel free to drop in for a trial class or reach out with any questions. We would love to have you join our community!</p>'
)
ON CONFLICT (page_type) DO NOTHING;


-- ===== 7. SEED NOTIFICATIONS =====
INSERT INTO notification (id, message, read_status, type, created_at) VALUES
(1, 'New booking FZ-20260005 received from Kabir Malhotra', FALSE, 'BOOKING', CURRENT_TIMESTAMP),
(2, 'New enquiry received from Ananya Sen (ananya.sen@example.com) for session ''Morning Flow Yoga''', FALSE, 'ENQUIRY', CURRENT_TIMESTAMP - INTERVAL '4 hours'),
(3, 'New enquiry received from Priya Patel (priya.patel@example.com) for session ''Yin Yoga & Meditation''', FALSE, 'ENQUIRY', CURRENT_TIMESTAMP - INTERVAL '3 hours'),
(4, 'New booking FZ-20260003 approved for Rohan Mehta', TRUE, 'BOOKING', CURRENT_TIMESTAMP - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- Reset PK sequences for auto-generation (PostgreSQL specific)
SELECT setval('admin_id_seq', (SELECT MAX(id) FROM admin));
SELECT setval('yoga_class_id_seq', (SELECT MAX(id) FROM yoga_class));
SELECT setval('app_user_id_seq', (SELECT MAX(id) FROM app_user));
SELECT setval('booking_id_seq', (SELECT MAX(id) FROM booking));
SELECT setval('enquiry_id_seq', (SELECT MAX(id) FROM enquiry));
SELECT setval('page_content_id_seq', (SELECT MAX(id) FROM page_content));
SELECT setval('notification_id_seq', (SELECT MAX(id) FROM notification));
