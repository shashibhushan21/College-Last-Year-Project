# Test Plan — PrepAI

This test plan includes unit, integration, and end-to-end test cases plus commands to run them locally.

## 1. Unit Tests (suggested)
- Framework: Jest
- Focus: controllers, fallback logic, utilities

Examples:
- `auth.controller`:
  - should register a user with valid details (mock User.create)
  - should not register duplicate email
  - should login with correct credentials
- `resume.controller`:
  - should parse PDF content using mocked `pdf-parse`
  - should handle unsupported file types
- `ai.controller`:
  - should generate fallback questions when no API key
  - should parse AI JSON response correctly when well-formed

Run command (backend):
```bash
cd Backend
npm install
# add jest devDependency if missing
npx jest --runInBand
```

## 2. Integration Tests
- Framework: Supertest + Jest
- Tests spin up an express app against an in-memory MongoDB (mongodb-memory-server)

Test cases:
- POST /api/auth/register -> expect 201 and token
- POST /api/auth/login -> expect 200 and token
- POST /api/resume/upload (mock file) -> expect 200 and resumeText
- Full interview flow: generate questions -> submit answers for each -> complete interview -> verify interview stored with status `completed`

Sample test flow pseudocode:
```js
const request = require('supertest');
const app = require('../server');

describe('Full interview flow', () => {
  it('registers, uploads resume, runs interview, and completes', async () => {
    const reg = await request(app).post('/api/auth/register').send({name:'T', email:'t@test.com', password:'123456'});
    const token = reg.body.token;
    // upload resume (mock multipart)
    // generate questions
    // submit answers
    // complete interview
    // assert interview saved and user.stats updated
  });
});
```

## 3. End-to-End Tests (E2E)
- Framework: Cypress
- Scenarios:
  - User registers, uploads resume, starts and completes interview, views feedback
  - Login and dashboard visualization

Run command (frontend):
```bash
cd Frontend
npm install
npx cypress open
```

## 4. Manual Test Checklist
- Register with a new email (input validation tests)
- Upload a PDF resume (check server parses and stores resumeText)
- Start a Technical interview with 5 questions (observe chat flow)
- Submit short answers (observe fallback scoring)
- Finish and view feedback page, check dashboard stats update

## 5. Performance Tests
- Tool: k6 or Artillery
- Target: simulate 20 concurrent users starting interview generation (will call external AI in production)
- Important: When load testing, mock or disable real Gemini API to avoid cost

Example k6 script outline (conceptual):
```js
import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
  const login = http.post('http://localhost:5000/api/auth/login', JSON.stringify({email:'load@test.com', password:'pass'}), {headers:{'Content-Type':'application/json'}});
  const token = login.json().token;
  const res = http.post('http://localhost:5000/api/ai/questions', JSON.stringify({category:'Technical', count:3}), {headers:{'Authorization':`Bearer ${token}`, 'Content-Type':'application/json'}});
  sleep(1);
}
```

## 6. Mocking External Services
- For reliable CI tests, mock:
  - `@google/generative-ai` client (Gemini)
  - Cloudinary uploads

## 7. CI Test Steps
- `npm test` for backend
- `npm run lint` for frontend
- Optional: run e2e tests in a separate job against a deployed test environment


