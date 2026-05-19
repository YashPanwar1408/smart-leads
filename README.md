# Smart Leads Dashboard

**Author:** [Yash Panwar](https://github.com/YashPanwar1408)  
**Repository:** [github.com/YashPanwar1408/smart-leads](https://github.com/YashPanwar1408/smart-leads)

A full-stack MERN lead management dashboard built for the **ServiceHive Full Stack Internship Assignment**. Track prospects, filter pipelines, export CSV reports, and manage leads with JWT authentication and role-based access control.

![Stack](https://img.shields.io/badge/stack-MERN-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## Live Demo

| Service | URL |
|---------|-----|
| **Frontend (Vercel)** | [https://smart-leads-woad.vercel.app](https://smart-leads-woad.vercel.app) |
| **Backend API (Render)** | Set `VITE_API_BASE_URL` to your Render service URL + `/api/v1` |
| **API Docs (Swagger)** | `https://<your-render-url>/api-docs` |
| **Health Check** | `https://<your-render-url>/health` |

> After deploying the backend on Render, add `VITE_API_BASE_URL` in Vercel project settings (e.g. `https://smart-leads-api.onrender.com/api/v1`).

---

## Screenshots

### Login
![Login page](backend/docs/loginpage.png)

### Dashboard
![Dashboard overview](backend/docs/dashboard.png)

### Leads management
![Leads table and filters](backend/docs/leads.png)

### Dark mode
![Dark mode UI](backend/docs/darkmode.png)

---

## Features (Assignment Coverage)

| Feature | Status |
|---------|--------|
| JWT authentication (register, login, protected routes) | ✅ |
| Password hashing (bcrypt) | ✅ |
| Lead CRUD + detail view | ✅ |
| Filter by status & source | ✅ |
| Search by name/email (debounced) | ✅ |
| Sort latest / oldest | ✅ |
| Combined filters | ✅ |
| Backend pagination (10 per page) | ✅ |
| CSV export | ✅ |
| RBAC (Admin / Sales) | ✅ |
| Docker setup | ✅ |
| Dark mode | ✅ |
| TypeScript (frontend + backend) | ✅ |
| Loading, empty & error states | ✅ |
| Form validation (Zod + React Hook Form) | ✅ |

---

## Tech Stack

**Frontend:** React 18 · TypeScript · Vite · TailwindCSS · TanStack Query · Zustand · React Hook Form · Zod · Framer Motion · Lucide Icons

**Backend:** Node.js · Express · TypeScript · MongoDB · Mongoose · JWT · Zod · Pino · Helmet · CORS · Rate limiting

**DevOps:** Docker · Docker Compose · Vercel (frontend) · Render (backend)

---

## Project Structure

```
smart-leads/
├── frontend/          # React + TypeScript dashboard
├── backend/           # Express + TypeScript API
│   └── docs/          # Screenshots + API examples
├── README.md
└── .gitignore
```

---

## Quick Start (Local)

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_ACCESS_SECRET (min 32 chars)
npm install
npm run dev
```

API runs at `http://localhost:4000` · Swagger at `http://localhost:4000/api-docs`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`

### 3. Seed admin (optional)

```bash
cd backend
npm run seed
```

Default admin from `.env.example`: `admin@smartleads.io` / `ChangeMe123!`

---

## Deploy on Render (Backend)

| Setting | Value |
|---------|--------|
| **Root Directory** | `backend` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Node Version** | `20` (see `backend/.node-version`) |

> **If deploy fails with `ECONNREFUSED 127.0.0.1:27017`:** your `MONGO_URI` is pointing to localhost. Use **MongoDB Atlas**, not local MongoDB. See [backend/docs/RENDER-DEPLOY.md](backend/docs/RENDER-DEPLOY.md).

**Environment variables** (required on Render):

| Variable | Example |
|----------|---------|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/smart-leads?retryWrites=true&w=majority` |
| `JWT_ACCESS_SECRET` | 32+ character random string |
| `CORS_ORIGIN` | `https://smart-leads-woad.vercel.app` |
| `NODE_ENV` | `production` |

**Do not use** `mongodb://localhost:27017/...` on Render.

---

## Deploy on Vercel (Frontend)

| Setting | Value |
|---------|--------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output** | `dist` |

**Environment variable:**

- `VITE_API_BASE_URL` — your Render API base URL, e.g. `https://your-app.onrender.com/api/v1`

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register |
| POST | `/api/v1/auth/login` | No | Login |
| GET | `/api/v1/auth/me` | Yes | Current user |
| GET | `/api/v1/leads` | Yes | List leads (filter, search, paginate) |
| POST | `/api/v1/leads` | Yes | Create lead |
| GET | `/api/v1/leads/:id` | Yes | Get lead |
| PATCH | `/api/v1/leads/:id` | Yes | Update lead |
| DELETE | `/api/v1/leads/:id` | Yes | Delete lead |
| GET | `/api/v1/leads/export` | Yes | Export CSV |

Query params for list/export: `status`, `source`, `q`, `sort`, `page`, `limit`, `createdAtFrom`, `createdAtTo`

---

## Environment Variables

See `frontend/.env.example` and `backend/.env.example`.

---

## Docker

```bash
cd backend
docker compose up --build
```

---

## Submission

- **GitHub:** [YashPanwar1408/smart-leads](https://github.com/YashPanwar1408/smart-leads)
- **Live app:** [smart-leads-woad.vercel.app](https://smart-leads-woad.vercel.app)
- **Email:** ritik.yadav@servicehive.tech  
- **Subject:** `MERN Internship Assignment Submission - Yash Panwar`

---

## License

MIT © Yash Panwar
