# Project Report

## PREPAI - AI-BASED INTERVIEW PREPARATION PLATFORM

Submitted in partial fulfillment of the requirements for the award of the degree of

**BACHELOR OF TECHNOLOGY**

in

**COMPUTER SCIENCE & ENGINEERING**

Submitted by

**Shashi Bhushan Kumar**

**Ujjwal Ranjan**

Regd. No.: **2201219093** and **2201219117**

Under the supervision of

**[Supervisor Name]**

Department of Computer Science & Engineering

College of Engineering Bhubaneswar

(Affiliated to Biju Patnaik University of Technology)

Bhubaneswar, Odisha

---

## Declaration

We hereby declare that the project report titled **"PrepAI - AI-Based Interview Preparation Platform"** is our original work and has been prepared by us under the supervision of our project guide. The work presented in this report has not been submitted elsewhere for the award of any degree or diploma.

The report is based on the design, development, and implementation of a full-stack web application that helps users prepare for interviews using resume-based AI question generation, chat-style mock interviews, and performance feedback.

Date: [Date]  
Place: Bhubaneswar  
Signatures: ____________________

---

## Certificate

This is to certify that the project entitled **"PrepAI - AI-Based Interview Preparation Platform"** submitted by **Shashi Bhushan Kumar** and **Ujjwal Ranjan** is approved for the partial fulfillment of the award of the degree of Bachelor of Technology in Computer Science & Engineering from College of Engineering Bhubaneswar, under Biju Patnaik University of Technology, Odisha.

Project Guide: ____________________  
HOD: ____________________  
External Examiner: ____________________

---

## Acknowledgement

We express our sincere gratitude to our project guide, faculty members, and the Department of Computer Science & Engineering for their continuous support, valuable suggestions, and encouragement throughout the development of this project.

We are also thankful to our college for providing the infrastructure and academic environment needed to complete this work. Special thanks are due to the open-source community and the documentation of the tools and libraries used in this project, including React, Node.js, Express, MongoDB, Mongoose, Multer, Cloudinary, and Google Generative AI.

Finally, we would like to thank our family and friends for their motivation and support during the completion of this report.

---

## Abstract

Interview preparation is one of the most important steps in the transition from education to employment, yet many learners struggle to get personalized feedback and realistic practice. Traditional preparation methods often rely on static question lists, generic mock sessions, or expensive coaching. PrepAI addresses this gap by providing an AI-based interview preparation platform that converts a user's resume into a personalized mock interview experience.

The system is built using the MERN stack with a React frontend, an Express and Node.js backend, and MongoDB for persistent storage. Users can register securely, upload a PDF or DOCX resume, generate interview questions using Google Gemini, answer in a chat-style interface, and receive instant scoring with strengths, weaknesses, and improvement suggestions. A dashboard tracks past interview attempts and shows score trends, strengths, and weak points.

The application demonstrates a complete full-stack workflow that combines secure authentication, resume parsing, AI-driven content generation, live feedback, and performance analytics. It is designed to be responsive, maintainable, and extensible for future features such as voice interviews, video-based evaluation, and richer skill analytics.

---

## Flow of the Report

The sample report follows a standard academic sequence: front matter, declaration, certificate, acknowledgement, abstract, table of contents, core chapters, conclusion, and references. This PrepAI report keeps the same structure but adapts each chapter to the actual project.

The flow used in this report is:

1. Title page and academic details
2. Declaration
3. Certificate
4. Acknowledgement
5. Abstract
6. Report flow and table of contents
7. Chapter 1: Introduction
8. Chapter 2: Literature Review
9. Chapter 3: System Requirements
10. Chapter 4: System Design and Architecture
11. Chapter 5: Database Design
12. Chapter 6: Backend and AI Implementation
13. Chapter 7: Frontend Implementation
14. Chapter 8: Security Implementation
15. Chapter 9: Testing and Validation
16. Chapter 10: Results and Discussion
17. Chapter 11: Future Enhancements
18. Chapter 12: Conclusion
19. References

---

## Table of Contents

Declaration  
Certificate  
Acknowledgement  
Abstract  
Flow of the Report  

Chapter 1: Introduction  
1.1 Background and Context  
1.2 Problem Statement  
1.3 Project Objectives  
1.4 Scope of the Project  
1.5 Organization of the Report  

Chapter 2: Literature Review  
2.1 Interview Preparation Challenges  
2.2 AI-Based Learning Systems  
2.3 Resume Parsing and Natural Language Processing  
2.4 Related Web Platforms  
2.5 Summary  

Chapter 3: System Requirements  
3.1 Functional Requirements  
3.2 Non-Functional Requirements  
3.3 Hardware and Software Requirements  

Chapter 4: System Design and Architecture  
4.1 Architectural Overview  
4.2 Component Architecture  
4.3 Data Flow  
4.4 AI Interaction Flow  
4.5 Security Architecture  

Chapter 5: Database Design  
5.1 Database Technology Selection  
5.2 Schema Design  
5.3 Entity Relationship Description  
5.4 Indexing and Data Consistency  

