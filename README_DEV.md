# PrepAI — Local Development Guide

Quick start to run the project locally (Windows/Unix shells):

## Prerequisites
- Node.js v18+
- npm
- MongoDB (local or Atlas)
- (Optional) Cloudinary account
- (Optional) Gemini API key for full AI features

## Backend — run locally
```bash
cd Backend
npm install
# create .env file with values (see sample below)
# .env example:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/interview-prep
# JWT_SECRET=your_jwt_secret
# GEMINI_API_KEY=your_gemini_key (optional)
# CLOUDINARY_CLOUD_NAME=...
# CLOUDINARY_API_KEY=...
# CLOUDINARY_API_SECRET=...

npm run dev
```

## Frontend — run locally
```bash
cd Frontend
npm install
# create .env with VITE_API_URL=http://localhost:5000/api
npm run dev
```

## Running tests (suggested)
- Backend unit/integration tests: `cd Backend && npm test`
- Frontend e2e tests: `cd Frontend && npx cypress open` (if configured)

## Notes
- If you do not have a Gemini API key, AI endpoints will use the fallback functions included in the backend.
- Do not run load tests against the real Gemini API to avoid unexpected costs — mock the AI client.
