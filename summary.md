# AI Mystery Room — Specification Summary

## Product
AI Mystery Room is a full-stack platform for turning a user's fictional scenario into an interactive detective investigation. Players review evidence, take notes, identify contradictions, accuse one suspect, and then see the outcome and complete explanation.

## Core workflow
1. User registers or logs in.
2. User submits a scenario with category, difficulty, and 3–6 suspects (plus optional title, setting, and instructions).
3. Backend validates the request and asks Google Gemini for structured case data, suspects, timeline, evidence, and exactly one solution.
4. Backend validates consistency, keeps the culprit and solution private, and saves the case to MongoDB.
5. User investigates the case, reviews evidence, and saves notes.
6. User submits one accusation; backend checks ownership, evaluates it, stores the result, and reveals the solution.
7. User can review case history and results from the dashboard.

## MVP scope
- Registration, login, and protected user data.
- Scenario submission and Gemini-generated mysteries with multiple suspects.
- Text evidence: WhatsApp conversations, witness statements, and documents.
- Evidence locker and persistent investigation notes.
- One-time suspect accusation, evaluation, full solution reveal, and investigation history.
- Images and audio are later enhancements; the core evidence model should support them.

## Technology and architecture
- Frontend: React, Tailwind CSS, Framer Motion, React Context, Axios.
- Backend: Node.js, Express, modular routes/controllers/services, JavaScript.
- Data: MongoDB with Mongoose.
- AI: Google Gemini, called only from the backend.
- Security and validation: JWT, bcrypt, Zod or equivalent.
- Assets: Cloudinary or compatible storage for image/audio assets.
- Keep the MVP in one modular Express backend; do not replace required functionality with hardcoded mock data.

## Main data areas and APIs
Data includes users, mysteries/public case details, evidence, private case solutions, investigation results, and user-owned notes. Enforce unique email and one result per user/mystery. Keep solutions in a private collection inaccessible through public routes.

API groups under `/api/v1` cover authentication; mystery generation/list/detail/delete; evidence listing/detail; notes CRUD; accusation and result; and dashboard statistics/history. Authenticate protected routes, validate requests, verify ownership, return consistent responses, and rate-limit APIs.

## Essential product and security rules
- Every case has exactly one culprit, who is among the generated suspects.
- Cases must be fictional, coherent, solvable, and supported by meaningful evidence; red herrings are allowed.
- Never reveal the culprit or private solution before accusation submission, and never expose it through public APIs.
- Users can access only their own cases and notes. A completed case cannot be accused again in the initial release.
- Keep credentials in backend environment variables; never expose Gemini keys or commit `.env` files.
- Handle AI, validation, database, and asset failures safely. Failed image/audio generation must not corrupt a case.
- Do not show fake dashboard statistics or present generated material as authentic police evidence.

## UX direction
Use a responsive dark detective interface with gold accents, reusable components, evidence previews, and clear loading, empty, success, and error states. Pages include landing, authentication, mystery creation, dashboard/history, investigation room, suspect/evidence views, accusation, and case resolution.

## Development approach
Treat `spec.md` as the single source of truth. Implement incrementally by phase: project/database setup, authentication, creation UI, Gemini and text evidence generation, investigation room, accusation/resolution, dashboard/history, then image/audio, polish, and deployment. For each feature: review requirements and code, plan, implement, validate against the spec, run relevant tests, update `DEVELOPMENT.md`, and only then mark complete. Preserve existing behavior and do not silently change product requirements or the stack.

## Completion target
Users can securely create and investigate AI-generated fictional cases, examine evidence and save notes, submit an accusation, receive a correct evaluation and full solution, and revisit stored results—while private solutions and user data remain protected and the app works responsively with graceful error handling.