Chapter 6: Backend and AI Implementation  
6.1 Project Setup and Configuration  
6.2 Authentication and User Management  
6.3 Resume Upload and Parsing  
6.4 AI Question Generation and Feedback  
6.5 Dashboard and Result APIs  

Chapter 7: Frontend Implementation  
7.1 Application Structure  
7.2 Authentication Pages  
7.3 Dashboard Page  
7.4 Resume Upload Page  
7.5 Interview Page  
7.6 Feedback Page  

Chapter 8: Security Implementation  
8.1 JWT Authentication  
8.2 Password Hashing  
8.3 Route Protection  
8.4 File Validation  
8.5 AI and API Safety Controls  

Chapter 9: Testing and Validation  
9.1 Functional Testing  
9.2 API Validation  
9.3 Resume Parsing Validation  
9.4 Interview Flow Validation  

Chapter 10: Results and Discussion  
Chapter 11: Future Enhancements  
Chapter 12: Conclusion  
References

---

## Chapter 1: Introduction

### 1.1 Background and Context

Interview preparation has become more demanding as job roles now expect both technical depth and strong communication skills. Many students know their subjects but do not get enough practice in realistic interview situations. Existing preparation methods often provide only generic questions, limited feedback, or no personalized evaluation at all.

PrepAI was developed to solve this gap by using a resume-driven AI workflow. Instead of giving every user the same set of questions, the system studies the user's uploaded resume, identifies the likely skills and experience areas, and creates a customized interview session. The result is a more focused and relevant preparation experience.

### 1.2 Problem Statement

The main problem addressed by this project is the lack of personalized, affordable, and interactive interview preparation tools for students and job seekers. Traditional coaching can be expensive, while self-study often lacks structured feedback. Static question banks also fail to adapt to the user's background.

There is a need for a web application that can:

- accept a resume in PDF or DOCX format,
- extract relevant information automatically,
- generate targeted interview questions,
- evaluate user answers in real time,
- and provide a clear summary of strengths and weaknesses.

### 1.3 Project Objectives

The objectives of the project are to:

- build a secure full-stack interview preparation platform,
- automate resume parsing and skill extraction,
- generate personalized interview questions using AI,
- provide immediate answer feedback and scoring,
- maintain interview history and performance metrics,
- and deliver a responsive user interface for desktop and mobile users.

### 1.4 Scope of the Project

The current version of PrepAI focuses on resume-based interview practice. It supports user registration, login, resume upload, AI question generation, chat-style answering, answer feedback, and dashboard analytics.

#### 1.4.1 In Scope

- user account creation and authentication,
- resume upload in PDF and DOCX formats,
- resume parsing and text extraction,
- AI-generated interview questions,
- per-answer feedback and scoring,
- final interview summary and dashboard insights.

#### 1.4.2 Out of Scope

- live video interviews,
- speech-to-text voice evaluation,
- company-specific ATS integration,
- external recruiter management,
- and collaborative interview scheduling.

### 1.5 Organization of the Report

This report begins with the background and requirements of the system, then explains architecture, database design, backend and frontend implementation, security, testing, and final results. It concludes with possible future enhancements that can extend the platform beyond its current scope.

---

## Chapter 2: Literature Review

### 2.1 Interview Preparation Challenges

Interview preparation usually involves practicing behavioral questions, technical questions, and role-specific scenarios. However, candidates often do not know which topics to focus on, and they may not receive structured feedback on their answers. This creates a gap between knowledge and interview performance.

### 2.2 AI-Based Learning Systems

AI-based learning systems can adapt content to the user context. In interview preparation, AI can analyze a resume, infer likely skills, and generate questions that reflect the candidate's profile. This makes the practice session more realistic than a fixed set of questions.

### 2.3 Resume Parsing and Natural Language Processing

Resume parsing is an important step in personalization. By extracting text from PDF or DOCX files, the application can identify experience, skills, technologies, and project keywords. Natural language processing helps AI systems create relevant prompts and meaningful feedback.

### 2.4 Related Web Platforms

Modern preparation platforms such as interview practice tools, job portals, and skill-assessment sites demonstrate the value of guided practice and progress tracking. PrepAI combines these ideas into one focused application by linking resume data, interview generation, and scoring in a single workflow.

### 2.5 Summary

The review shows that users benefit most from personalized practice, quick feedback, and progress tracking. PrepAI builds on these ideas by combining AI generation, resume analysis, and a user-friendly interface.

---

## Chapter 3: System Requirements

### 3.1 Functional Requirements

The system supports the following functions:

- user registration and login,
- JWT-based session handling,
- resume upload and parsing,
- storage of parsed resume text,
- AI question generation based on resume and selected category,
- answer submission and feedback generation,
- interview completion and overall score calculation,
- dashboard statistics and recent interview history,
- and detailed feedback review for each interview session.

### 3.2 Non-Functional Requirements

#### 3.2.1 Security

