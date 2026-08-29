# Yugent

Yugent is an AI-powered career platform designed to help users improve their careers through resume analysis, interviews, career roadmaps, and other AI-driven career tools.

The project is built as a **full-stack microservice architecture** with a React frontend, API Gateway, authentication service, and dedicated backend services.

---

## 🚧 Project Status

**Current stage:** Active development

Implemented so far:

* React frontend with dashboard architecture
* Clerk authentication
* Authentication microservice
* API Gateway
* MongoDB persistence
* Redis infrastructure
* Redis-backed authentication sessions
* Resume Service
* AI-powered resume analysis
* Resume persistence in MongoDB
* Resume caching in Redis
* Protected backend routes
* Trusted user identity propagation from Gateway → services
* Dashboard routing
* Protected Resume route
* Initial Resume Scorer frontend
* shadcn/ui component architecture
* Interview Service (LangGraph + MongoDB + Redis)
* AI-powered HR / Technical interviews
* Interview frontend at /interview
* Interview Service dockerized behind the Gateway

The Resume frontend is implemented in the final Yugent design, and the Interview frontend is built and wired through the Gateway.

---

# 🏗️ Architecture

Yugent follows a gateway-based microservice architecture.

```text
                         ┌──────────────────┐
                         │     Frontend     │
                         │   React + Vite   │
                         └────────┬─────────┘
                                  │
                                  │ HTTP
                                  ▼
                         ┌──────────────────┐
                         │     Gateway      │
                         │    Port 8000     │
                         └────────┬─────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
      │ Auth Service│      │Resume Service│      │Interview Svc│
      │   :8001     │      │    :8002     │      │   :8003     │
      └──────┬──────┘      └──────┬──────┘      └──────┬──────┘
             │                    │
             └──────────┬─────────┘
                        │
                ┌───────┴────────┐
                │                │
                ▼                ▼
           ┌─────────┐      ┌─────────┐
           │ MongoDB │      │  Redis  │
           │   :27017│      │  :6379  │
           └─────────┘      └─────────┘
```

The browser communicates with the **Gateway**, not directly with individual backend services.

---

# 📁 Project Structure

The project is organized roughly as follows:

```text
yugent/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   └── ui/
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ResumePage.jsx
│   │   │   └── InterviewPage.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── AuthRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   │
│   │   ├── store/
│   │   └── utils/
│   │       └── axios.js
│   │
│   └── ...
│
├── backend/
│   │
│   ├── gateway/
│   │   ├── middleware/
│   │   ├── controllers/
│   │   ├── utils/
│   │   │   └── proxyWithHeaders.js
│   │   └── Dockerfile
│   │
│   ├── services/
│   │   ├── auth/
│   │   ├── resume/
│   │   ├── interview/
│   │   └── ...
│   │
│   └── shared/
│       └── redis/
│           └── redis.js
│
├── docker-compose.yml
└── README.md
```

---

# 🖥️ Frontend

The frontend is built using:

* React
* Vite
* React Router
* Clerk
* Redux/state management where required
* Axios
* Tailwind CSS
* shadcn/ui
* Lucide icons
* Sonner for notifications

The application uses a shared dashboard layout rather than creating separate layouts for each feature.

---

# 🔐 Authentication

Yugent uses **Clerk** for user authentication.

The important distinction is between:

```text
Clerk User ID
```

and:

```text
Yugent Application User ID
```

The Clerk ID identifies the user inside Clerk.

The Yugent application user ID is the `_id` of the user's MongoDB `User` document.

The application uses the **MongoDB User ID as the canonical internal identity** for backend ownership.

---

# 🔑 Authentication Flow

The current authentication architecture is:

```text
User
 │
 ▼
Clerk
 │
 │ Clerk User ID
 ▼
Auth Service
 │
 │ finds/creates Yugent User
 ▼
MongoDB User
 │
 │ Mongo User._id
 ▼
Redis Session
 │
 │ session:<sessionId>
 ▼
HTTP-only Session Cookie
 │
 ▼
Browser
 │
 ▼
Gateway
 │
 │ validates session
 │
 │ req.user.userId
 ▼
Backend Services
```

