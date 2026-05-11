# FlexiZen Implementation TODO

## Phase 1 — Project Setup & Foundation (Week 1)
- [ ] Update `backend/pom.xml` with required dependencies (Spring MVC, Spring Security, JPA/Hibernate, PostgreSQL, Jackson).
- [ ] Replace archetype `backend/src/main/webapp/WEB-INF/web.xml` with DispatcherServlet + ContextLoaderListener + Spring Security filter chain.
- [ ] Create `backend/src/main/resources/applicationContext.xml` (DataSource, EntityManagerFactory, TxManager, BCryptPasswordEncoder).
- [ ] Create `backend/src/main/resources/spring-mvc.xml` (component scan, Jackson message converter, CORS, static resources).
- [ ] Create `backend/src/main/resources/spring-security.xml` (HTTP security rules, login/logout, CSRF, session settings, ROLE_ADMIN intercept).
- [ ] Create/verify `backend/src/main/resources/META-INF/persistence.xml` (PersistenceUnit + Hibernate dialect + DDL mode).
- [ ] Add `backend/src/main/resources/schema.sql` and `backend/src/main/resources/data.sql`.
- [x] Run `mvn package` in `backend/` to verify build.

## Phase 2 — Authentication & Session Security (Week 2)
- [ ] Verify `Admin` entity, seed admin in `data.sql`.
- [ ] Verify `spring-security.xml` mappings.
- [ ] Verify `/login` UI endpoint and session behavior.

## Phase 3 — Class Management Module (Week 3)
- [x] `ClassRepository`
- [x] `ClassService`
- [x] `ClassController`

## Phase 4 — Booking Module (Week 4)
- [ ] Add `BookingRepository`
- [ ] Add `BookingService`
- [x] Add `BookingController` REST endpoints
- [x] Add user-side booking endpoint (create)
- [x] Add admin endpoints (approve/cancel/remark/status queries by tab)


