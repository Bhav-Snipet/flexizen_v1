# FlexiZen – Digital Yoga Registration & Scheduling System
> Project Documentation — v1.0

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Application Flow](#2-application-flow)
3. [Tech Stack](#3-tech-stack)
4. [Project Requirements](#4-project-requirements)
5. [File Structure](#5-file-structure)
6. [Project Phases](#6-project-phases)
7. [Future Scope (v2)](#7-future-scope-v2)

---

## 1. Project Overview

**Project Name:** FlexiZen – Digital Yoga Registration & Scheduling System

FlexiZen is a web-based platform that allows users to explore available yoga classes and book sessions online without registration. It provides a dedicated admin panel for managing classes, bookings, enquiries, reports, and website content. The application follows a controller-first MVC flow: the frontend view calls the controller, and any business action is passed from the controller to the service layer and then to the repository/database.

The system has two modules:
- **Admin** — authenticated, manages all backend operations
- **User** — no login required, browses and books classes


---

## 2. Application Flow

FlexiZen follows a standard MVC-based request flow for both the user and admin modules.

### 2.1 Common Request Flow
1. The user or admin opens a page in the frontend view.
2. The view sends the request to the relevant controller.
3. The controller handles request mapping, validation, and response preparation.
4. If the request is only for displaying data, the controller returns the required view or JSON response.
5. If the request performs an action, the controller forwards the work to the service layer.
6. The service layer contains the business logic and coordinates with the repository layer.
7. The repository layer communicates with the database.
8. The service returns the result to the controller, and the controller updates the view or sends the API response.

### 2.2 Example Flows
- **User flow:** Home / Classes page → `UserController` → `UserService` → `ClassRepository` → view update
- **Admin flow:** Dashboard / Manage Bookings page → `BookingController` / `AdminController` → `BookingService` / `AdminService` → repository → updated admin view

This makes the application flow clear: **Controller → View → Action → Controller → Service → Repository → Database → View**.


---

## 3. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Language | Java 17 | Backend language |
| Framework | Spring MVC | Strict Spring MVC — no Spring Boot |
| ORM | JPA / Hibernate | Entities used directly — no DTO pattern |
| Config Style | XML-based | web.xml, applicationContext.xml, spring-mvc.xml, spring-security.xml |
| Database | PostgreSQL | JDBC Driver version 42.7.8 in pom.xml |
| Server | Apache Tomcat 10 | WAR deployment |
| Security | Spring Security | Session-based authentication, BCrypt, role-based access |
| Frontend | React + Vite | Component-based SPA |
| Styling | Tailwind CSS | Utility-first CSS framework |
| API | REST API | JSON responses via Jackson |
| Version Control | Git / GitHub | Two repos: backend + frontend |
| Email / Notifications | — | Planned for v2 only |

### Notes on Stack Decisions

- `42.7.8` is the **PostgreSQL JDBC driver version** (pom.xml dependency), not the PostgreSQL server version. The server version (16.x or similar) is installed separately.
- Session-based auth means Spring Security manages sessions server-side. React communicates via Axios with `withCredentials: true` to send the `JSESSIONID` cookie.
- No DTO means `@Entity` model classes are serialized directly to JSON via Jackson. `@JsonIgnore` must be applied on lazy-loaded JPA relationships to avoid `LazyInitializationException`.
- XML-based config means no `@Configuration` Java classes — all beans, security rules, datasource, and MVC setup are declared in XML files.

---

## 4. Project Requirements

### 3.1 Admin Module

The admin must log in with a username and password. Once authenticated, the admin can access all sections below.

#### Profile
- Update profile details (name, email)
- Change password (current password validation required)
- Logout

#### Dashboard
View at a glance:
- Total new bookings
- Total approved bookings
- Total cancelled bookings
- Total bookings (all time)
- Total read enquiries
- Total unread enquiries
- Total enquiries
- Total active classes

#### Classes
- Add a new yoga class (title, description, schedule, capacity)
- Update an existing class
- Delete a class

#### Pages
- Edit the **About Us** page content
- Edit the **Contact Us** page content (CMS-style, stored in database)

#### Bookings
- View bookings by status: New / Approved / Cancelled
- Approve a new booking
- Cancel a booking
- Add a remark to any booking

#### Reports
- View enquiry details report
- View booking details report filtered by a date range (from date → to date)

#### Enquiry
- View all enquiries
- Mark enquiry as read
- Delete an enquiry

#### Search
- Search for a booking using its booking number

---

### 3.2 User Module

Users do not need to register or log in.

#### Home
- View the FlexiZen portal landing page
- See featured/available yoga classes and schedules

#### Classes
- View full list of available yoga classes with details
- Book a session by providing name and phone number (no account needed)
- Each booking generates a unique booking number for reference

#### About Us
- View the About Us page (content managed by admin)

#### Contact Us
- View contact details
- Submit an enquiry (name, email, message) to the admin

---

### 3.3 Business Rules

- A user does not need to register to book a class.
- Each booking generates a unique booking number upon creation.
- Booking status flow: `NEW` → `APPROVED` or `CANCELLED`. Only admin can change status.
- An enquiry is marked `UNREAD` by default; admin can mark it `READ`.
- Admin is the only user type with a login account.
- Passwords are stored using BCrypt hashing — never plain text.
- Session expires after inactivity (timeout configurable in `web.xml`).

---

### 3.4 Security Requirements

| Requirement | Implementation |
|---|---|
| Admin authentication | Spring Security session-based login |
| Password hashing | BCryptPasswordEncoder bean |
| Role-based access | `ROLE_ADMIN` guards `/api/admin/**` via `intercept-url` in `spring-security.xml` |
| CSRF protection | Configured in `spring-security.xml` (disable for REST or use token) |
| Session fixation | Protection enabled in Spring Security |
| CORS | Configured in `spring-mvc.xml` — allows React dev server origin |
| Frontend route guard | `AuthContext` + `PrivateRoute` + `AdminRoute` in React |
| Unauthorized access | Redirected to `/login` by React router guards |

---

## 5. File Structure

### 4.1 Backend — `flexizen-backend/` (Maven WAR)

```
flexizen-backend/
├── src/
│   └── main/
│       ├── java/com/flexizen/
│       │   │
│       │   ├── controller/
│       │   │   ├── AdminController.java         # handles admin actions; calls service layer
│       │   │   ├── BookingController.java        # handles booking actions via service layer
│       │   │   ├── ClassController.java          # handles class actions via service layer
│       │   │   ├── EnquiryController.java        # handles enquiry actions via service layer
│       │   │   ├── PageController.java           # serves CMS views and updates via service layer
│       │   │   ├── ReportController.java         # serves report views and filtering via service layer
│       │   │   ├── SearchController.java         # search endpoint handled through service layer
│       │   │   └── UserController.java           # serves user views and booking actions via service layer
│       │   │
│       │   ├── model/                            # @Entity classes — no DTO
│       │   │   ├── Admin.java                    # id, username, password (BCrypt), email
│       │   │   ├── Booking.java                  # bookingNo, user, class, status, remark
│       │   │   ├── Enquiry.java                  # name, email, message, readStatus, date
│       │   │   ├── PageContent.java              # pageType (ABOUT/CONTACT), content
│       │   │   ├── User.java                     # name, phone, email (no registration)
│       │   │   └── YogaClass.java                # title, description, schedule, capacity
│       │   │
│       │   ├── repository/                       # JPA Repositories
│       │   │   ├── AdminRepository.java          # findByUsername for auth
│       │   │   ├── BookingRepository.java        # findByStatus, findByBookingNo, findByDateRange
│       │   │   ├── ClassRepository.java          # findAll, findActive
│       │   │   ├── EnquiryRepository.java        # findByReadStatus, countUnread
│       │   │   └── PageContentRepository.java    # findByPageType
│       │   │
│       │   ├── service/
│       │   │   ├── AdminService.java             # updateProfile, changePassword
│       │   │   ├── BookingService.java           # create, approve, cancel, addRemark
│       │   │   ├── ClassService.java             # add, update, delete, getAll
│       │   │   ├── EnquiryService.java           # getAll, markRead, delete, getCounts
│       │   │   ├── PageService.java              # getByType, updateContent
│       │   │   ├── ReportService.java            # bookingReport(from, to), enquiryReport
│       │   │   └── UserService.java              # getClasses, bookClass, submitEnquiry
│       │   │
│       │   └── security/
│       │       ├── CustomUserDetailsService.java # loads Admin by username → UserDetails
│       │       └── SecurityUtil.java             # helper to get logged-in admin info
│       │
│       ├── resources/
│       │   └── db/
│       │       ├── schema.sql                    # CREATE TABLE scripts for PostgreSQL
│       │       └── data.sql                      # seed admin user + sample classes
│       │
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml                       # DispatcherServlet, SecurityFilter, ContextLoader
│           │   ├── applicationContext.xml         # DataSource, EMF, TxManager, BCrypt bean
│           │   ├── spring-mvc.xml                # Component scan, Jackson, CORS, static resources
│           │   └── spring-security.xml           # http rules, intercept-url, login, logout, CSRF
│           └── META-INF/
│               └── persistence.xml               # PersistenceUnit, Hibernate dialect, DDL mode
│
└── pom.xml                                       # Spring MVC, Spring Security, JPA, PostgreSQL, Jackson
```

---

### 4.2 Frontend — `flexizen-frontend/` (React + Vite)

```
flexizen-frontend/
├── public/
│   ├── logo.svg
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   ├── images/                               # hero image, yoga illustrations
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx                        # user-facing top navigation
│   │   │   ├── Footer.jsx
│   │   │   └── Loader.jsx                        # spinner for API loading states
│   │   ├── admin/
│   │   │   ├── AdminSidebar.jsx                  # nav links for all admin sections
│   │   │   ├── AdminHeader.jsx                   # topbar with admin name + logout
│   │   │   └── StatCard.jsx                      # reusable dashboard counter card
│   │   └── user/
│   │       ├── ClassCard.jsx                     # displays single yoga class tile
│   │       └── BookingForm.jsx                   # name, phone, class picker → POST
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx                     # total bookings, enquiries counters
│   │   │   ├── ManageClasses.jsx                 # add / edit / delete classes table
│   │   │   ├── ManageBookings.jsx                # tabs: new / approved / cancelled
│   │   │   ├── ManagePages.jsx                   # edit About Us + Contact Us content
│   │   │   ├── Reports.jsx                       # date-range picker → booking report
│   │   │   ├── Enquiry.jsx                       # inbox view, mark read, delete
│   │   │   ├── SearchBooking.jsx                 # search by booking number
│   │   │   └── AdminProfile.jsx                  # update profile + change password
│   │   ├── user/
│   │   │   ├── Home.jsx                          # hero + featured classes
│   │   │   ├── Classes.jsx                       # full class listing + book button
│   │   │   ├── AboutUs.jsx                       # CMS content from admin
│   │   │   └── ContactUs.jsx                     # enquiry form + contact info
│   │   └── Login.jsx                             # admin-only login page
│   │
│   ├── context/
│   │   └── AuthContext.jsx                       # stores admin session, exposes login/logout
│   │
│   ├── routes/
│   │   ├── PrivateRoute.jsx                      # redirects to /login if not authenticated
│   │   └── AdminRoute.jsx                        # checks ROLE_ADMIN, else 403
│   │
│   ├── services/
│   │   ├── api.js                                # Axios instance — base URL + withCredentials
│   │   ├── authService.js                        # login(), logout(), getProfile()
│   │   ├── bookingService.js                     # create, approve, cancel, search, report
│   │   ├── classService.js                       # getAll, add, update, delete
│   │   └── enquiryService.js                     # getAll, markRead, delete, submit
│   │
│   ├── App.jsx                                   # React Router — all route definitions
│   └── main.jsx                                  # renders App into #root, wraps AuthContext
│
├── vite.config.js                                # proxy /api → http://localhost:8080 for dev
├── tailwind.config.js
└── package.json
```

---

## 6. Project Phases

### Phase 1 — Project Setup & Foundation
**Timeline:** Week 1

**Backend:**
- Create Maven WAR project
- Write `pom.xml` with all dependencies (Spring MVC, Spring Security, JPA, Hibernate, PostgreSQL JDBC driver, Jackson)
- Create `web.xml` — DispatcherServlet, ContextLoaderListener, Spring Security filter chain
- Create `applicationContext.xml` — DataSource, EntityManagerFactory, TransactionManager, BCryptPasswordEncoder bean
- Create `spring-mvc.xml` — component scan, Jackson bean, CORS configuration
- Create `spring-security.xml` — HTTP security rules, session config
- Create `persistence.xml` — PersistenceUnit, Hibernate PostgreSQL dialect, DDL mode
- Write `schema.sql` and `data.sql`

**Frontend:**
- Initialise React + Vite project
- Install and configure Tailwind CSS
- Create full folder structure
- Set up `vite.config.js` with proxy for `/api`

**Goal:** Backend starts up on Tomcat without errors. Frontend dev server runs. Basic connectivity verified.

---

### Phase 2 — Authentication & Session Security
**Timeline:** Week 2

**Backend:**
- `Admin.java` entity with BCrypt hashed password field
- `AdminRepository.java` with `findByUsername`
- `CustomUserDetailsService.java` implementing `UserDetailsService`
- Full `spring-security.xml` — login endpoint, logout, session fixation protection, role intercepts
- `SecurityUtil.java` helper

**Frontend:**
- `Login.jsx` — admin login form
- `AuthContext.jsx` — session state management
- `PrivateRoute.jsx` — redirect to `/login` if unauthenticated
- `AdminRoute.jsx` — role check
- `AdminSidebar.jsx` and `AdminHeader.jsx` with logout

**Goal:** Admin can log in, session is maintained, protected routes redirect unauthenticated users.

---

### Phase 3 — Class Management Module
**Timeline:** Week 3

**Backend:**
- `YogaClass.java` entity
- `ClassRepository.java`
- `ClassService.java` — add, update, delete, getAll, findActive
- `ClassController.java` — REST endpoints

**Frontend:**
- `ManageClasses.jsx` — admin table with add/edit/delete
- `Classes.jsx` — user-facing class listing
- `ClassCard.jsx` — reusable class tile component

**Goal:** Admin can manage classes. Users can view all available classes.

---

### Phase 4 — Booking Module
**Timeline:** Week 4

**Backend:**
- `User.java` entity (name, phone — no login)
- `Booking.java` entity with auto-generated booking number, status enum (`NEW`, `APPROVED`, `CANCELLED`)
- `BookingRepository.java` — findByStatus, findByBookingNo, findByDateRange
- `BookingService.java` — create, approve, cancel, addRemark
- `BookingController.java` — REST endpoints

**Frontend:**
- `BookingForm.jsx` — user books a class (name + phone)
- `ManageBookings.jsx` — admin view with tabs (New / Approved / Cancelled)
- Approve, cancel, remark actions per booking

**Goal:** Users can book a session and receive a booking number. Admin can manage all bookings.

---

### Phase 5 — Enquiry & Pages Module
**Timeline:** Week 5

**Backend:**
- `Enquiry.java` entity — name, email, message, readStatus, createdAt
- `PageContent.java` entity — pageType (ABOUT / CONTACT), content text
- `EnquiryService.java` + `EnquiryController.java`
- `PageService.java` + `PageController.java`

**Frontend:**
- `ContactUs.jsx` — user enquiry form
- `Enquiry.jsx` — admin inbox (view, mark read, delete)
- `ManagePages.jsx` — admin edits About Us and Contact Us content
- `AboutUs.jsx` — renders CMS content from API

**Goal:** Users can submit enquiries. Admin can manage enquiries and edit page content.

---

### Phase 6 — Reports, Search & Dashboard
**Timeline:** Week 6

**Backend:**
- `ReportService.java` — bookingReport(fromDate, toDate), enquiryReport
- `ReportController.java` — REST endpoints
- `SearchController.java` — findByBookingNo
- `AdminService.java` — updateProfile, changePassword
- `AdminController.java` dashboard counts endpoint

**Frontend:**
- `Dashboard.jsx` — counters for bookings, enquiries, classes
- `StatCard.jsx` — reusable stat counter component
- `Reports.jsx` — date-range picker, report table
- `SearchBooking.jsx` — search input, result display
- `AdminProfile.jsx` — update profile + change password form

**Goal:** Admin dashboard fully functional. Reports filterable by date. Profile management complete.

---

### Phase 7 — Integration, Testing & Deployment
**Timeline:** Week 7

- Full frontend-backend integration testing
- Verify CORS headers + `JSESSIONID` cookie flow with `withCredentials: true`
- Test all role-based access scenarios
- Test complete booking flow end-to-end
- Fix any bugs or edge cases
- Build React production dist (`npm run build`)
- Package backend as WAR and deploy to Tomcat 10
- Final smoke testing on deployed environment

**Goal:** FlexiZen v1 fully deployed and working end-to-end.

---

## 7. Future Scope (v2)

The following features are explicitly **out of scope for v1** and planned for a future version:

| Feature | Description |
|---|---|
| Booking confirmation email | Send email to user after booking is created using JavaMail / Spring Mail |
| Booking status email | Notify user when booking is approved or cancelled |
| Enquiry reply email | Admin can reply to enquiries directly via email |
| Admin alert notifications | Notify admin when a new booking or enquiry is received |
| In-app notifications | Notification bell in admin panel for new activity |

---

*Document last updated: May 2026*
*Project: FlexiZen v1 — Digital Yoga Registration & Scheduling System*
