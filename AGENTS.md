# Yugent AI Agent Context

This file is the architectural source of truth for AI coding agents working on Yugent.

Read this before modifying the project.

---

## 1. Project

Yugent is an AI-powered career platform.

Current backend architecture:

Frontend
→ API Gateway
→ Backend Services
→ MongoDB / Redis / AI services

Current major services:

- Gateway
- Auth Service
- Resume Service
- Interview Service
- Roadmap Service
- Billing Service

---

## 2. Core Architecture

The frontend communicates with backend services through the Gateway.

Correct:

Frontend
→ Gateway
→ Service

Incorrect:

Frontend
→ Resume Service directly

Frontend
→ Interview Service directly

Do not bypass the Gateway unless explicitly required.

---

## 3. Authentication

Yugent uses Clerk for authentication.

Clerk authenticates the user.

Yugent maintains its own application User record.

IMPORTANT:

Clerk User ID and Yugent application User ID are different concepts.

Do not assume they are interchangeable.

The canonical application identity must follow the existing Auth → Redis Session → Gateway architecture.

---

## 4. User Identity Flow

The intended identity flow is:

Clerk
→ Auth Service
→ Yugent User
→ Redis session
→ HTTP-only session cookie
→ Gateway
→ authenticated request
→ trusted application user identity
→ backend service

Protected services must never trust a userId supplied directly by the browser.

The Gateway is responsible for establishing trusted identity.

Backend services should use the same identity header convention established by the existing Resume Service/Gateway implementation.

Before changing identity handling, inspect:

- backend/gateway/middleware/isAuth.js
- backend/gateway/utils/proxyWithHeaders.js
- backend/services/auth/
- backend/services/resume/

Do not invent a new identity header.

---

## 5. User Identity

Yugent currently uses the Clerk User ID as the canonical identity
for Resume and Interview ownership.

Example:

user_xxx

The Gateway authenticates the Clerk session and obtains:

req.userId

The Gateway strips any client-supplied identity headers and injects:

x-clerk-user-id: req.userId

Protected backend services such as Resume and Interview read this
trusted header.

Current flow:

Clerk User ID
→ Gateway req.userId
→ x-clerk-user-id
→ Backend Service
→ MongoDB userId
→ Redis key

IMPORTANT:

The Clerk User ID is NOT the same as MongoDB User._id.

The MongoDB User._id exists in the Auth Service, but the current
Gateway does not resolve/forward it to Resume or Interview.

Therefore:

Resume.userId = Clerk User ID
Interview.userId = Clerk User ID

Both are stored as String.

Do not migrate services to MongoDB User._id unless explicitly requested
as a separate architectural migration.
## 6. Data Storage

MongoDB:

- Source of truth.
- Permanent application data.
- User records.
- Resume records.
- Interview records.

Redis:

- Cache and session layer.
- Not the source of truth.
- Redis failure should not incorrectly make a successful MongoDB operation appear unsuccessful.

Redux:

- Frontend state only.
- Does not replace MongoDB.
- Does not replace Redis.

---

## 7. Redis Key Conventions

Authentication sessions:

session:<sessionId>

Resume cache:

resume:<clerkUserId>

Interview cache:

interviews:<clerkUserId>

Resume and Interview currently use the trusted Clerk User ID
forwarded through x-clerk-user-id.
## 8. Gateway

The Gateway is the public backend entry point.

Typical routing:

/api/auth
→ Auth Service

/api/resume
→ Resume Service

/api/interview
→ Interview Service

/api/roadmap
→ Roadmap Service

/api/billing
→ Billing Service

/api/me
→ authenticated current-user endpoint

The frontend should use `/api/...` routes through the Gateway.

---

## 9. Resume Service

Purpose:

AI-powered resume analysis.

Flow:

Frontend
→ Gateway
→ Resume Service
→ PDF extraction
→ AI analysis
→ MongoDB
→ Redis cache
→ response
→ Frontend

MongoDB is the source of truth.

Redis caches the user's latest resume analysis.

Cache key:

resume:<applicationUserId>

A newly analyzed resume replaces/updates the user's existing analysis.

Resume ownership must always come from trusted authenticated identity.

The frontend must not provide the ownership userId.

---

## 10. Interview Service

Purpose:

AI-powered technical/HR interviews.

LangGraph is used as the AI workflow/orchestration layer.

Basic flow:

Frontend
→ Gateway
→ Interview Service
→ LangGraph
→ AI-generated questions
→ user answers
→ AI feedback
→ final report
→ MongoDB
→ Redis

Interview Service currently receives resume analysis as AI context when starting an interview.

The frontend may provide resume context in the interview-start request.

Interview Service should NOT introduce a direct dependency on Resume Service unless explicitly requested.

Resume context is not automatically Interview ownership.

Interview ownership must come from authenticated identity.

Interview Service status (current):

- Dockerized as the `interview` service (container `yugent-interview`) on port 8003, reached only through the Gateway at `/api/interview/*`. It is NOT exposed to the host.
- Reuses the shared Redis client (`shared/redis/redis.js`) and the same Mongoose connection pattern as the Resume Service. Redis is best-effort cache only (`interviews:<clerkUserId>`); Redis failures must not make successful MongoDB writes appear failed.
- Frontend implemented at `frontend/src/pages/InterviewPage.jsx`, mounted at the protected `/interview` route, using local React state (no new Redux slice). The avatar uses `frontend/src/assets/male-ai.mp4` (visual only).
- HR vs Technical prompts (`prompts/hrInterviewPrompt.js`, `prompts/technicalInterviewPrompt.js`) share the same 6-question `{ question, difficulty, timer }` shape but differ in persona, topic coverage, difficulty curve, and timer ranges.