The frontend does **not** manually send the user's database ID.

---

# 🍪 Redis Authentication Sessions

Redis is used for server-side session caching.

A session is stored using a key similar to:

```text
session:<sessionId>
```

The cached session contains information such as:

```js
{
  userId,
  name,
  email,
  interviewCoin
}
```

The session has a TTL and is stored alongside an HTTP-only session cookie.

Redis failures do not intentionally break authentication when the system can fall back to the existing Clerk/MongoDB authentication flow.

---

# 💰 Interview Coins

The application maintains `interviewCoin` as part of the Yugent user's account.

MongoDB remains the source of truth for coin balance.

When the balance changes:

```text
MongoDB
   ↓
updated user balance
   ↓
Redis session refreshed
```

The frontend can read the current balance from the authenticated user/session state.

---

# 🚪 API Gateway

The Gateway runs on:

```text
http://localhost:8000
```

It acts as the single backend entry point for the frontend.

Example routing:

```text
/api/auth      → Auth Service
/api/resume    → Resume Service
/api/interview → Interview Service
/api/roadmap   → Roadmap Service
/api/billing   → Billing Service
/api/me        → authenticated user
```

The frontend should communicate with:

```text
/api/...
```

through the Gateway.

It should **not** directly communicate with:

```text
http://resume:8002
http://auth:8001
```

---

# 🛡️ Trusted Identity Propagation

Protected requests go through authentication in the Gateway.

The Gateway obtains the authenticated Yugent application user ID from the authenticated session.

It then forwards the trusted identity to downstream services.

For Resume requests, the important flow is:

```text
Clerk
 ↓
Authenticated Session
 ↓
Yugent Mongo User._id
 ↓
Gateway req.user.userId
 ↓
x-user-id
 ↓
Resume Service
```

The Resume Service must never rely on a browser-supplied user ID.

This prevents a client from attempting to access another user's resume by changing an ID in the request.

---

# 📄 Resume Service

The Resume Service is responsible for:

* Resume upload
* PDF processing
* AI resume analysis
* Resume persistence
* Resume retrieval
* Resume updates
* Resume deletion
* Redis caching

The service runs internally on:

```text
8002
```

The frontend accesses it through:

```text
/api/resume
```

via the Gateway.

---

# 🤖 Resume Analysis Flow

The current Resume Scorer flow is:

```text
User selects PDF
       │
       ▼
Frontend
       │
       │ POST /api/resume/upload
       ▼
Gateway
       │
       │ authenticate user
       │ attach trusted application user ID
       ▼
Resume Service
       │
       ▼
Extract resume text
       │
       ▼
AI Resume Agent
       │
       ▼
Resume Analysis
       │
       ├── score
       ├── suggestedRole
       ├── summary
       ├── skills
       ├── strengths
       ├── weaknesses
       ├── missingSkills
       └── recommendations
       │
       ▼
MongoDB
       │
       ▼
Redis cache
       │
       ▼
Response
       │
       ▼
Frontend
```

---

# 🗄️ Resume Persistence

MongoDB is the **source of truth** for Resume data.

A resume belongs to the authenticated Yugent application user.

Conceptually:

```text
User
 │
 └── Resume
      │
      ├── score
      ├── suggestedRole
      ├── summary
      ├── skills
      ├── strengths
      ├── weaknesses
      ├── missingSkills
      ├── recommendations
      └── extractedText
```

The Resume Service uses the trusted application user ID for ownership.

---

# ⚡ Resume Redis Cache

Redis is used as a cache for Resume data.

The cache key follows:

```text
resume:<applicationUserId>
```

The important rule is:

```text
application MongoDB User._id
```

is used for the Redis key.

The Clerk ID is **not** used as the Resume Redis identity.

---

# 🔄 Resume Cache Flow

When retrieving a resume:

```text
GET /api/resume
       │
       ▼
Resume Service
       │
       ▼
Redis
       │
       ├── HIT ──────→ return cached resume
       │
       └── MISS
             │
             ▼
          MongoDB
             │
             ▼
        repopulate Redis
             │
             ▼
        return resume
```

