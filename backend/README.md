# Buyer Portal (Auth + Favourites)



## 🚀 How to run the app

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
follow the example .env
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