Passwords must be hashed before storage, protected routes must verify JWT tokens, and file uploads must be restricted to valid document formats.

#### 3.2.2 Performance

The system should respond quickly to user actions, reuse cached session data where possible, and keep the interview flow smooth even when AI fallback logic is used.

#### 3.2.3 Usability

The interface should be easy to understand, responsive on different screen sizes, and simple enough for first-time users to upload a resume and begin practice.

#### 3.2.4 Maintainability

The project should follow a modular architecture with separate routes, controllers, models, services, and pages so that new features can be added without major restructuring.

### 3.3 Hardware and Software Requirements

#### 3.3.1 Development Environment

- Node.js runtime
- MongoDB database
- React frontend with Vite
- Express backend
- Cloudinary for document storage
- Google Gemini API for AI generation

#### 3.3.2 Production Environment Recommendations

- cloud-hosted backend service,
- managed MongoDB instance,
- secure environment variables,
- and file storage or object storage for uploaded resumes.

---

## Chapter 4: System Design and Architecture

### 4.1 Architectural Overview

PrepAI follows a client-server architecture. The React frontend handles the user interface, while the Express backend exposes REST APIs for authentication, resume handling, AI interaction, and dashboard analytics. MongoDB stores user and interview records.

### 4.2 Component Architecture

#### 4.2.1 Frontend Components

The frontend includes a landing page, login and registration forms, dashboard analytics, resume upload screen, interview chat screen, and feedback screen. Shared UI elements such as the navbar and protected route wrapper control access.

#### 4.2.2 Backend Components

The backend is split into routes, controllers, middleware, and models. The route layer defines API paths, controllers contain business logic, middleware protects secure endpoints and handles uploads, and models describe MongoDB documents.

### 4.3 Data Flow

The data flow begins when a user registers or logs in. After authentication, the user uploads a resume. The backend extracts the document text, saves it to the user profile, and uses it later to generate interview questions. The user then answers each question, receives feedback, and completes the interview. The completed session is stored and later used by the dashboard for analytics.

### 4.4 AI Interaction Flow

The AI flow is central to the system. When the user starts an interview, the backend sends a prompt to Gemini using the resume text, chosen category, and question count. The model returns structured JSON questions. For each answer, the system asks the AI for scoring and feedback. If the AI service is unavailable, the backend falls back to deterministic local question and feedback generation so the user can still continue.

### 4.5 Security Architecture

Security is enforced through token-based authentication, protected API routes, password hashing, upload restrictions, and server-side validation. CORS is configured to allow the frontend origin, and the API strips password data from regular profile responses.

---

## Chapter 5: Database Design

### 5.1 Database Technology Selection

MongoDB was selected because the application naturally stores flexible document-style data such as user profiles, resume text, interview question arrays, answer history, and feedback summaries. Mongoose provides schema validation and model methods.

### 5.2 Schema Design

#### 5.2.1 User Collection

The User model stores name, email, password, avatar, resume text, resume file name, total interview count, average score, and skill records. Passwords are never stored in plain text because they are hashed before save.

#### 5.2.2 Interview Collection

The Interview model stores the user reference, question list, answers, individual scores, feedback, category, overall score, strengths, weaknesses, suggestions, and status. This structure makes it possible to reconstruct a full interview review later.

### 5.3 Entity Relationship Description

One user can have many interviews. Each interview belongs to exactly one user. The interview document contains multiple embedded question-answer records, which keeps the session self-contained and easy to query.

### 5.4 Indexing and Data Consistency

Email is unique in the User collection, which prevents duplicate registrations. Interview records are associated with a user ID, and dashboard queries filter by both user and status to avoid exposing other users' data.

---

## Chapter 6: Backend and AI Implementation

### 6.1 Project Setup and Configuration

The backend is built with Express and configured in the server entry file. It loads environment variables, enables JSON and URL-encoded request parsing, mounts the routes, serves uploaded files, exposes a health check endpoint, and connects to MongoDB before starting the server.

### 6.2 Authentication and User Management

Authentication is handled through the auth controller. Users can register and log in with email and password. Passwords are hashed with bcryptjs, and a JWT token is issued after successful authentication. The protected profile endpoint returns the current user's profile data.

### 6.3 Resume Upload and Parsing

The resume route accepts PDF and DOCX files only. Multer stores the file temporarily, then the backend parses the text using pdf-parse for PDF files and mammoth for DOCX files. After extraction, the user record is updated with the parsed text so the AI can generate targeted interview questions.

### 6.4 AI Question Generation and Feedback

The AI controller uses Google Generative AI when a valid API key is available. It creates a prompt that asks Gemini to return structured JSON interview questions or feedback objects. If the AI service is unavailable or returns invalid content, the system falls back to local question templates and simple answer scoring logic.

The key API endpoints are:

- `POST /api/ai/questions`
- `POST /api/ai/feedback`
- `POST /api/ai/complete`

### 6.5 Dashboard and Result APIs

