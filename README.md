# 🏠 Buyer Portal 

## 🚀 Tech Stack

### Backend

* Node.js + Express
* Prisma ORM
* PostgreSQL
* JWT Authentication
* Zod (validation)

### Frontend

* React + Vite + TypeScript
* Tailwind CSS
* Axios

---

## 📦 Features

### Authentication

* User registration (email + password)
* Secure login with JWT
* Passwords are hashed using bcrypt
* Protected routes using middleware

### Buyer Dashboard

* View logged-in user info (name, role)
* View all available properties
* Add/remove properties to favourites
* Users can only access their own favourites

### Admin (Extra)

* Admin can create/update/delete properties
* start from admin to add properties
---

## 🗂️ Project Structure

```
Buyer-Portal/
│
├── backend/     # Express + Prisma API
└── frontend/    # React application
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/shrey811/Buyer-Portal.git
cd Buyer-Portal
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret"
PORT=5000
```

### Run migrations & seed data

```bash
npx prisma migrate dev
npm run seed
```

### Start backend

```bash
npm run dev
```

Backend will run on:
👉 http://localhost:5000

---

## 💻 Frontend Setup

```bash
cd ../frontend
npm install
```

### Create `.env`

```
VITE_API_BASE_URL=http://localhost:5000
```

### Start frontend

```bash
npm run dev
```

Frontend will run on:
👉 http://localhost:5173

---

## 🔄 Example User Flow

1. Register a new account
2. Login with your credentials
3. View properties on dashboard
4. Click ❤️ to add/remove favourites
5. Refresh to see saved favourites

---

## 🔑 Test Accounts

### Super Admin (seeded)

* Email: `example@example.com`
* Password: `example123`

> Admin can create properties for testing.

---

## 📌 Notes

* Only authenticated users can access the dashboard
* Users can only modify **their own favourites**
* JWT is stored in localStorage for simplicity
* Basic validation and error handling implemented

---

## 🧪 API Documentation

Swagger docs available at:
👉 http://localhost:5000/api-docs

---

## 🙌 Summary

This project demonstrates:

* Authentication & authorization
* REST API design
* Database relationships (User ↔ Favourites ↔ Properties)
* Full-stack integration
* Basic UX considerations

---

## 👨‍💻 Author

Shreyas
GitHub: https://github.com/shrey811
