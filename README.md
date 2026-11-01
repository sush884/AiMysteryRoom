# AI Mystery Room

An interactive mystery investigation platform built with React, Express, MongoDB, and Google Gemini.

## Getting started

1. Install Node.js 20+ and MongoDB (local or hosted).
2. Copy `backend/.env.example` to `backend/.env`, set a long random `JWT_SECRET`, and add your Gemini API key. Update `MONGO_URI` if you use a hosted database.
3. From the project root, run `npm install` and `npm run dev`.
4. Open the Vite URL printed in the terminal (normally http://localhost:5173).

The frontend runs on port 5173 and the API on port 5000. Gemini generation requires a valid `GEMINI_API_KEY`. Generated cases and solutions are persisted separately; the solution is only returned after an accusation.

See [spec.md](spec.md) for the product source of truth and [DEVELOPMENT.md](DEVELOPMENT.md) for implementation status and next steps.