The dashboard controller computes metrics from completed interviews, including total interviews, average score, best score, score history, top strengths, top weaknesses, and recent interviews. A separate endpoint returns the full detail of one interview for the feedback screen.

The key API endpoints are:

- `GET /api/dashboard/stats`
- `GET /api/dashboard/interview/:id`

### 6.6 Backend Summary

The backend provides the full business logic of the platform: authentication, document parsing, AI interaction, scoring, persistence, and analytics. Its modular controller structure makes the project easy to extend.

---

## Chapter 7: Frontend Implementation

### 7.1 Application Structure

The frontend uses React with Vite. Application state is organized through an authentication context, and routing is handled with React Router. ProtectedRoute ensures that only authenticated users can access the dashboard, resume upload, interview session, and feedback pages.

### 7.2 Authentication Pages

The login and registration pages provide form validation, password visibility toggles, and toast-based feedback. After login or registration, the user is redirected to the dashboard.

### 7.3 Dashboard Page

The dashboard shows interview statistics, score history charts, strengths and weaknesses, and recent interviews. It also provides quick actions to upload a resume or begin a new interview.

### 7.4 Resume Upload Page

The resume page allows the user to upload a document and stores the parsed content in the backend. This creates the data foundation for personalized AI question generation.

### 7.5 Interview Page

The interview page is the core interactive screen. It lets the user select a category and question count, starts the AI session, displays questions one by one, captures answers in a chat-like interface, and shows feedback after each response.

### 7.6 Feedback Page

The feedback page presents the final interview score, strengths, weaknesses, suggestions, and a question-by-question review. This gives the user a complete summary of the session and a clear improvement path.

### 7.7 UI and Experience Notes

The frontend uses motion-based transitions, custom cards, responsive layouts, and clear call-to-action buttons. The design emphasizes calm focus and readable feedback rather than dense dashboards or heavy navigation.

---

## Chapter 8: Security Implementation

### 8.1 JWT Authentication

The application uses JSON Web Tokens to maintain stateless authentication. Tokens are stored on the client side and attached to API requests through an Axios interceptor.

### 8.2 Password Hashing

User passwords are hashed with bcryptjs before storage in MongoDB. This reduces the risk of credential exposure if the database is ever compromised.

### 8.3 Route Protection

The protect middleware checks the Authorization header, verifies the token, and loads the user profile before allowing access to private endpoints.

### 8.4 File Validation

The upload middleware accepts only PDF and DOCX files and restricts the file size to 5 MB. This protects the system from unsupported formats and unusually large uploads.

### 8.5 AI and API Safety Controls

The AI controller uses structured prompts and JSON parsing to reduce unpredictable output. If the AI response cannot be parsed, fallback logic keeps the system usable and prevents the user flow from breaking.

---

## Chapter 9: Testing and Validation

### 9.1 Functional Testing

Functional testing checks whether the user can register, log in, upload a resume, start an interview, submit answers, and view final results without errors.

### 9.2 API Validation

The backend endpoints were validated for correct request handling, token protection, file upload support, and feedback generation. Error responses are returned for missing credentials, missing files, unsupported uploads, and absent resume data.

### 9.3 Resume Parsing Validation

PDF and DOCX parsing were validated by checking that extracted text is stored in the user profile and reused during question generation.

### 9.4 Interview Flow Validation

The mock interview flow was validated end to end: generate questions, submit answers, receive feedback, complete the session, and load the feedback page from the saved interview record.

---

## Chapter 10: Results and Discussion

The completed system demonstrates that a resume-based AI interview trainer can be implemented as a practical full-stack application. Users no longer need to rely only on static question lists; instead, they can practice in a session that reflects their own profile and receive immediate response-level feedback.

The dashboard provides measurable progress indicators, which helps the user identify whether improvement is happening over time. The combination of interview generation, scoring, and analytics makes the platform useful for repeated practice.

The main limitation is that AI output quality depends on the availability of the Gemini API and the quality of the uploaded resume. However, the fallback logic ensures that the application still works when the external AI service is unavailable.

---

## Chapter 11: Future Enhancements

The current system can be extended in several directions:

- voice-based interview simulation,
- video interview analysis,
- role-specific roadmaps,
- richer skill graph visualization,
- answer-level time tracking,
- company-specific question sets,
- email reminders and progress reports,
- and integration with job application portals.

These additions would make PrepAI a more complete interview preparation ecosystem.

---

## Chapter 12: Conclusion

PrepAI is a full-stack AI-powered interview preparation platform that combines secure authentication, resume parsing, personalized question generation, instant feedback, and performance tracking in one application. The project demonstrates the practical use of the MERN stack together with AI services to solve a real academic and career development problem.

The system is modular, responsive, and ready for future expansion. It provides a strong foundation for personalized interview practice and shows how intelligent web applications can improve learning outcomes.

---

## References

