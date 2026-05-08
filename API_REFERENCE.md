# API Reference — PrepAI

This file lists the main API endpoints for PrepAI with example `curl` commands and sample JSON responses.

Base URL (development): `http://localhost:5000/api`

---

## Authentication

### POST /api/auth/register
Request:
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Alice Example",
  "email": "alice@example.com",
  "password": "strongpassword"
}
```

Example curl:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Example","email":"alice@example.com","password":"strongpassword"}'
```

Success response (201):
```json
{
  "token": "<jwt-token>",
  "user": {"_id":"...","name":"Alice Example","email":"alice@example.com","avatar":"","resumeText":"","resumeFileName":"","totalInterviews":0,"averageScore":0}
}
```


### POST /api/auth/login
Request:
```
POST /api/auth/login
Content-Type: application/json

{
  "email":"alice@example.com",
  "password":"strongpassword"
}
```

Example curl:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"strongpassword"}'
```

Success response (200):
```json
{
  "token":"<jwt-token>",
  "user": {"_id":"...","name":"Alice Example","email":"alice@example.com",...}
}
```

### GET /api/auth/me
Headers: `Authorization: Bearer <token>`

Example curl:
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

Success response (200):
```json
{ "user": {"_id":"...","name":"Alice Example","email":"alice@example.com","resumeText":"..."} }
```

---

## Resume

### POST /api/resume/upload
- Accepts `multipart/form-data` with field name `resume` (PDF or DOCX)
- Protected route: requires `Authorization` header

Example curl:
```bash
curl -X POST http://localhost:5000/api/resume/upload \
  -H "Authorization: Bearer <token>" \
  -F "resume=@/path/to/resume.pdf"
```

Success response (200):
```json
{
  "message":"Resume uploaded and parsed successfully",
  "resumeText":"<extracted text preview...>",
  "resumeFileName":"<uploaded-file-or-cloudinary-url>"
}
```

### GET /api/resume
- Returns stored `resumeText` and `resumeFileName`

Example curl:
```bash
curl http://localhost:5000/api/resume -H "Authorization: Bearer <token>"
```

Success (200):
```json
{ "resumeText":"...", "resumeFileName":"..." }
```

---

## AI Interview Endpoints

All AI endpoints are protected and require a valid token.

### POST /api/ai/questions
Body JSON: `{ "category": "Technical", "count": 5 }`

Example curl:
```bash
curl -X POST http://localhost:5000/api/ai/questions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"category":"Technical","count":5}'
```

Success response (200):
```json
{
  "interviewId": "<interview-id>",
  "questions": [ {"question":"...","difficulty":"medium","category":"Technical"}, ... ],
  "totalQuestions": 5
}
```

### POST /api/ai/feedback
Body JSON: `{ "interviewId": "...", "questionIndex": 0, "answer": "...", "question": "..." }`

Example curl:
```bash
curl -X POST http://localhost:5000/api/ai/feedback \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"interviewId":"<id>","questionIndex":0,"answer":"My answer...","question":"Explain closures"}'
```

Success (200): sample feedback object
```json
{
  "score": 7,
  "feedback": "Your answer explained closures with an example...",
  "strengths": ["Clear example"],
  "weaknesses": ["Omitted edge-case details"],
  "suggestions": ["Explain use-cases"],
  "idealAnswer": "Brief ideal answer outline"
}
```

### POST /api/ai/complete
Body JSON: `{ "interviewId": "..." }`

Example curl:
```bash
curl -X POST http://localhost:5000/api/ai/complete \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"interviewId":"<id>"}'
```

Success (200):
```json
{
  "overallScore": 6.4,
  "strengths": [...],
  "weaknesses": [...],
  "suggestions": [...],
  "summary":"...",
  "interviewId":"<id>",
  "questionsAnswered": 5,
  "totalQuestions": 5
}
```

---

## Dashboard

### GET /api/dashboard/stats
Example curl:
```bash
curl http://localhost:5000/api/dashboard/stats -H "Authorization: Bearer <token>"
```

Success (200):
```json
{
  "totalInterviews": 3,
  "averageScore": 7.2,
  "bestScore": 9,
  "scoreHistory": [ {"name":"Interview 1","score":6}, ... ],
  "topStrengths": [{"name":"Clear examples","count":2}],
  "topWeaknesses": [{"name":"Conciseness","count":1}],
  "recentInterviews": [{"_id":"...","category":"Technical","overallScore":6.4,...}],
  "hasResume": true
}
```

### GET /api/dashboard/interview/:id
Example curl:
```bash
curl http://localhost:5000/api/dashboard/interview/<id> -H "Authorization: Bearer <token>"
```

Success (200): interview full document (see `interviews` schema in repo)

---

## Notes
- All endpoints return a JSON object with `message` on errors; check `error.message` for server exceptions.
- For local development without Gemini key, AI endpoints will use fallback logic; the response schema remains compatible.


