# FlexiZen - Digital Yoga Studio Booking & Registration System

FlexiZen is a premium, modern digital booking and registration platform built for boutique yoga studios. It enables visitors to browse active yoga sessions, submit detailed enquiries with custom class contexts, and allows studio administrators to manage schedules, view notifications, track bookings, and reply directly to visitors via an integrated administrative interface.

---

## 🌟 Key Features

### User Facing (Client App)
*   **Active Classes Directory:** Filter and view real-time scheduled classes, including seat availability, descriptions, and class times.
*   **Dynamic Enquiry Form:** Visitors can choose a target yoga class, input contact details (name, email, phone), and write notes/questions.
*   **Responsive Modern UI:** Curated color palette, sleek glassmorphic containers, smooth interactive transitions, and responsive typography.

### Administrative Console (Admin Dashboard)
*   **In-App Notification Hub:** Real-time logging of new visitor enquiries and booking alerts.
*   **Session Management (CRUD):** Create, update, toggle visibility, and delete yoga classes.
*   **Enquiry Workflow:** Review incoming enquiries, mark them read/unread, and reply directly from the dashboard via a built-in email composing modal.
*   **Content Management System (CMS):** Dynamically manage and edit public page content like "About Us" and "Contact Info".
*   **Statistical Analytics Reports:** Simple charts and counters representing active classes, total bookings, read vs. unread enquiries, and seat utilization.

---

## 🛠️ Technology Stack

### Backend Architecture
*   **Language:** Java 17 (JDK 17)
*   **Frameworks:** Spring Framework 6.x (Spring MVC, Spring Security, Spring Data JPA)
*   **Persistence:** Hibernate 6.x (JPA 3.1 Specification)
*   **Database:** PostgreSQL 17
*   **Connection Pool:** HikariCP
*   **Application Server:** Apache Tomcat 11.x (listening on port `8085`)

### Frontend Architecture
*   **Framework:** React 18 (with Vite)
*   **Styling:** Tailwind CSS & Vanilla CSS Transitions
*   **Icons:** Lucide React
*   **HTTP Client:** Axios (configured with automated cookies/credentials transfer)

---

## 🚀 Getting Started

### 1. Database Setup
1.  Ensure a PostgreSQL instance is running on your machine.
2.  Connect to your PostgreSQL server and create a new database named `flexizen`:
    ```sql
    CREATE DATABASE flexizen;
    ```
3.  Execute the database scripts located in the backend resources:
    *   First, run the schema definitions in:
        `flexizen-backend/src/main/resources/db/schema.sql`
    *   Next, populate initial seed records (admin accounts, CMS metadata, default classes) from:
        `flexizen-backend/src/main/resources/db/data.sql`

### 2. Backend Installation & Deployment
1.  Open the backend database configuration:
    `flexizen-backend/src/main/webapp/WEB-INF/applicationContext.xml`
    *   Verify the datasource URL: `jdbc:postgresql://localhost:5432/flexizen`
    *   Update the `username` and `password` properties to match your local PostgreSQL credentials.
2.  Build and compile the WAR package using Maven:
    ```bash
    cd flexizen-backend
    mvn clean package -DskipTests
    ```
3.  Deploy the built artifact `target/flexizen.war` to your Tomcat 11 instance. To run the API on the root URL path (`http://localhost:8085/`), deploy the war file as `ROOT.war` into Tomcat's `webapps/` folder:
    ```bash
    # Stop Tomcat, clear existing deployment and copy:
    Remove-Item -Recurse -Force "D:\path\to\tomcat\webapps\ROOT"
    Copy-Item "target/flexizen.war" "D:\path\to\tomcat\webapps\ROOT.war"
    ```
4.  Launch Tomcat. The backend APIs will be exposed under `http://localhost:8085/api/*`.

### 3. Frontend Installation & Local Server
1.  Navigate to the frontend workspace:
    ```bash
    cd flexizen-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite local development server:
    ```bash
    npm run dev
    ```
    *   The app will start at `http://localhost:5173/` or `http://localhost:5174/`.
    *   The development server has an integrated proxy mapping that forwards all client requests matching `/api/**` automatically to the Tomcat instance running at `http://localhost:8085`.

---

## 👤 Default Credentials

For test login access to the administrative dashboard (`/admin`), use the pre-loaded seed account:
*   **Username:** `admin`
*   **Password:** `admin123`
