# Razaek — Medical Tourism Platform

**Stack Confirmed:**
- 📱 Mobile: React Native CLI (Android + iOS)
- ⚙️ Backend: Node.js + Express + Supabase (PostgreSQL + Prisma ORM)
- 🖥️ Admin Panel: React.js + Vite
- 📂 Monorepo: `/Users/karamjitsingh/Documents/Local_Data/demos/Hybrid/`

---

## Project Structure

```
Hybrid/
├── razaek-mobile/           ← React Native CLI App
├── razaek-backend/          ← Node.js + Express + Supabase
├── razaek-admin/            ← React.js Vite Admin Panel
├── package.json             ← Root workspace (concurrently)
└── README.md
```

---

## Database Schema (Supabase / PostgreSQL via Prisma)

```
users              → Patient accounts (name, email, phone, country, passport_no)
admins             → Admin/Coordinator accounts (name, email, role)
specialties        → Medical specialties (Cardiology, Orthopedics, IVF, etc.)
hospitals          → Hospital listings (name, city, rating, accreditations)
doctors            → Doctors (hospital_id, specialty, experience)
packages           → Basic / Standard / Premium / Luxury
package_features   → Feature list per package
bookings           → Patient booking (patient + package + hospital + doctor + dates)
booking_services   → Services included in a booking
medical_reports    → Uploaded patient files (Supabase Storage)
coordinator_assignments → Coordinator assigned per booking
notifications      → Push notifications log
```

---

## API Routes

```
Public:
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/refresh-token

Patient (JWT protected):
  GET  /api/specialties
  GET  /api/packages?specialty_id=
  GET  /api/packages/:id
  GET  /api/hospitals?specialty_id=
  GET  /api/hospitals/:id
  GET  /api/doctors?hospital_id=
  POST /api/bookings
  GET  /api/bookings/my
  GET  /api/bookings/:id
  POST /api/reports/upload
  GET  /api/reports/:booking_id
  GET  /api/notifications/my

Admin (role=admin):
  GET  /api/admin/stats
  GET  /api/admin/patients
  GET  /api/admin/bookings
  PATCH /api/admin/bookings/:id/status
  POST /api/admin/specialties
  POST /api/admin/hospitals
  POST /api/admin/doctors
  POST /api/admin/packages
  PATCH /api/admin/bookings/:id/assign-coordinator
```

---

## Mobile App Screens

### Auth Flow
- Splash / Onboarding (3 slides)
- Login
- Register (with country selector)
- Forgot Password

### Main App
- **Home** — specialties grid + featured packages + banner
- **Specialty Detail** — hospitals + packages filtered
- **Package List** — Basic / Standard / Premium / Luxury cards
- **Package Detail** — full feature breakdown + pricing
- **Hospital Detail** — info, doctors, accreditations, gallery
- **Doctor Detail** — profile, experience, reviews
- **Book Now Flow:**
  - Step 1: Select Dates
  - Step 2: Upload Medical Reports
  - Step 3: Confirm Booking
  - Step 4: Payment (placeholder)
- **My Bookings** — active + past bookings
- **Booking Detail** — full status timeline + services checklist
- **Profile** — personal info, passport, preferences
- **Notifications**
- **Support / Chat** (coordinator)

---

## Admin Panel Pages

- Login
- Dashboard — stats cards + booking chart + recent bookings table
- Patients — list, view profile, bookings history
- Bookings — list with status filter, assign coordinator, update status
- Hospitals — add/edit/delete
- Doctors — add/edit/delete
- Packages — add/edit/delete (with features)
- Specialties — add/edit/delete
- Coordinators — manage admin users
- Settings

---

## Implementation Phases

### ✅ Phase 1 — Backend Setup
- Node.js + Express project init
- Supabase connection via Prisma
- Auth (JWT + bcrypt) with roles
- All DB models + migrations
- All API routes
- Supabase Storage config for medical reports
- .env.example

### ✅ Phase 2 — React Native Mobile App
- RN CLI init (`Razaek`)
- Navigation (Auth Stack + Tab Navigator)
- Supabase-connected Axios client
- All screens with real UI
- MMKV token storage
- Zustand auth store

### ✅ Phase 3 — Admin Panel
- Vite + React init
- Protected routes + admin login
- Dashboard with Recharts
- Full CRUD for all entities
- Booking management with status workflow
- Coordinator assignment

### ✅ Phase 4 — Root DX
- Root package.json with `npm run dev` (runs all 3)
- README with setup guide


# Razaek — Task Tracker

## Phase 1 — Backend (Node.js + Supabase)
- [x] Init Node.js project (`razaek-backend`)
- [ ] Install all dependencies
- [ ] Prisma setup + Supabase DB connection
- [x] Define all Prisma models (schema.prisma)
- [x] Auth middleware (JWT + bcrypt + role guard)
- [x] Auth routes (register, login, refresh)
- [x] Specialties routes
- [x] Packages routes
- [x] Hospitals + Doctors routes
- [x] Bookings routes
- [x] Medical reports upload (Supabase Storage)
- [x] Admin routes
- [x] Global error handler + health check
- [x] .env.example
- [x] README.md

## Phase 2 — React Native Mobile App
- [x] Init RN CLI project (`Razaek`)
- [ ] Install navigation + dependencies
- [ ] Theme system (colors, fonts, spacing)
- [ ] Axios client + JWT interceptor
- [ ] Zustand auth store
- [ ] Auth screens (Splash, Onboarding, Login, Register)
- [ ] Home screen
- [ ] Package List + Detail screens
- [ ] Hospital + Doctor screens
- [ ] Booking flow screens
- [ ] My Bookings + Booking Detail
- [ ] Profile + Notifications
- [ ] .env.example

## Phase 3 — Admin Panel (React + Vite)
- [x] Init Vite React project (`razaek-admin`)
- [ ] Install dependencies
- [ ] Protected routing + admin login
- [ ] Dashboard page
- [ ] Patients management
- [ ] Bookings management
- [ ] Hospitals + Doctors CRUD
- [ ] Packages + Specialties CRUD
- [ ] Coordinators management

## Phase 4 — Root DX
- [x] Root package.json with workspace scripts
- [x] README.md
