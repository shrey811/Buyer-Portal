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




