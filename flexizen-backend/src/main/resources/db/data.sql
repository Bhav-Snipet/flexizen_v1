-- ============================================================
-- FlexiZen — data.sql
-- Seed data: default admin user + sample yoga classes + CMS pages
-- BCrypt hash below is for password: admin123
-- ============================================================

-- ===== DEFAULT ADMIN USER =====
-- Username: admin | Password: admin123 (BCrypt strength 10)
INSERT INTO admin (username, password, name, email)
VALUES (
    'admin',
    '$2a$10$5BXG8vDSUC2NkZC9yjuRkevgUti8oc01Y9Vb2U8Vdm8Nb0auBppiW',
    'FlexiZen Admin',
    'admin@flexizen.com'
)
ON CONFLICT (username) DO NOTHING;

-- ===== SAMPLE YOGA CLASSES =====
INSERT INTO yoga_class (title, description, schedule, capacity, active) VALUES
(
    'Morning Flow Yoga',
    'A gentle morning yoga session to awaken the body and set a positive tone for the day. Suitable for all levels.',
    'Mon / Wed / Fri — 7:00 AM to 8:00 AM',
    20,
    TRUE
),
(
    'Power Vinyasa',
    'A dynamic and energetic class linking breath with movement. Builds strength, flexibility, and focus.',
    'Tue / Thu — 6:30 PM to 7:45 PM',
    15,
    TRUE
),
(
    'Yin Yoga & Meditation',
    'A slow-paced, restorative practice targeting deep connective tissues. Ends with a 15-minute guided meditation.',
    'Sat / Sun — 9:00 AM to 10:30 AM',
    18,
    TRUE
),
(
    'Beginner Hatha Yoga',
    'Perfect for complete beginners. Focuses on foundational postures, breathing techniques, and body awareness.',
    'Mon / Wed — 5:00 PM to 6:15 PM',
    20,
    TRUE
),
(
    'Advanced Ashtanga',
    'A rigorous, structured series for experienced practitioners. Requires prior yoga experience.',
    'Tue / Thu / Sat — 7:00 AM to 8:30 AM',
    12,
    TRUE
)
ON CONFLICT DO NOTHING;

-- ===== PAGE CONTENT (CMS) =====
INSERT INTO page_content (page_type, content) VALUES
(
    'ABOUT',
    '<h2>About FlexiZen</h2>
<p>Welcome to FlexiZen — a sanctuary for mind, body, and spirit. Founded with a passion for holistic wellness, we offer a diverse range of yoga classes suitable for all experience levels.</p>
<p>Our certified instructors bring years of experience and a deep commitment to helping every student grow in their practice. Whether you are a complete beginner or an advanced yogi, FlexiZen has a class for you.</p>
<h3>Our Mission</h3>
<p>To make yoga accessible, enjoyable, and transformative for everyone — fostering a community built on mindfulness, compassion, and growth.</p>'
),
(
    'CONTACT',
    '<h2>Contact Us</h2>
<p><strong>Studio Address:</strong> 42, Serenity Lane, Koregaon Park, Pune — 411001, Maharashtra, India</p>
<p><strong>Phone:</strong> +91 98765 43210</p>
<p><strong>Email:</strong> hello@flexizen.com</p>
<p><strong>Studio Hours:</strong> Monday to Saturday — 6:00 AM to 8:00 PM | Sunday — 8:00 AM to 12:00 PM</p>
<p>Feel free to drop in for a trial class or reach out with any questions. We would love to have you join our community!</p>'
)
ON CONFLICT (page_type) DO NOTHING;
