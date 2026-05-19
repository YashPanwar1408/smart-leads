# Smart Leads Dashboard Backend

Production-grade Node.js + Express + TypeScript backend for the Smart Leads Dashboard. This README is designed to be beginner-friendly while still documenting the system like an internal team handoff.

---

## 1. Project Overview

The backend powers authentication, role-based access, lead management, and reporting for the Smart Leads Dashboard. It exposes RESTful APIs consumed by the frontend and includes filtering, search, sorting, pagination, and CSV export for operational reporting.

**Architecture:** Controller → Service → Repository
- **Controllers** handle HTTP-level concerns and response formatting.
- **Services** own business rules and orchestration.
- **Repositories** encapsulate database access (Mongoose).

**Why this scales:**
- Clear separation of concerns makes features easy to extend.
- Repository layer isolates database changes.
- Zod validation ensures strict inputs, improving reliability.
- Centralized error handling keeps responses consistent across the system.

---

## 2. Features ✅

- JWT Authentication
- Role-Based Access Control (Admin, Sales)
- Lead CRUD
- Advanced filtering
- Search by name/email
- Sorting (latest/oldest)
- Pagination
- CSV Export
- Validation (Zod)
- Centralized error handling
- Dockerized setup

---

## 3. Tech Stack (and Why)

| Technology | Purpose | Why It Was Chosen |
|---|---|---|
| Node.js | Runtime | Fast I/O and massive ecosystem for web APIs |
| Express.js | Web framework | Minimal, flexible, and easy to structure into layers |
| TypeScript | Types | Strong typing for maintainability and fewer runtime errors |
| MongoDB | Database | Flexible schema, good for evolving lead data |
| Mongoose | ODM | Schema enforcement and query ergonomics |
| Zod | Validation | Runtime input validation with type inference |
| JWT | Auth | Stateless auth for scalable APIs |
| bcrypt | Hashing | Secure password storage |
| Helmet / CORS / Rate Limit | Security | Standard API security hardening |

---

## 4. Backend Folder Structure

```
backend/
	src/
		app.ts
		server.ts
		config/
			db.ts
			env.ts
			logger.ts
		middlewares/
			auth.middleware.ts
			error.middleware.ts
			not-found.middleware.ts
			rate-limit.middleware.ts
			request-id.middleware.ts
			rbac.middleware.ts
			validate.middleware.ts
		models/
			lead.model.ts
			user.model.ts
		modules/
			auth/
				auth.controller.ts
				auth.dto.ts
				auth.repository.ts
				auth.routes.ts
				auth.service.ts
				auth.validator.ts
			leads/
				lead.controller.ts
				lead.dto.ts
				lead.repository.ts
				lead.routes.ts
				lead.service.ts
				lead.validator.ts
		scripts/
			seed.ts
		types/
			api.ts
			auth.ts
			enums.ts
			express.d.ts
			pagination.ts
		utils/
			api-response.ts
			async-handler.ts
			csv.ts
			errors.ts
			jwt.ts
			pagination.ts
			password.ts
	swagger/
		openapi.json
	postman/
		Smart-Leads.postman_collection.json
	Dockerfile
	docker-compose.yml
	package.json
	tsconfig.json
```

