# Buyer Portal – Frontend


The app allows users to:

* Register and log in
* View available properties
* Add/remove properties from their favourites
* View and manage their personal favourites list

---

## 🛠️ Tech Stack

* **React (Vite + TypeScript)**
* **React Router** – Routing
* **TanStack Query (React Query)** – Data fetching & caching
* **Axios** – API communication
* **Tailwind CSS** – Styling
* **Zod** – Validation

---

## 📦 Project Structure

```
src/
├── api/              # Axios client and API modules
├── components/       # Reusable UI components
├── features/         # Feature-based modules (auth, dashboard, properties)
├── hooks/            # Custom hooks
├── lib/              # Utilities (storage, helpers)
├── providers/        # App providers (React Query, etc.)
├── routes/           # Routing and guards (protected routes)
└── main.tsx          # App entry point
```

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env` file in the root of the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```


---

### 3. Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

### 4. Build for production

```bash
npm run build
```

---

## 🔐 Authentication Flow

1. User registers with name, email, and password
2. User logs in using email + password
3. Backend returns a JWT token
4. Token is stored in **localStorage**
5. Token is sent with every API request via Axios interceptor

> Note: For simplicity, localStorage is used. In production systems, httpOnly cookies are often preferred for better security.

---

## 📊 Features

### 🔑 Authentication

* Register new user
* Login existing user
* Logout functionality
* Protected routes (dashboard requires login)

---


### 🔐 Authorization

* Users can only:

  * View their own favourites
  * Add/remove their own favourites
* Protected routes prevent unauthorized access

---




# Buyer Portal – Backend


### 1. Clone the project

```bash
git clone

```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/buyer_portal_db
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d

SEED_SUPERADMIN_NAME=Super Admin
SEED_SUPERADMIN_EMAIL=superadmin@admin.com
SEED_SUPERADMIN_PASSWORD=superadmin123
```

---

### 4. Start database (Docker)

```bash
docker-compose up -d
```

---

### 5. Run migrations + generate Prisma client

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 6. Seed super admin (only once)

```bash
npm run prisma:seed
```

This will create a default super admin if it doesn’t already exist.

---

### 7. Start the server

```bash
npm run dev
```

Server will run at:

```
http://localhost:5000
```

Swagger docs:

```
http://localhost:5000/api/docs
```

---


## 📝 Notes

* Passwords are hashed (bcrypt)
* JWT is used for authentication
* Users can only access their own favourites
* Only SUPER_ADMIN can manage properties
* Basic rate limiting is applied on auth routes


