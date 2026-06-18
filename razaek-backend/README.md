# Razaek Backend API

Node.js, Express, and Supabase REST API for the **Razaek Medical Tourism Platform**. Uses **Prisma ORM** to manage data structures and query execution on Supabase's PostgreSQL database.

---

## Technical Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Storage:** Supabase Storage (for Medical Reports)
- **Auth:** JWT (Access + Refresh token rotation)
- **Validation:** Zod + express-validator

---

## Directory Structure
```
razaek-backend/
├── prisma/
│   └── schema.prisma       # Database tables, enums, & relations
├── src/
│   ├── config/             # DB & Env configs
│   ├── controllers/        # Route logics
│   ├── middleware/         # Security, Auth, Errors, Uploads
│   ├── routes/             # Express routes mapping
│   └── utils/              # Loggers, helpers
├── .env.example
├── package.json
└── server.js
```

---

## Installation & Setup

### 1. Prerequisites
- Node.js installed on your system.
- A Supabase Project created (https://supabase.com).
- A storage bucket named `medical-reports` created in your Supabase project with public or private access policies depending on your preference.

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in the details:
```bash
cp .env.example .env
```
Make sure to generate 2 separate secure keys for `JWT_SECRET` and `JWT_REFRESH_SECRET` using this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Database Setup & Migrations
Sync your database schema with Supabase using Prisma CLI:
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema directly to Supabase DB (great for initial quick prototyping)
npm run prisma:push
```

### 5. Running the Application

- **Development Mode (with Hot-Reload):**
  ```bash
  npm run dev
  ```
- **Production Mode:**
  ```bash
  npm run start
  ```

---

## Key Endpoints

### Health Check
- `GET /api/health` — Public check for server status

### Authentication
- `POST /api/auth/register` — Create patient account
- `POST /api/auth/login` — Login & receive tokens
- `POST /api/auth/refresh` — Rotate access token using refresh token
- `GET /api/auth/me` — Get logged-in user profile (JWT Protected)
- `PATCH /api/auth/me` — Update profile details (JWT Protected)

### Packages, Specialties & Doctors
- `GET /api/specialties` — Retrieve medical specialties list
- `GET /api/hospitals` — Search/Filter hospitals by specialty & city
- `GET /api/doctors` — Search/Filter doctors by hospital & specialty
- `GET /api/packages` — Fetch package tiers (Basic, Standard, Premium, Luxury)

### Patient Bookings & Uploads
- `POST /api/bookings` — Request a medical package (JWT Protected)
- `GET /api/bookings/my` — Get current logged-in patient's bookings (JWT Protected)
- `POST /api/reports/upload` — Upload medical PDF/Images to Supabase Storage (Form-Data `report`, fields: `bookingId`)

### Admin Dash
- `GET /api/admin/stats` — Metrics and revenue overview (Admin/Superadmin only)
- `GET /api/admin/bookings` — Filter & view all bookings (Admin/Coordinator/Superadmin only)
- `POST /api/admin/assign-coordinator` — Assign a coordinator (Admin/Superadmin only)
- `PATCH /api/admin/bookings/:id/status` — Modify travel/booking states (Admin/Coordinator/Superadmin only)