1. React documentation - https://react.dev/
2. Vite documentation - https://vite.dev/
3. Express.js documentation - https://expressjs.com/
4. MongoDB documentation - https://www.mongodb.com/docs/
5. Mongoose documentation - https://mongoosejs.com/
6. Google Generative AI documentation - https://ai.google.dev/
7. bcryptjs documentation - https://www.npmjs.com/package/bcryptjs
8. jsonwebtoken documentation - https://www.npmjs.com/package/jsonwebtoken
9. pdf-parse documentation - https://www.npmjs.com/package/pdf-parse
10. mammoth documentation - https://www.npmjs.com/package/mammoth

---

## Appendix: Key API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/resume/upload`
- `GET /api/resume`
- `POST /api/ai/questions`
- `POST /api/ai/feedback`
- `POST /api/ai/complete`
- `GET /api/dashboard/stats`
- `GET /api/dashboard/interview/:id`

## Appendix A: Directory Structure

```text
PrepAI/
├── Backend/
│   ├── controllers/
│   │   ├── ai.controller.js
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js
│   │   └── resume.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── Interview.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   ├── ai.routes.js
│   │   ├── auth.routes.js
│   │   ├── dashboard.routes.js
│   │   └── resume.routes.js
│   ├── uploads/
│   ├── package.json
│   └── server.js
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── illustrations/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   └── ProtectedRoute/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Feedback/
│   │   │   ├── Interview/
│   │   │   ├── Landing/
│   │   │   └── Resume/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── services.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── README.md
├── README_DEV.md
├── PrepAI_Project_Report.md
├── API_REFERENCE.md
├── TEST_PLAN.md
└── render.yaml
```

## Appendix B: Glossary of Technical Terms

| Term | Definition |
| --- | --- |
| API | Application Programming Interface, a set of rules that allows software components to communicate. |
| JWT | JSON Web Token, a compact token format used for authentication and authorization. |
| MongoDB | A NoSQL document database used to store users and interview sessions. |
| Mongoose | An ODM library that provides schema-based modeling for MongoDB in Node.js. |
| REST | An architectural style for APIs that uses standard HTTP methods and resource-oriented URLs. |
| Multer | Middleware for handling `multipart/form-data` file uploads in Express. |
| Gemini | Google's generative AI model used here to generate questions and feedback. |
| Cloudinary | A cloud service used for storing and serving uploaded files. |
| Resume Parsing | The process of extracting meaningful text and fields from a resume document. |
| Fallback Logic | Local code paths used when external services are unavailable or return invalid responses. |

## Appendix C: Project Components Summary

- Backend: Express server, routes, controllers, middleware, MongoDB models, uploads.
- Frontend: React UI, pages, context, services, component library, illustrations.
- AI Layer: Gemini prompts, strict JSON parsing, fallback questions and feedback.
- Data Layer: user and interview collections with embedded question history.
- Security Layer: JWT auth, password hashing, protected routes, upload validation.


## Expanded Professional Report (Detailed)

The following sections expand each chapter into professional-level, detailed content suitable for a 30–40 page final project report. Each subsection covers concepts, concrete implementation details taken from the repository, sample code snippets, expected inputs/outputs, and design rationale.

Note: file paths and code references below point to the repository content under `F:/COEB-Project`.

---

## Chapter 1 (Expanded): Introduction — Context, Motivation and Goals

1.1 Background and Context (Detailed)

- The job market and technical interviews: describe market need, statistics (cite sources) and why personalized prep helps.
- PrepAI approach: resume-driven question generation, iterative feedback loop, analytics for progress.

1.2 Problem Statement (Detailed)

- Enumerate current pain points: generic question banks, time/cost constraints, lack of measurable progress, no resume-contextual practice.

1.3 Project Objectives (Measurable)

- Build an end-to-end web platform using React + Node + MongoDB.
- Implement accurate resume parsing supporting PDF and DOCX.
- Integrate with a large language model (Gemini) with robust fallback.
- Measure user improvement over repeated sessions via a dashboard.

1.4 Success metrics and evaluation (How we measure success)

- User can upload resume and obtain at least 5 contextual questions.
- A complete interview flow must persist results and compute average score.
- System must support concurrent users—outline load tested targets.

---

## Chapter 2 (Expanded): Literature Review (Detailed)

- Survey interview prep products (LeetCode, Pramp, HackerRank, InterviewBuddy), explain how PrepAI differs (resume-focused and AI feedback loop).
- Cover resume parsing techniques (regex vs. NLP pipelines), trade-offs.
- Large language models for evaluation: prompt engineering, structured-output enforcement, hallucination mitigation.

---

## Chapter 3 (Expanded): System Requirements (Detailed)

3.1 Functional Requirements (expanded)

- Authentication: signup/login, JWT issuance, token refresh (if any).  
- Resume: upload endpoint, file validation, parsing, cloud storage fallback.  
- AI: question generation endpoint, feedback endpoint, completion endpoint.  
- Dashboard: stats, history, interview detail.  

3.2 Non-Functional Requirements (expanded)

