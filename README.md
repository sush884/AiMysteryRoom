# AI Mystery Room

An interactive mystery investigation platform built with React, Express, MongoDB, and Google Gemini.

## Getting started

1. Install Node.js 20+ and MongoDB (local or hosted).
2. Copy `backend/.env.example` to `backend/.env`, set a long random `JWT_SECRET`, and add your Gemini API key. Update `MONGO_URI` if you use a hosted database.
3. From the project root, run `npm install` and `npm run dev`.
4. Open the Vite URL printed in the terminal (normally http://localhost:5173).

The frontend runs on port 5173 and the API on port 5000. Gemini generation requires a valid `GEMINI_API_KEY`. Generated cases and solutions are persisted separately; the solution is only returned after an accusation.

## Deploying to Vercel

Create two Vercel projects from this repository:

- **Frontend:** set the Root Directory to `frontend`. The Vite build outputs to `dist`; `frontend/vercel.json` enables client-side routes. Set `VITE_API_URL` to `https://ai-mystery-room-virid.vercel.app/api/v1` (or your backend's production domain plus `/api/v1`).
- **Backend:** set the Root Directory to `backend`. Add `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` as Vercel environment variables. Set `CLIENT_URL` to `https://ai-mystery-room-5j8e.vercel.app` (comma-separated origins are supported if you also have a custom domain). The serverless handler is in `backend/api/[...path].js`.

The production API health check is `<backend-domain>/api/v1/health`. Production auth cookies are configured for cross-origin requests, and the frontend API client sends credentials. Redeploy both projects after changing their settings or environment variables. Do not add secrets to the repository.

See [spec.md](spec.md) for the product source of truth and [DEVELOPMENT.md](DEVELOPMENT.md) for implementation status and next steps.