### Folder responsibilities
- **config/**: Environment configuration and database initialization.
- **middlewares/**: Cross-cutting concerns (auth, RBAC, validation, error handling).
- **models/**: Mongoose schemas for core entities.
- **modules/**: Feature modules, each with controller/service/repository/validator.
- **scripts/**: Utility scripts (seed data).
- **types/**: TypeScript shared types and enums.
- **utils/**: Helper utilities shared across layers.
- **swagger/**: OpenAPI specs for API documentation.
- **postman/**: Postman collection for API testing.

### Important files
- `app.ts`: Express app initialization and middleware wiring.
- `server.ts`: Application bootstrap and database connection.
- `auth.controller.ts`: HTTP handlers for login/register/me.
- `auth.service.ts`: Authentication business logic.
- `auth.repository.ts`: User database access.
- `lead.controller.ts`: HTTP handlers for lead APIs.
- `lead.service.ts`: Lead business logic and RBAC enforcement.
- `lead.repository.ts`: Mongoose queries for lead data.
- `validate.middleware.ts`: Zod-based request validation.
- `error.middleware.ts`: Centralized error responses.

### Request flow
**Request → Route → Controller → Service → Repository → Database → Response**

---

## 5. Authentication Flow

### Register
1. User submits name/email/password.
2. Input validated via Zod.
3. Password hashed using bcrypt.
4. User saved to MongoDB.
5. Access token returned.

### Login
1. User submits email/password.
2. Credentials validated.
3. bcrypt compares password with hash.
4. JWT access token returned.

### JWT Flow
- Token signed with `JWT_ACCESS_SECRET` and `JWT_ACCESS_TTL`.
- `authenticate` middleware verifies token and attaches user context.

### Protected Routes
- All lead routes are protected.
- Middleware ensures `req.user` exists and is valid.

---

## 6. RBAC Flow

Roles:
- **Admin**: Access to all leads.
- **Sales**: Access to own leads only.

RBAC is enforced in `lead.service.ts` by checking `req.user.role` and lead ownership.

---

## 7. Database Schema Design

### User Schema
- `name`: string
- `email`: string (unique index)
- `passwordHash`: string
- `role`: enum (`admin`, `sales`)
- `isActive`: boolean
- `createdAt`, `updatedAt`

### Lead Schema
- `name`: string
- `email`: string
- `status`: enum (`New`, `Contacted`, `Qualified`, `Lost`)
- `source`: enum (`Website`, `Instagram`, `Referral`)
- `ownerId`: ObjectId reference to User
- `createdAt`, `updatedAt`

### Indexes
- User: `email` (unique)
- Lead: text index on `name` and `email` for search

---

## 8. API Documentation

Base URL: `http://localhost:4000/api/v1`

### Auth
| Method | Route | Body | Description |
|---|---|---|---|
| POST | `/auth/register` | `{ name, email, password }` | Register user |
| POST | `/auth/login` | `{ email, password }` | Login user |
| GET | `/auth/me` | - | Get current user |

### Leads
| Method | Route | Body | Description |
|---|---|---|---|
| GET | `/leads` | - | List leads (filters, search, pagination) |
| POST | `/leads` | `{ name, email, status, source }` | Create lead |
| GET | `/leads/:id` | - | Get lead |
| PATCH | `/leads/:id` | `{ name?, email?, status?, source? }` | Update lead |
| DELETE | `/leads/:id` | - | Delete lead |
| GET | `/leads/export` | - | Export CSV |

### Example success response
```json
{
	"success": true,
	"data": {
		"items": []
	},
	"meta": {
		"requestId": "uuid",
		"pagination": { "page": 1, "limit": 10, "total": 0, "totalPages": 1 }
	},
	"error": null
}
```

### Example error response
```json
{
	"success": false,
	"data": null,
	"meta": { "requestId": "uuid" },
	"error": {
		"code": "VALIDATION_ERROR",
		"message": "Validation error",
		"details": { "email": ["Invalid email"] }
	}
}
```

---

## 9. Filtering & Pagination Logic

Query parameters:
- `status=New,Contacted`
- `source=Website`
- `q=searchTerm`
- `sort=latest|oldest`
- `page=1`
- `limit=10`
- `createdAtFrom=2026-05-01T00:00:00.000Z`
- `createdAtTo=2026-05-31T23:59:59.999Z`

**Behavior:**
- Filters are combined with AND logic.
- Search matches name/email (case-insensitive).
- Pagination uses `skip` and `limit` with total count.

---

## 10. Validation Strategy

- Zod validates `body`, `params`, and `query` in `validate.middleware.ts`.
- DTOs define expected shapes for inputs and outputs.
- Validation errors are standardized via `error.middleware.ts`.

---

## 11. Error Handling System

- All errors flow into a centralized middleware.
- Known error types are mapped into consistent API responses.
- Error envelope includes `code`, `message`, and optional `details`.

---

## 12. Security Features

- **bcrypt** for password hashing
- **JWT** for stateless auth
- **Helmet** for secure headers
- **CORS** with allowlist
- **Rate limiting** to prevent abuse

---

## 13. Environment Variables

`.env.example`
```env
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/smart-leads
JWT_ACCESS_SECRET=change_me_please_use_long_random
JWT_ACCESS_TTL=15m
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info

# Optional for seed script
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@smartleads.io
ADMIN_PASSWORD=ChangeMe123!
```

Variable explanation:
- `NODE_ENV`: runtime environment
- `PORT`: API port
- `MONGO_URI`: MongoDB connection string
- `JWT_ACCESS_SECRET`: secret for signing tokens
- `JWT_ACCESS_TTL`: access token lifetime
- `BCRYPT_SALT_ROUNDS`: hashing cost
- `CORS_ORIGIN`: allowed frontend origin
- `LOG_LEVEL`: logging verbosity
- `ADMIN_*`: optional seed user credentials

---

## 14. Docker Setup

- **Dockerfile** builds the TypeScript app into a production image.
- **docker-compose.yml** runs API + MongoDB.

Container flow:
1. Build backend image
2. Start MongoDB container
3. API container connects to MongoDB

---

## 15. Setup Instructions

### Local
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Seed data
```bash
npm run seed
```

### Docker
```bash
docker compose up --build
```

### Production
```bash
npm run build
npm run start
```

---

## 16. API Testing

### Postman
1. Import the collection from `postman/Smart-Leads.postman_collection.json`.
2. Set `baseUrl` to `http://localhost:4000/api/v1`.
3. Login to get an access token.
4. Use that token in `Authorization: Bearer <token>`.

### Sample request
```bash
curl -X GET "http://localhost:4000/api/v1/leads?page=1&limit=10" \
	-H "Authorization: Bearer <token>"
```

---

## 17. Deployment

Recommended hosting:
- Render, Railway, Fly.io, or AWS ECS

Steps:
1. Build Docker image.
2. Configure environment variables.
3. Deploy API container.
4. Use managed MongoDB (Atlas).

---

## 18. Scalability

This architecture scales because:
- Clear separation allows independent feature growth.
- Repository layer makes data storage replaceable.
- Stateless JWT auth enables horizontal scaling.

Future improvements:
- Add refresh tokens
- Add caching (Redis)
- Add audit logs

---

## 19. Best Practices Used

- Strict TypeScript typing
- Separation of concerns
- Reusable middleware and utilities
- Consistent API response format
- Input validation at boundaries

---

## 20. Future Improvements

- Refresh token rotation
- Cursor-based pagination for large datasets
- Streaming CSV export
- Audit logs and activity feed
- OpenTelemetry tracing

---

## API Docs

Swagger UI: http://localhost:4000/api-docs