- Security: OWASP threats considered, input validation, password hash rounds, HTTPS expectation.  
- Performance: target response times for AI fallback and local operations.  
- Scalability: stateless API, horizontal scaling recommendations.  

3.3 Operational Requirements

- Environment variables: list of required keys and purpose (MONGO_URI, JWT_SECRET, GEMINI_API_KEY, CLOUDINARY_*).
- Backups and data retention for interviews.

---

## Chapter 4 (Expanded): Architecture and Design (Detailed)

4.1 High-level Architecture Diagram (textual)

- Frontend (React/Vite) <-> API Gateway (Express server) <-> Business logic (controllers) <-> MongoDB (Atlas)
- AI service: Gemini (external) used by backend; fallback to local logic when API key missing.

4.2 Component Breakdown (Detailed)

- Frontend components (detailed list): `Landing`, `Navbar`, `Auth` pages (`Login`, `Register`), `Dashboard`, `Resume`, `Interview`, `Feedback`, `ProtectedRoute`, `AuthContext`.
- Backend modules: `routes/*.js`, `controllers/*.js`, `middleware/*`, `models/*.js`, `uploads/`.

4.3 Sequence Flows (Detailed)

- User registers/login flow: sequence of HTTP calls and state transitions.
- Resume upload and parse: `POST /api/resume/upload` -> Multer -> parse -> update `User.resumeText`.
- Interview generation: `POST /api/ai/questions` -> backend uses `User.resumeText` -> call Gemini or fallback -> create `Interview` record.
- Answer submission: `POST /api/ai/feedback` -> evaluate answer -> update `Interview.questions` entry -> return structured feedback.

4.4 API Contracts (brief)

- Document key endpoints with request/response shapes (see Appendix: API Reference for full details).

---

## Chapter 5 (Expanded): Database Design and Schema (Detailed)

5.1 Collections and Rationale

- `users` collection: store user profile, hashed password, resume text, aggregated stats. Use unique index on `email`.
- `interviews` collection: embed session-level questions array (self-contained session). Advantages: fast retrieval of full session, no joins required.

5.2 Mongoose Schemas (from repository) with field-level explanations

- `User.model.js`
	- `name`: display name.
	- `email`: unique, validated via regex. Index details: `unique: true` to prevent duplicates.
	- `password`: stored `select: false` — explain why.
	- `resumeText`: long text, consider using `text` index if performing search across resume content.
	- `totalInterviews`, `averageScore`: aggregated metrics updated by backend.

- `Interview.model.js`
	- `userId`: ObjectId ref to `users`.
	- `questions`: array with `question`, `userAnswer`, `score`, `feedback`.
	- `overallScore`, `strengths`, `weaknesses`, `suggestions` for analytics.

5.3 Example Documents (from your Mongo screenshots reproduced as JSON)

Sample `users` doc (redacted):

{
	_id: ObjectId('69daa...'),
	name: 'Shashi Bhushan Kumar',
	email: 'shashi.bkumar21@gmail.com',
	password: '$2b$12$...hashed',
	resumeText: '...extracted text...',
	resumeFileName: 'Shashi_Bhushan_Kumar_Full_Stack_Developer.pdf',
	totalInterviews: 1,
	averageScore: 6.4
}

Sample `interviews` doc (from screenshot):

{
	_id: ObjectId('69f840...'),
	userId: ObjectId('69daa...'),
	questions: [ { question: '...', userAnswer: '...', score: 6, feedback: '...' }, ... ],
	overallScore: 6.4,
	strengths: ['Good attempt at answering questions'],
	weaknesses: ['Could provide more detailed answers'],
	suggestions: ['Practice more with sample questions','Research common interview patterns'],
	category: 'Technical',
	status: 'completed',
	createdAt: ISODate('2026-05-04T06:43:19Z')
}

5.4 Indexes and Performance

- Create unique index on `users.email` (already in schema).  
- Consider compound index on `interviews.userId, interviews.status, interviews.createdAt` for fast dashboard queries.  
- For large `resumeText`, consider storing the original file in object storage and only indexing extracted keywords for search.

5.5 Data Retention and Privacy

- Discuss retention policy for user data and interviews, and options for delete requests (GDPR-like considerations).

---

## Chapter 6 (Expanded): Backend Implementation — In-Depth

6.1 Project structure and configuration

- `server.js` — loads env, configures middleware (CORS, JSON, URL encoding), static uploads route, mounts API routes, health check, connects to MongoDB. Show code excerpt from `server.js` and explain each middleware.

6.2 Route map and responsibilities

- `routes/auth.routes.js` — register, login, me.
- `routes/resume.routes.js` — upload, get.
- `routes/ai.routes.js` — questions, feedback, complete.
- `routes/dashboard.routes.js` — stats, interview detail.

6.3 Controllers (detailed walkthrough with key code excerpts and explanations)

- `auth.controller.js`
	- Registration flow: validation, uniqueness check, create user, generate JWT.
	- Login flow: select password field using `.select('+password')`, compare using bcrypt, return token and sanitized user object.

