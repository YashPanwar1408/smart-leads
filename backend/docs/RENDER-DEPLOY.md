# Deploy Backend on Render + MongoDB Atlas

The error `connect ECONNREFUSED 127.0.0.1:27017` means **Render is trying to use local MongoDB**, which does not exist in the cloud.

You must use **MongoDB Atlas** (free tier is fine).

---

## Step 1 — Create MongoDB Atlas cluster

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / log in → **Create a cluster** (M0 free tier)
3. Choose a cloud region close to your Render region

---

## Step 2 — Allow network access

1. In Atlas → **Network Access** → **Add IP Address**
2. Click **Allow Access from Anywhere** (`0.0.0.0/0`)  
   *(Required so Render’s servers can reach your database)*

---

## Step 3 — Create database user

1. Atlas → **Database Access** → **Add New Database User**
2. Username + password (save these)
3. Role: **Read and write to any database**

---

## Step 4 — Get connection string

1. Atlas → **Database** → **Connect** → **Drivers**
2. Copy the connection string, e.g.:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/smart-leads?retryWrites=true&w=majority
```

3. Replace `<username>` and `<password>` with your DB user (URL-encode special characters in the password)

---

## Step 5 — Set Render environment variables

Render → your service → **Environment** → add:

| Key | Value |
|-----|--------|
| `MONGO_URI` | Your Atlas connection string (see above) |
| `JWT_ACCESS_SECRET` | Random string, at least 32 characters |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://smart-leads-woad.vercel.app` |
| `PORT` | `4000` (optional; Render sets `PORT` automatically — check if your app uses `process.env.PORT`) |

**Do NOT use:**

```
mongodb://localhost:27017/smart-leads
```

---

## Step 6 — Redeploy

**Manual Deploy** → Deploy latest commit, or push a new commit.

---

## Step 7 — Update Vercel frontend

Vercel → Project → **Settings** → **Environment Variables**:

```
VITE_API_BASE_URL=https://YOUR-RENDER-SERVICE.onrender.com/api/v1
```

Redeploy the frontend.

---

## Verify

- `https://YOUR-RENDER-SERVICE.onrender.com/health` → `{ "status": "ok" }`
- Login on [smart-leads-woad.vercel.app](https://smart-leads-woad.vercel.app)
