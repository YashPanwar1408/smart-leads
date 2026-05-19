# Smart Leads Dashboard

**Smart Leads Dashboard** - A modern SaaS-style lead management platform for sales teams to capture, qualify, and export pipeline data with speed and clarity.

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Stack](https://img.shields.io/badge/stack-MERN-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Status](https://img.shields.io/badge/status-production--ready-success)

---

## 1. Project Title & Tagline

**Title:** Smart Leads Dashboard  
**Tagline:** A sleek SaaS dashboard for turning inbound interest into qualified revenue.

---

## 2. Project Overview

Smart Leads Dashboard is a full-stack MERN application designed for sales teams to track leads, filter by status/source, and export reports quickly. It provides secure authentication, role-based permissions, and a responsive UI optimized for daily pipeline workflows.

**Business use-case:**
- Sales teams need a fast way to view and update lead pipelines.
- Admins need visibility into all leads, while sales users manage their own.
- Operations need CSV exports for reporting and offline analysis.

**Why it exists:**
- Many teams use spreadsheets for lead tracking. This app replaces that with structured, searchable data and a professional SaaS workflow.

**Real-world relevance:**
- Mirrors core CRM interactions: lead creation, qualification, and reporting.

---

## 3. Live Demo (Placeholders)

- Frontend: `https://your-frontend-url.com`
- Backend: `https://your-backend-url.com`
- API Docs: `https://your-backend-url.com/api-docs`

---

## 4. Screenshots (Placeholders)

- Login Page: `docs/screenshots/login.png`
- Dashboard: `docs/screenshots/dashboard.png`
- Leads Table: `docs/screenshots/leads-table.png`
- Filters Panel: `docs/screenshots/filters.png`
- Dark Mode: `docs/screenshots/dark-mode.png`
- Mobile View: `docs/screenshots/mobile.png`

---

## 5. Features

### Authentication
- JWT-based login and registration
- Secure password hashing (bcrypt)
- Protected routes
- Role-based UI rendering

### Lead Management
- Create, update, delete leads
- Lead detail view
- Owner-based access control

### Filtering and Search
- Multi-filter support (status, source, date range)
- Search by name or email
- Sorting (latest, oldest)
- Debounced search

### Security
- Helmet security headers
- CORS allowlist
- Rate limiting
- Centralized validation

### Dashboard UI
- Responsive layout
- Reusable UI components
- Dark mode
- Toast notifications

### Performance
- Server-side pagination
- Query caching (React Query)

### Scalability
- Controller-Service-Repository architecture
- Feature-based frontend modules

### Developer Experience
- Strict TypeScript
- ESLint + Prettier
- Swagger and Postman support
- Dockerized setup

---

## 6. Complete Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React | Component-based UI |
| TypeScript | Strong typing and safer refactors |
| TailwindCSS | Utility-first styling |
| Vite | Fast dev server and build tooling |
| TanStack Query | Server state caching and sync |
| Axios | HTTP client + interceptors |
| React Hook Form + Zod | Form state + validation |
| Zustand | Lightweight global UI state |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API framework |
| TypeScript | Type safety and maintainability |
| MongoDB | Document database |
| Mongoose | Schema modeling and queries |
| JWT | Stateless authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| Pino | Structured logging |

### DevOps
| Tool | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| GitHub | Source control and collaboration |

---

## 7. Complete Project Architecture

### Root structure
```
root/
  frontend/
  backend/
```

### Frontend structure (deep)
```
frontend/
  src/
    app/
      guards/
      layout/
      router.tsx
      providers.tsx
    components/
      data/
      layout/
      ui/
    features/
      auth/
      leads/
    hooks/
    services/
      api/
    store/
    styles/
    types/
    utils/
    App.tsx
    main.tsx
```

### Backend structure (deep)
```
backend/
  src/
    app.ts
    server.ts
    config/
    middlewares/
    models/
    modules/
      auth/
      leads/
    scripts/
    types/
    utils/
  swagger/
  postman/
```

### Architecture explanation
- **Frontend app/**: routing, layouts, auth guards, and providers.
- **Frontend components/**: reusable UI primitives + layout components.
- **Frontend features/**: feature modules with their own hooks and UI.
- **Backend modules/**: each domain feature has controller, service, repository, and validator.
- **Backend middlewares/**: auth, RBAC, validation, error handling.
- **Backend models/**: Mongoose schemas for user and lead.

---

## 8. Complete Application Flow

**User → UI → API → Backend → Database → Response → UI Update**

1. User interacts with the dashboard.
2. UI calls a feature hook (React Query or mutation).
3. Hook calls the API service (Axios).
4. Backend route receives request and passes it to controller.
5. Controller delegates to service (business logic).
6. Service uses repository to query MongoDB.
7. Response is standardized and returned to UI.
8. UI re-renders using updated state.

---

## 9. Authentication System Flow

- **Register**: input validation -> bcrypt hash -> user saved -> JWT issued.
- **Login**: bcrypt compare -> JWT issued.
- **Protected routes**: `ProtectedRoute` blocks unauthenticated access.
- **Token validation**: backend middleware verifies token signature.
- **RBAC**: role is checked before access to protected resources.

---

## 10. Database Design

### User
- `name`, `email`, `passwordHash`, `role`, `isActive`
- Unique index on email

### Lead
- `name`, `email`, `status`, `source`, `ownerId`, timestamps
- Text index on `name` and `email`

### Relationships
- Leads reference `ownerId` (User)

---

## 11. Frontend Architecture

- **Reusable UI components**: Button, Input, Modal, Table, Pagination.
- **Hooks**: data fetching and debounced search.
- **Services**: typed API calls in `services/`.
- **State**: global UI state in Zustand; server state in React Query.
- **Routing**: guarded routes in `app/router.tsx`.

---

## 12. Backend Architecture

- **Layered architecture**: Controller → Service → Repository.
- **Validation**: Zod middleware validates `body`, `params`, `query`.
- **Error handling**: centralized error middleware.
- **RBAC**: enforced in service layer.

---

## 13. API Documentation

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/auth/register` | No | Register user |
| POST | `/api/v1/auth/login` | No | Login user |
| GET | `/api/v1/auth/me` | Yes | Get current user |
| GET | `/api/v1/leads` | Yes | List leads (filter/search/paginate) |
| POST | `/api/v1/leads` | Yes | Create lead |
| GET | `/api/v1/leads/:id` | Yes | Get lead |
| PATCH | `/api/v1/leads/:id` | Yes | Update lead |
| DELETE | `/api/v1/leads/:id` | Yes | Delete lead |
| GET | `/api/v1/leads/export` | Yes | Export CSV |

---

## 14. Filtering / Search / Pagination Logic

- Filters: `status`, `source`, `createdAtFrom`, `createdAtTo`
- Search: `q` (name/email)
- Sort: `latest` or `oldest`
- Pagination: `page`, `limit`

---

## 15. Security Features

- JWT authentication
- bcrypt hashing
- Helmet security headers
- CORS allowlist
- Rate limiting
- Strict validation

---

## 16. Error Handling Strategy

- Backend uses centralized middleware to format errors.
- Frontend displays toast + error state components.
- API responses are standardized with `success`, `data`, and `error`.

---

## 17. Environment Variables

### Frontend `.env.example`
```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### Backend `.env.example`
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/smart-leads
JWT_ACCESS_SECRET=change_me_please_use_long_random
JWT_ACCESS_TTL=15m
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info

ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@smartleads.io
ADMIN_PASSWORD=ChangeMe123!
```

---

## 18. Docker Architecture

- **Frontend container**: builds Vite app and serves via Nginx.
- **Backend container**: builds API and runs Node server.
- **MongoDB container**: persistent storage for data.

**Flow:** `docker compose up --build` starts MongoDB → backend → frontend.

---

## 19. Setup Instructions

### Local setup
```bash
# clone repo
# install backend
cd backend
cp .env.example .env
npm install
npm run dev

# install frontend
cd ../frontend
cp .env.example .env
npm install
npm run dev
```

### Docker
```bash
docker compose up --build
```

### Production build
```bash
cd backend && npm run build
cd ../frontend && npm run build
```

---

## 20. Local Development Workflow

- Run backend and frontend in parallel.
- Use Postman or Swagger for API testing.
- Keep feature work inside `features/` on the frontend and `modules/` on the backend.

---

## 21. Deployment Guide

- **Frontend**: deploy `dist` to Vercel or Netlify.
- **Backend**: deploy Docker image to Render, Railway, or AWS ECS.
- **Database**: use MongoDB Atlas with IP allowlist.

---

## 22. Scalability & Engineering Decisions

- **TypeScript** reduces runtime errors and improves refactor safety.
- **Separation of concerns** makes the app easier to maintain.
- **Repository pattern** isolates database access for future migrations.
- **Reusable components** keep UI consistent and reduce duplication.

---

## 23. Best Practices Used

- Strict typing
- Clean architecture
- Reusable UI primitives
- Standardized API responses
- Centralized error handling
- Responsive design

---

## 24. Performance Optimizations

- Debounced search
- Server-side pagination
- Query caching (React Query)
- Lightweight state management (Zustand)

---

## 25. Future Improvements

- Refresh token rotation
- Streaming CSV export
- Audit logs
- Advanced analytics widgets
- Role management UI

---

## 26. Challenges Solved

- Building a clean controller-service-repository backend layer
- Designing reusable UI components for data-dense screens
- Keeping TypeScript strict across two codebases
- Aligning API response shape with frontend state

---

## 27. Resume / Portfolio Description

**Short portfolio description:**
Built a production-ready lead management SaaS with RBAC, advanced filtering, CSV export, and a modern React dashboard.

**Internship submission description:**
Delivered a MERN-based Smart Leads Dashboard with clean architecture, JWT auth, strict TypeScript, and a responsive UI optimized for real sales workflows.

**GitHub description:**
Smart Leads Dashboard - MERN SaaS for lead tracking with RBAC, filtering, and export.

---

## 28. Contributors

- Your Name (Owner, Full-Stack Engineer)

---

## 29. License

MIT License (update as needed).

---

## 30. Final Conclusion

Smart Leads Dashboard showcases modern full-stack engineering with scalable architecture, a professional SaaS UI, and production-minded API design. This repository is structured for real-world extension and ready to impress recruiters and internship reviewers.