- `resume.controller.js`
	- File handling: `multer` storage writes to `uploads/`.
	- Parsing: `pdf-parse` for PDFs, `mammoth` for DOCX. Provide pseudocode and error handling patterns.
	- Cloudinary upload: optional; fallback to local filename if credentials missing.

- `ai.controller.js`
	- `generateQuestions`: uses `getGenAI()` wrapper to check API key and create `GoogleGenerativeAI` instance; constructs prompt asking for strict JSON array; robust parse with regex; fallback to `generateFallbackQuestions()`.
	- `submitAnswer`: sends prompt to AI to evaluate answer and expects a JSON object. If parsing fails, runs `generateFallbackFeedback()` scoring heuristics.
	- `completeInterview`: aggregates scores, optionally calls AI to produce overall summary, updates `User` stats.

6.4 Middleware and Utilities

- `auth.middleware.js` – verify JWT, attach user to `req.user` (explain `select('-password')`).
- `upload.middleware.js` – multer config with storage, fileFilter, size limit (5MB). Explain why restricting types is important.

6.5 Error handling and logging

- Discuss current error-handling approach (try/catch returning status codes). Propose improvements: central error-handling middleware, structured logs (winston), request id correlation.

6.6 Tests and mocks for backend

- Suggest unit tests for controller logic (Jest + Supertest), including mocking `pdf-parse`, `mammoth`, and Gemini client.

---

## Chapter 7 (Expanded): Frontend Implementation — In-Depth

7.1 Project setup and structure

- `src/` layout: `pages/`, `components/`, `context/`, `services/`, `assets/`.
- `AuthContext.jsx` provides user/token management; explain token storage, `getMe()` call on load, error handling.

7.2 Routing and protected routes

- `ProtectedRoute` component: verify `user` presence and `loading` flag; redirect to `/login` otherwise. Provide code snippet and discuss UX considerations.

7.3 Key pages and flows

- `Landing` — hero, features, steps. UX rationale: call-to-action, progressive disclosure.
- `Resume` page — file input, drag-and-drop (react-dropzone), upload flow using `resumeService.upload`.
- `Interview` page — chat-based UX: message array, progressive question flow, typing indicators, answer submission with Enter key, show feedback cards.
- `Feedback` page — present overall score, strengths/weaknesses, question-by-question review.

7.4 Services (API wiring)

- `api.js` axios instance: baseURL from `VITE_API_URL`, request interceptor attaches `Authorization` header, response interceptor handles 401.
- `services.js` provides high-level functions (authService, resumeService, aiService, dashboardService). Provide examples of usage and typical error handling.

7.5 State management and UX notes

- Use of `AuthContext` for global auth state; local component state for interview session. Discuss possible future refactor to a more robust store (Redux/React Query) for caching.

7.6 Accessibility and responsive design

- Mention keyboard handling on input, focus management (focus on chat textarea after sending), and responsive layout rules.

---

## Chapter 8 (Expanded): AI Integration and Prompt Engineering

8.1 Gemini integration details

- Explain `@google/generative-ai` usage from `ai.controller.js` and the `getGenAI()` wrapper that checks for API key.
- Clarify recommended environment variable: `GEMINI_API_KEY` and secure handling.

8.2 Prompt templates and examples

- Provide exact prompts used in code and explain why the prompt requests strict JSON output and how parsing is performed. Show examples of expected AI output.

8.3 Fallback strategies

- `generateFallbackQuestions()` and `generateFallbackFeedback()` functions: explain heuristics and why fallbacks are necessary for resilience.

8.4 Hallucination and safety control

- Techniques used: strict structured output, JSON extraction via regex, fallback on parse failure, limiting resume text length in prompts to 3000 chars.

8.5 Cost and latency considerations

- Explain costs per token conceptually and propose batching or caching strategies to reduce calls.

---

## Chapter 9 (Expanded): Security, Privacy, and Compliance

9.1 Authentication & authorization

- JWT implementation details: `generateToken()` in `auth.controller.js` uses `JWT_SECRET` and expires in 7d. Discuss trade-offs of refresh tokens vs. long-lived tokens.

9.2 Password storage

- bcrypt rounds: `genSalt(12)` used in `User` model pre-save hook. Explain security rationale and CPU cost.

9.3 File upload security

- Accept only PDF and DOCX with multer fileFilter; maximum 5 MB. Discuss scanning for malware in production.

9.4 Data privacy

- How resumeText (PII) is stored — discuss encryption at rest for sensitive deployments and user deletion flows.

9.5 Rate limiting and brute-force protections (recommendations)

- Suggest adding rate-limiter middleware (express-rate-limit) on auth endpoints and AI endpoints to protect from abuse and costs.

9.6 Secure deployment notes

- Ensure TLS termination, environment variable protection, restrict access to MongoDB cluster, rotate keys, use least privilege for Cloudinary credentials.

---

## Chapter 10 (Expanded): Testing, Validation and Quality Assurance

10.1 Testing strategy