MongoDB remains the source of truth.

Redis is only a performance cache.

---

# 🧹 Cache Consistency

Resume mutations follow the general pattern:

```text
Create / Update
       │
       ▼
MongoDB
       │
       ▼
Redis updated
```

Delete:

```text
Delete MongoDB document
       │
       ▼
Invalidate Redis key
```

Redis errors should not incorrectly make a successful MongoDB operation appear to have failed.

---

# 🔒 Resume Security

The Resume Service must use the trusted identity supplied by the Gateway.

The client must not be able to override ownership by supplying:

```text
userId
x-user-id
```

or another identity value.

The intended security boundary is:

```text
Browser
   ↓
Clerk session
   ↓
Gateway authentication
   ↓
Trusted application identity
   ↓
Resume Service
```

---

# 🧭 Frontend Routing

The frontend currently uses React Router.

Public routes include:

```text
/
 /login/*
```

Authenticated routes include:

```text
/dashboard
/resume
```

Protected routes are wrapped using:

```text
ProtectedRoute
```

Public authentication-only pages can use:

```text
PublicRoute
```

The intended behavior is:

```text
Already signed in
       │
       ├── /
       │    ↓
       │  /dashboard
       │
       └── /login
            ↓
          /dashboard
```

Authenticated users can still directly access feature routes such as:

```text
/resume
```

---

# 📊 Dashboard

The dashboard uses a shared:

```text
DashboardLayout
```

with:

* Sidebar
* Header
* Main content area
* shadcn UI components
* responsive layout

Feature pages should live inside this dashboard architecture rather than creating separate application shells.

---

# 📄 Resume Scorer Frontend

The Resume Scorer has two main states.

## Empty State

When the user does not have a previous analysis:

```text
Resume Scorer

Get an AI-powered review of your resume.

┌───────────────────────────────┐
│                               │
│       Upload your resume      │
│                               │
│  Drag & drop or browse files  │
│                               │
│       PDF · Max 20 MB         │
│                               │
└───────────────────────────────┘

[ Analyze Resume ]
```

---

## Analysis State

After analysis:

```text
Resume Scorer

Resume Score
82 / 100
Strong

Suggested Role
Software Engineer

Summary

Strengths
- ...

Areas to improve
- ...

Skills
[React] [Node.js] ...

Missing Skills
[Docker] [AWS] ...

Recommendations
01 ...
02 ...
03 ...
```

The previous analysis should remain available whenever the user returns to the Resume page until a newer resume is uploaded.

---

# 🔔 Notifications

The frontend uses **Sonner** for toast notifications.

Examples:

```js
toast.success('Resume analyzed successfully.');
```

```js
toast.error('Unable to analyze your resume.');
```

Browser `alert()` should not be used for normal application feedback.

---

# 🐳 Docker

The project uses Docker Compose for local development.

Start the complete stack with:

```bash
docker compose up
```

Services currently include:

```text
auth
gateway
frontend
mongo
redis
resume
```

Check running services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

View a specific service:

```bash
docker compose logs -f gateway
```

```bash
docker compose logs -f resume
```

```bash
docker compose logs -f frontend
```

---

# 🔌 Local Ports

| Service        |            Port |
| -------------- | --------------: |
| Frontend       |          `5173` |
| Gateway        |          `8000` |
| Auth Service   |          `8001` |
| Resume Service | `8002` internal |
| MongoDB        |         `27017` |
| Redis          |          `6379` |

The Resume Service is intended to be accessed through the Gateway rather than directly from the browser.

---

# 🧪 Validation

Useful validation commands:

```bash
docker compose config
```

Build services:

```bash
docker compose build gateway resume frontend
```

Check running containers:

```bash
docker compose ps
```

Check Gateway:

```bash
curl http://localhost:8000/health
```

Check frontend:

```bash
curl -I http://localhost:5173
```

JavaScript syntax can be checked with:

```bash
node --check <file>
```

---

# 🔐 Environment Variables

Services use environment files for configuration.

Typical configuration includes:

