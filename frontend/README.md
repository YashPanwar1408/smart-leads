# Smart Leads Dashboard Frontend

Production-grade React + TypeScript SaaS dashboard for managing sales leads. This README is designed to be recruiter‑friendly, beginner‑friendly, and team‑ready.

---

## 1. Frontend Overview 🧭

The frontend delivers a modern, responsive dashboard UI for authentication, lead management, filtering, and CSV reporting. It focuses on predictable state, reusable UI, and smooth interactions.

**Dashboard architecture**
- Feature‑based modules (`features/auth`, `features/leads`) keep domain logic isolated.
- Shared UI primitives live in `components/ui` and are reused everywhere.
- Data fetching uses TanStack Query for caching and request orchestration.

**UI philosophy**
- Clean layout, strong typography, soft shadows, and calm brand palette.
- Data‑dense screens stay readable through spacing and consistent components.

**Scalability approach**
- Feature boundaries make it easy to add modules without breaking others.
- Typed services and DTOs keep API changes safe and consistent.

---

## 2. Features ✨

- Authentication UI (login/register)
- Protected routes
- Role‑based rendering
- Leads table + details page
- Search + multi‑filtering
- Sorting + pagination
- CSV export
- Dark mode
- Responsive layout
- Loading skeletons
- Empty/error states
- Toast notifications

---

## 3. Tech Stack (and Why)

| Technology | Purpose | Why It Was Chosen |
|---|---|---|
| React | UI library | Component model and ecosystem maturity |
| TypeScript | Types | Safer refactors and clearer contracts |
| Vite | Tooling | Fast local dev + modern build pipeline |
| TailwindCSS | Styling | Utility‑first for speed and consistency |
| TanStack Query | Server state | Caching, retries, and async control |
| Zustand | UI state | Lightweight global state for UI preferences |
| React Hook Form + Zod | Forms | Fast forms + strong validation |
| Axios | HTTP client | Interceptors + cleaner API calls |

---

## 4. Frontend Folder Structure

```
frontend/
	src/
		app/
			guards/
				ProtectedRoute.tsx
				RoleGate.tsx
			layout/
				AppLayout.tsx
				AuthLayout.tsx
			router.tsx
			providers.tsx
		components/
			data/
				EmptyState.tsx
				ErrorState.tsx
			layout/
				Navbar.tsx
				Sidebar.tsx
			ui/
				Badge.tsx
				Button.tsx
				Card.tsx
				Input.tsx
				Modal.tsx
				PageTransition.tsx
				Pagination.tsx
				SearchInput.tsx
				Select.tsx
				Skeleton.tsx
				Spinner.tsx
				Table.tsx
				Toggle.tsx
		features/
			auth/
				auth.schemas.ts
				components/
					AuthForm.tsx
				hooks/
					useAuth.ts
				pages/
					LoginPage.tsx
					RegisterPage.tsx
			leads/
				lead.schemas.ts
				components/
					LeadFilters.tsx
					LeadFormModal.tsx
					LeadTable.tsx
					LeadTableSkeleton.tsx
					LeadToolbar.tsx
				hooks/
					useLeadMutations.ts
					useLeads.ts
				pages/
					LeadDetailPage.tsx
					LeadsPage.tsx
		hooks/
			useDebounce.ts
			useDisclosure.ts
			useTheme.ts
		services/
			api/
				errors.ts
				http.ts
			auth.ts
			leads.ts
		store/
			authStore.ts
			uiStore.ts
		styles/
			index.css
		types/
			api.ts
			auth.ts
			lead.ts
			pagination.ts
		utils/
			classnames.ts
			download.ts
			format.ts
		App.tsx
		main.tsx
```

### Folder responsibilities
- **app/**: App shell, routes, layouts, providers, and route guards.
- **components/**: Shared UI primitives and layout elements.
- **features/**: Domain‑specific UI and logic (auth, leads).
- **hooks/**: Generic reusable hooks.
- **services/**: API client and endpoints.
- **store/**: Global UI and auth state.
- **styles/**: Tailwind base + global styles.
- **types/**: Shared TypeScript types.
- **utils/**: Helper functions.

### Request flow
**UI → Hook → API Service → Backend API → Response → State Update → UI Render**

---

## 5. Authentication Flow 🔐

- **Login/Register** handled by `features/auth`.
- Form validation via Zod.
- Tokens stored in Zustand store and used by Axios interceptor.
- `ProtectedRoute` ensures authenticated access.
- `RoleGate` controls role‑based UI rendering.

---

## 6. State Management

| State Type | Tool | Why |
|---|---|---|
| Server state | TanStack Query | Caching, retries, pagination, data sync |
| UI state | Zustand | Lightweight, persistent UI preferences |
| Form state | React Hook Form | High‑performance form management |

---

## 7. UI Components Architecture

- **Reusable primitives:** Button, Input, Select, Modal, Table, Pagination.
- **Composed feature components:** Lead table, filters, form modal.
- **Consistent styling:** Tailwind + design tokens in `tailwind.config.ts`.

---

## 8. API Integration

- Axios client in `services/api/http.ts`.
- JWT injected via request interceptor.
- Centralized error parsing in `services/api/errors.ts`.

---

## 9. Forms & Validation

- Zod schema defines allowed fields and validation rules.
- React Hook Form provides validation and error handling.
- Inline field errors are shown in UI inputs.

---

## 10. Search & Filtering

- Search uses `useDebounce` to avoid excessive network requests.
- Filters are serialized as query params.
- Sorting handled via query param (`latest`/`oldest`).

---

## 11. Pagination

- Pagination is server‑driven.
- The UI receives pagination metadata from the backend and updates page state.

---

## 12. CSV Export

- Calls `/leads/export` with current filters.
- Downloads a Blob using `utils/download.ts`.

---

## 13. Dark Mode 🌙

- Theme stored in Zustand and persisted in local storage.
- `useTheme` toggles the `dark` class on the root element.

---

## 14. Responsive Design 📱

- Dashboard layout adapts to small screens with flexible grid and spacing.
- Table containers use overflow scrolling.

---

## 15. Environment Variables

`.env.example`
```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

**Variable explanation**
- `VITE_API_BASE_URL`: Base URL for backend API requests.

---

## 16. Setup Instructions

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

### Docker
```bash
docker compose up --build
```

---

## 17. Docker Setup 🐳

- Dockerfile builds the Vite app and serves via Nginx.
- Docker Compose exposes the app on port 5173.

---

## 18. Deployment

Recommended platforms: Vercel, Netlify, Cloudflare Pages.

Steps:
1. Set `VITE_API_BASE_URL` in the build environment.
2. Run `npm run build`.
3. Deploy the `dist` folder.

---

## 19. Performance Optimizations

- React Query caching reduces redundant requests.
- Debounced search limits network traffic.
- Tailwind keeps CSS size minimal via tree‑shaking.

Future improvements:
- Route‑level code splitting
- Table virtualization for large datasets

---

## 20. Best Practices Used

- Strict TypeScript and typed API responses
- Feature‑based architecture
- UI primitives with consistent styles
- Centralized error handling
- Separation of concerns

---

## 21. Future Improvements

- Add route‑level lazy loading
- Add i18n support
- Add UI tests (Playwright)
- Add analytics dashboard widgets

---

## Quick Links
- API base: `VITE_API_BASE_URL`
- Main layout: `src/app/layout/AppLayout.tsx`
