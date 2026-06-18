# Razaek — Medical Tourism Platform

A comprehensive Medical Tourism Platform combining a mobile client, server backend, and web administration dashboard into a unified monorepo.

---

## Concept Overview
Razaek is an end-to-end medical tourism platform that coordinates and packages treatments, appointments, flights, local transfers, and stays for domestic and international patients coming to India for quality medical care.

---

## Directory Structure

```
Hybrid/
├── package.json             # Root monorepo runner configurations
├── README.md                # General introduction & setup guide
│
├── razaek-backend/          # Node.js + Express + Supabase API server
│   ├── src/                 # REST controllers, routes, and helpers
│   ├── prisma/              # Database schema migrations and client definition
│   └── README.md            # Backend specific instructions
│
├── razaek-admin/            # React + Vite web dashboard for admins & coordinators
│   ├── src/                 # Pages, routing, widgets and layouts
│   └── index.html           # SPA entrypoint
│
└── razaek-mobile/           # React Native CLI Mobile App (iOS / Android)
    ├── App.tsx              # Mobile entrypoint
    ├── android/             # Android Gradle project setup
    └── ios/                 # CocoaPods and Xcode iOS project setup
```

---

## Monorepo Running Scripts

Run these scripts from the **root** folder:

1. **Start the API Backend:**
   ```bash
   npm run backend
   ```
2. **Start the Admin Web Panel:**
   ```bash
   npm run admin
   ```
3. **Start the Metro Bundler for React Native:**
   ```bash
   npm run mobile
   ```
4. **Run both Backend + Web Admin + Mobile Bundler together:**
   ```bash
   npm run dev
   ```

---

## Setup Requirements

Refer to the individual `README.md` files in each project sub-directory for detailed configuration details (e.g. database credentials, environment flags, API endpoints):
- **Backend Setup & Schema Sync:** [razaek-backend/README.md](file:///Users/karamjitsingh/Documents/Local_Data/demos/Hybrid/razaek-backend/README.md)