```text
CLERK_SECRET_KEY
CLERK_PUBLISHABLE_KEY
MONGODB_URL
REDIS_URL
AUTH_SERVICE_URL
RESUME_SERVICE_URL
INTERVIEW_SERVICE_URL
ROADMAP_SERVICE_URL
BILLING_SERVICE_URL
FRONTEND_URL
AUTH_SERVICE_SECRET
```

Do not commit secrets or private `.env` values to Git.

Use environment-specific configuration for local development and production.

---

# 🚫 Architectural Rules

The following rules are important to the current architecture.

### Do not replace Clerk with Firebase

Clerk is the authentication provider.

### Do not use Clerk ID as the Mongo Resume ownership ID

Use the Yugent application's MongoDB User `_id`.

### Do not send user IDs from the frontend

Identity is determined by the authenticated Gateway session.

### Do not bypass the Gateway

Frontend requests should go through:

```text
Frontend → Gateway → Service
```

### Do not duplicate MongoDB as a second source of truth

MongoDB remains authoritative.

### Do not treat Redis as the primary database

Redis is a cache/session layer.

### Do not duplicate Redis clients unnecessarily

Shared Redis infrastructure should be reused where appropriate.

---

# 🧠 Redis vs Redux

These solve different problems.

## Redis

Backend infrastructure:

```text
Resume Service
      ↓
    Redis
```

Used for:

* authentication sessions
* Resume caching
* fast server-side data retrieval

## Redux

Frontend application state:

```text
React
  ↓
Redux
  ↓
Components
```

Used when frontend components need to share application state.

Redux does **not** replace MongoDB or Redis.

For example:

```text
MongoDB
   ↓
Redis
   ↓
GET /api/resume
   ↓
Redux / React state
   ↓
ResumePage
```

A browser refresh can clear normal Redux memory, but the Resume analysis remains available because it is persisted on the backend.

---

# 🛣️ Current Development Roadmap

The next major development areas are:

### Resume

* Finalize Resume Scorer visual design
* Improve upload experience
* Improve score visualization
* Improve analysis presentation
* Add polished empty/loading/error states
* Add re-analysis flow

### Interview

* Interview experience
* AI interviewer
* Interview history
* Interview evaluation

### Roadmap

* Career roadmap generation
* Skill progression
* Personalized career recommendations

### Dashboard

* Connect real user information
* Display interview coin balance
* Resume score
* Career progress
* Recent activity

### Billing

* Interview coin purchasing
* Payment integration
* Transaction history

---

# 🧩 Design Principles

Yugent aims for a clean, professional career-platform interface.

The frontend uses:

* restrained card usage
* subtle borders
* consistent spacing
* clear typography
* shadcn/ui primitives
* Lucide icons
* responsive layouts
* meaningful visual hierarchy

Avoid unnecessary:

* excessive gradients
* excessive shadows
* glassmorphism
* decorative animations
* duplicated UI patterns
* unrelated design systems

New pages should feel like part of the same Yugent product.

---

# 📌 Current Architecture Summary

The core architecture is:

```text
                    YUGENT

                      User
                       │
                       ▼
                    Clerk
                       │
                       ▼
                Auth Service
                       │
                       ▼
                 MongoDB User
                       │
                       ▼
                 Redis Session
                       │
                       ▼
                HTTP-only Cookie
                       │
                       ▼
                    Browser
                       │
                       ▼
                  React/Vite
                       │
                       ▼
                    Gateway
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
      Auth           Resume        Interview
     Service         Service        Service
                       │
                 ┌─────┴─────┐
                 ▼           ▼
              MongoDB      Redis
              Source       Cache
              of Truth
```

The guiding principle is:

> **Clerk authenticates the user, MongoDB identifies the Yugent user, Redis accelerates frequently accessed server data, and the Gateway controls access to backend services.**

---

## 🚀 Running Yugent

Start the complete application:

```bash
docker compose up
```

Then open:

```text
http://localhost:5173
```

For frontend-only development:

```bash
cd frontend
npm run dev
```

The frontend communicates with the Gateway at:

```text
http://localhost:8000
```

---

## 📜 License

This project is currently under development. Licensing information will be added when the project is ready for release.