- Unit tests: controllers, utils, fallback logic. Use Jest and supertest for API endpoints.
- Integration tests: run with a test MongoDB instance (in-memory or separate test cluster).
- End-to-end tests: Cypress to exercise critical user flows (signup, resume upload, interview).

10.2 Test cases and examples

- Provide a set of test cases for `POST /api/resume/upload`, `POST /api/ai/questions`, `POST /api/ai/feedback`, and `GET /api/dashboard/stats` with expected responses and edge cases (no resume, malformed file, AI parse failure).

10.3 Manual testing checklist

- Steps to manually validate flows locally including env setup, sample resume uploads, and mock AI responses.

10.4 Performance and load testing

- Recommendations for basic load testing (k6 or Artillery) for AI endpoints and overall concurrency goals.

---

## Chapter 11 (Expanded): Deployment and DevOps

11.1 Environment variables and configuration

- List of required env vars and their descriptions:
	- `PORT` — backend port
	- `MONGO_URI` — connection string
	- `JWT_SECRET` — authentication secret
	- `GEMINI_API_KEY` — AI service key
	- `CLOUDINARY_*` — optional storage

11.2 Local setup and run commands

Backend:
```
cd Backend
npm install
cp .env.example .env    # fill values
npm run dev
```

Frontend:
```
cd Frontend
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev
```

11.3 Production deployment recommendations

- Host backend on Node-capable service (Heroku/GCP run/Azure App Service/Azure Container Apps). Use managed MongoDB Atlas. Use Cloudinary / S3 for resume storage. Use HTTPS and set CORS appropriately.

11.4 CI/CD pipelines

- Suggest GitHub Actions pipeline: lint, test, build frontend, build/test backend, deploy to staging on merge, deploy to production on tags.

11.5 Monitoring and observability

- Integrate error tracking (Sentry), metrics (Prometheus + Grafana) and log aggregation (EFK stack). Monitor AI usage/credits and set alerts for cost spikes.

---

## Chapter 12 (Expanded): Results, Discussion and Limitations

- Summarize observed capabilities (from DB screenshots and test sessions); mention sample metrics (average score 6.4 in screenshot). Discuss limitations (AI variability, dependency on resume quality, security/e2e hardening needed).

---

## Appendices (Detailed)

Appendix A — Full API Reference (endpoints, request and response examples)

- `POST /api/auth/register` — request: { name, email, password } — response: { token, user }
- `POST /api/auth/login` — request: { email, password } — response: { token, user }
- `GET /api/auth/me` — headers: Authorization: Bearer <token> — response: { user }
- `POST /api/resume/upload` — form-data file `resume` — response: { message, resumeText, resumeFileName }
- `GET /api/resume` — response: { resumeText, resumeFileName }
- `POST /api/ai/questions` — body { category, count } — response: { interviewId, questions, totalQuestions }
- `POST /api/ai/feedback` — body { interviewId, questionIndex, answer, question } — response: { score, feedback, strengths, weaknesses, suggestions }
- `POST /api/ai/complete` — body { interviewId } — response: { overallScore, strengths, weaknesses, suggestions, interviewId }
- `GET /api/dashboard/stats` — response: { totalInterviews, averageScore, bestScore, scoreHistory, topStrengths, topWeaknesses, recentInterviews, hasResume }
- `GET /api/dashboard/interview/:id` — response: interview object

Include sample curl commands and expected JSON responses.

Appendix B — Environment and Runbook (copyable commands)

See `11.2 Local setup and run commands`.

Appendix C — Test Plan and Example Test Cases

- Unit tests examples, integration test commands, e2e scripts for Cypress.

Appendix D — Data Model Diagrams (textual)

- ER diagram description: User 1 — * Interview, Interview contains N questions embedded.

Appendix E — Screenshots and Observations

- Reference to the MongoDB Atlas screenshots you provided: explain observed documents and values (averageScore: 6.4, user resumeFileName, interview suggestions list). Mention how these map into the report's data examples.

---

## Final notes and next steps

I will now:  
- (1) Expand each appendix entry into concrete code examples and full API curl snippets,  
- (2) Add a dedicated Glossary,  
- (3) Produce a Word/PDF-ready version with front page, page numbers, and formatted sections if desired.

Tell me which of the following you'd like next:  
 - Convert this draft to a Word/PDF with college-formatted front page and page numbers, or  
 - I proceed to expand appendices with full API curl examples, test scripts, and a CI/CD workflow config (GitHub Actions) now.


- Frontend: React, Vite, Framer Motion, Recharts, Axios, React Router
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- AI and parsing: Google Gemini, pdf-parse, mammoth, Cloudinary

For full, copyable API examples and test plans see the companion files in the project root:

- `API_REFERENCE.md` — full curl examples and request/response shapes
- `TEST_PLAN.md` — unit, integration and E2E test descriptions and commands
- `.github/workflows/ci.yml` — example CI pipeline for backend tests and frontend build
- `README_DEV.md` — local setup and run commands
