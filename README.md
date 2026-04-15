# 📌 Seat Reservation System

A full-stack seat booking application with authentication, real-time seat availability, and PostgreSQL database using Docker.

---

## 🚀 Tech Stack

- Frontend: HTML, CSS, Vanilla JS  
- Backend: Node.js, Express  
- Database: PostgreSQL  
- Auth: JWT (httpOnly cookies)  
- Containerization: Docker + Docker Compose  

## 🚀 RUN FRONTEND

1. Clone from my repo (https://github.com/R909/seat-reservation-system)
2. RUN npm i
3. Start Docker with (docker compose up -d)
4. RUN npm run dev
---

## ⚙️ Prerequisites

Make sure you have installed:

- Docker
- Docker Compose
- Node.js (if running without Docker)

---


## 🐳 Run with Docker (Step-by-Step)

### 1. Build & Start Containers

```
docker-compose up --build
```

👉 This will:
- Start PostgreSQL container
- Run `init.sql` automatically
- Start backend server

---

### 2. Check Running Containers

```
docker ps
```

You should see:
- booking_db (Postgres)
- booking_app (Node backend)

---

### 3. Access Application

- App → http://localhost:8080/login  
- Register → http://localhost:8080/register  
- Seats → http://localhost:8080/seats.html  

---

### 4. Stop Containers

```
docker-compose down
```

---

### 5. Reset Database (Optional)

```
docker-compose down -v
docker-compose up --build
```

👉 This removes volume and recreates DB

---

## 🖥️ Run Without Docker (Manual Setup)

### 1. Start PostgreSQL

Make sure PostgreSQL is running locally.

Create DB:

```
sql_class_2_db
```

Run `init.sql` manually.

---

### 2. Update `.env`

```
DB_HOST=localhost
DB_PORT=5432
```

---

### 3. Install Dependencies

```
npm install
```

---

### 4. Start Backend

```
npm run dev
```

---

### 5. Open in Browser

- http://localhost:8080/login  
- http://localhost:8080/register  
- http://localhost:8080/seats.html  

---

## 🔐 Authentication Flow

1. Register → `/api/auth/register`  
2. Login → `/api/auth/login`  
3. JWT stored in httpOnly cookie  
4. Protected routes use `verifyJWT`  

---

## 🎟️ Seat Booking Flow

- GET `/api/seats` → fetch seats  
- PUT `/api/seats/:id` → book seat  

Seat States:
- Available (green)
- Selected (blue)
- Booked (grey, disabled)

---

## 🧪 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Seats
- GET `/api/seats`
- PUT `/api/seats/:id`

---

## ✅ Features

- Authentication (JWT)
- Seat booking system
- Multi-seat selection
- Docker support

---

## 👨‍💻 Author

Ritu Developer