---

## 10a. Roadmap Service

Purpose:

AI-generated personalized career learning roadmaps.

LangGraph is used as the AI workflow/orchestration layer (roadmap generation, then a resource agent attaches learning links).

Basic flow:

Frontend
→ Gateway
→ Roadmap Service
→ LangGraph
→ AI-generated roadmap (role, target package, modules)
→ resource agent attaches YouTube + documentation links
→ MongoDB
→ Redis cache

Roadmap Service status (current):

- Dockerized as the `roadmap` service (container `yugent-roadmap`) on port 8004, reached only through the Gateway at `/api/roadmap/*`. It is NOT exposed to the host.
- Reuses the shared Redis client (`shared/redis/redis.js`) and the same Mongoose connection pattern as the Resume/Interview Services. Redis is best-effort cache only (`roadmaps:<clerkUserId>` for the user list, `roadmap:<clerkUserId>:<id>` for a single roadmap); Redis failures must not make successful MongoDB writes appear failed.
- Identity follows the Yugent convention: the Gateway injects `x-clerk-user-id`; the controller derives ownership exclusively from that trusted header (never from request bodies or `x-user-id`). `userId` is stored as a String (Clerk User ID), not an ObjectId.
- LLM uses Groq via `@langchain/groq`, model from `GROQ_MODEL` (defaults to `llama-3.3-70b-versatile`).
- The resource agent calls the YouTube Data API (`YOUTUBE_API_KEY`); this is best-effort and degrades gracefully when the key is absent.
- Frontend not yet implemented (deferred).

---

## 11. LangGraph

LangGraph controls the multi-step interview AI workflow.

Conceptually:

Start
→ generate questions
→ ask question
→ evaluate answer
→ generate feedback
→ next question
→ repeat
→ final report

Do not move interview workflow logic into the HTTP controller unnecessarily.

The controller should coordinate HTTP input/output, persistence, and graph invocation.

---

## 12. Frontend

Frontend stack:

- React
- Vite
- React Router
- Clerk
- Axios
- Tailwind CSS
- shadcn/ui
- Lucide icons
- Sonner
- Redux where shared frontend state is required

Authenticated pages use `ProtectedRoute`.

Public authentication pages use `PublicRoute` where appropriate.

Dashboard pages use the shared `DashboardLayout`.

---

## 13. Frontend State vs Backend Persistence

Do not use Redux/local state as the source of truth for persistent application data.

Example Resume flow:

MongoDB
→ Redis cache
→ GET /api/resume
→ React/Redux
→ UI

A browser refresh must be able to restore the resume through the backend.

Redux only represents frontend state.

---

## 14. API Identity Rule

Never do this:

POST /api/resume/upload
{
  userId: "..."
}

Never do this:

GET /api/resume/:userId

unless explicitly required by a new architecture.

Prefer:

POST /api/resume/upload

GET /api/resume

GET /api/interview

The backend determines ownership from authenticated identity.

---

## 15. Security Rules

Never trust:

- browser-supplied userId
- browser-supplied x-user-id
- browser-supplied x-clerk-user-id
- resume.userId
- interview.userId
- AI-generated userId

The Gateway must strip client-supplied identity headers and inject:

x-clerk-user-id = authenticated Clerk user ID

Backend services must derive ownership exclusively from this trusted
Gateway identity.

## 16. Tutorial Migration Rule

Some services originate from tutorials.

Tutorial architecture is NOT the source of truth.

Yugent architecture is the source of truth.

Do not introduce:

- Firebase
- Firebase Auth
- duplicate User models
- duplicate Redis clients
- duplicate databases
- tutorial-specific service URLs
- tutorial-specific ports
- tutorial-specific authentication
- unnecessary service-to-service HTTP calls

Before adapting tutorial code:

1. Inspect an existing Yugent service.
2. Identify its conventions.
3. Compare the tutorial assumptions.
4. Adapt the tutorial code to Yugent.
5. Preserve Yugent architecture.

---

## 17. Change Discipline

Keep changes focused.

Do not modify unrelated services.

Do not modify Docker/docker-compose unless explicitly requested.

Do not modify frontend when the task is backend-only.

Do not modify backend when the task is frontend-only.

Do not rewrite working architecture simply to match a tutorial.

Prefer minimal changes that follow existing project conventions.

---

## 18. Before Making Architectural Changes

If an implementation requires something that Yugent does not currently have:

STOP and explain the gap.

Do not silently invent:

- a new database
- a new model
- a new authentication flow
- a new service
- a new queue
- a new identity system
- a new service-to-service communication pattern

Ask before introducing a major architectural dependency.

---

## 19. Validation

After modifying code:

- Run syntax checks.
- Run available tests.
- Verify affected API routes.
- Verify Docker configuration only when Docker changes are explicitly part of the task.
- Verify identity ownership.
- Verify Redis/Mongo consistency where applicable.
- Inspect git diff.
- Report exactly what changed.

Do not claim an integration test passed if it was not actually executed.

---

## 20. Current Development Direction

Current development priority:

1. Stabilize backend services.
2. Complete Interview Service.
3. Understand and integrate LangGraph.
4. Build Interview frontend.
5. Integrate talking interviewer/avatar experience.
6. Continue Dashboard integration.
7. Build remaining career features.

Always preserve the existing Yugent architecture while extending functionality.
