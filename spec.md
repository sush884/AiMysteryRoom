# AI MYSTERY ROOM

## Product & Technical Specification Document

**Document Version:** 1.0
**Project Type:** AI-Powered Interactive Mystery Investigation Platform
**Development Methodology:** Spec-Driven Development (SDD)
**Architecture:** MERN Stack
**AI Provider:** Google Gemini
**Primary Development Agent:** OpenAI Codex
**Document Status:** Final – Development Source of Truth

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI Mystery Room is an AI-powered interactive mystery investigation platform that transforms user-provided stories or scenarios into unique detective challenges.

Users provide a short scenario, story, or incident description. The AI analyses the input and generates a complete fictional investigation containing suspects, motives, timelines, evidence, hidden clues, misleading information, and one actual culprit.

Users enter an interactive investigation room where they examine different types of AI-generated evidence, including:

* WhatsApp conversations.
* Photographs and crime-scene images.
* Audio recordings and voice messages.
* Emails and digital communications.
* Witness statements.
* Letters and documents.
* CCTV observations.
* Transaction and call records.

After analysing the available evidence, users must identify the person responsible for the incident.

The backend evaluates the user's accusation against the hidden solution and reveals the complete explanation of the mystery.

## 1.2 Vision

To create an immersive detective experience where users can turn their imagination into interactive investigations and solve mysteries using logical reasoning and evidence analysis.

## 1.3 Core Workflow

USER STORY INPUT
↓
AI MYSTERY GENERATION
↓
SUSPECT GENERATION
↓
EVIDENCE GENERATION
↓
INVESTIGATION ROOM
↓
EVIDENCE ANALYSIS
↓
CULPRIT SELECTION
↓
ANSWER EVALUATION
↓
CASE RESOLUTION

---

# 2. PROJECT OBJECTIVES

1. Allow users to create customised mystery challenges.
2. Generate unique fictional investigations using Google Gemini.
3. Generate multiple suspects with different personalities, motives, and alibis.
4. Create realistic fictional investigation evidence.
5. Include meaningful clues, contradictions, and red herrings.
6. Provide an interactive investigation environment.
7. Allow users to analyse evidence before making accusations.
8. Evaluate the final suspect selection.
9. Reveal the actual culprit and detailed reasoning.
10. Save completed investigations and results.
11. Provide a responsive and immersive user experience.

---

# 3. TECHNOLOGY STACK

| Layer             | Technology                              | Responsibility                   |
| ----------------- | --------------------------------------- | -------------------------------- |
| Frontend          | React.js                                | User interface                   |
| Styling           | Tailwind CSS                            | Responsive styling               |
| Animations        | Framer Motion                           | UI animations                    |
| Backend           | Node.js                                 | Server runtime                   |
| Framework         | Express.js                              | REST APIs                        |
| Database          | MongoDB                                 | Persistent data storage          |
| ODM               | Mongoose                                | Database modelling               |
| AI                | Google Gemini API                       | Mystery and evidence generation  |
| Authentication    | JWT                                     | User authentication              |
| Password Security | bcrypt                                  | Password hashing                 |
| API Communication | Axios                                   | Frontend-backend communication   |
| State Management  | React Context API                       | Application state                |
| Image Storage     | Cloudinary                              | Generated image storage          |
| Audio Storage     | Cloudinary or compatible object storage | Generated audio storage          |
| Validation        | Zod                                     | AI output and request validation |

### Technical Rules

* Use JavaScript throughout the MERN application unless a specific library requires otherwise.
* Keep all external API credentials in backend environment variables.
* Never expose Gemini API keys to the frontend.
* Use modular controllers, routes, services, and models.
* Use persistent MongoDB storage.
* Do not use hardcoded mock data as a substitute for functional features.

---

# 4. APPLICATION MODULES

The application consists of the following modules:

1. Landing Page
2. Authentication
3. User Dashboard
4. Mystery Creation
5. AI Mystery Generation
6. Suspect Management
7. Evidence Generation
8. Investigation Room
9. Investigation Notes
10. Culprit Selection
11. Answer Evaluation
12. Case Resolution
13. Investigation History

---

# 5. FUNCTIONAL REQUIREMENTS

## FR-01: Landing Page

The landing page introduces the application.

### Components

* Application logo and name.
* Navigation bar.
* Hero section.
* Project description.
* How It Works section.
* Feature highlights.
* Start Investigation button.
* Footer.

### Behaviour

Clicking Start Investigation redirects users to authentication or the mystery creation page if already authenticated.

## FR-02: Authentication

Users must register and log in.

### Registration

* Full Name
* Email
* Password
* Confirm Password

### Login

* Email
* Password

### Requirements

* Validate user inputs.
* Hash passwords using bcrypt.
* Authenticate using JWT.
* Protect private routes.
* Maintain authenticated sessions securely.
* Support logout.

All user-specific investigations must be associated with the authenticated user.

## FR-03: Mystery Creation

Users can submit their own scenarios to generate investigations.

### Input Fields

| Field                   | Required | Description                    |
| ----------------------- | -------- | ------------------------------ |
| Mystery Title           | No       | Optional custom title          |
| Story Scenario          | Yes      | User's mystery premise         |
| Category                | Yes      | Type of mystery                |
| Difficulty              | Yes      | Easy, Medium, Hard             |
| Number of Suspects      | Yes      | 3–6 suspects                   |
| Setting                 | No       | Location or environment        |
| Additional Instructions | No       | Custom generation instructions |

### Supported Categories

* Murder Mystery
* Theft
* Disappearance
* Betrayal
* Cybercrime
* Blackmail
* Missing Person
* Corporate Mystery
* General Mystery

All generated cases must remain fictional.

### Example Input

"Five friends attended a birthday party at a private villa. The next morning, an expensive diamond necklace belonging to the host disappeared. Everyone claims they know nothing, but one person is hiding the truth."

Difficulty: Medium
Category: Theft
Suspects: 5

### Expected Behaviour

1. Validate input.
2. Send scenario to backend.
3. Call Gemini.
4. Generate structured investigation data.
5. Validate generated data.
6. Generate required evidence assets.
7. Store case information in MongoDB.
8. Redirect to the investigation room.

## FR-04: AI Mystery Generation Engine

Gemini is responsible for generating the complete investigation.

### A. Case Information

* Case ID
* Title
* Description
* Category
* Location
* Incident Date
* Incident Time
* Difficulty
* Background Story

### B. Suspects

Generate 3–6 suspects.

Each suspect must contain:

* Suspect ID
* Name
* Age
* Occupation
* Profile Description
* Relationship to Incident
* Motive
* Alibi
* Personality
* Relevant Background

### C. Actual Culprit

Every mystery must have exactly one culprit.

The AI must establish:

* Culprit ID
* Motive
* Method
* Opportunity
* Complete Timeline
* Detailed Explanation
* Supporting Evidence
* Contradictions

The culprit and complete solution must be stored separately from public investigation data.

**CRITICAL:** The frontend must never receive the hidden culprit identity before the final accusation is submitted.

### D. Investigation Timeline

Generate a chronological timeline of relevant events.

The timeline must:

* Include important events.
* Include suspect movements where relevant.
* Identify contradictions.
* Match the evidence timestamps.
* Support the final explanation.

## FR-05: Evidence Generation

Every mystery must contain meaningful evidence.

### Evidence Types

| Type               | Description                                   |
| ------------------ | --------------------------------------------- |
| WhatsApp           | Fictional chat conversations                  |
| Images             | Crime-scene and suspicious-object photographs |
| Audio              | Voice messages and conversations              |
| Documents          | Letters, reports, receipts                    |
| Emails             | Digital communication                         |
| Witness Statements | Statements from relevant individuals          |
| CCTV               | Surveillance observations                     |
| Call Logs          | Communication records                         |
| Timeline           | Incident-related events                       |

### Evidence Quantity

| Difficulty | Suspects | Evidence |
| ---------- | -------: | -------: |
| Easy       |        3 |      6–8 |
| Medium     |      4–5 |     8–10 |
| Hard       |      5–6 |    10–12 |

These are target quantities.

### WhatsApp Evidence

Must include:

* Sender name.
* Receiver name.
* Message content.
* Timestamp.
* Chat interface.
* Relevant conversations.
* Suspicious messages where appropriate.

### Image Evidence

Must include:

* Image URL.
* Evidence title.
* Description.
* Timestamp.
* Related suspects.
* Image preview and zoom.

Use a compatible image-generation service. Gemini text generation alone must not be treated as image-file generation.

### Audio Evidence

Must include:

* Audio URL.
* Recording title.
* Description.
* Duration.
* Transcript.
* Timestamp.
* Audio player controls.

Use a compatible audio-generation or text-to-speech service.

### Document Evidence

Must support:

* Document title.
* Document content.
* Creation date.
* Relevant individuals.
* Download or preview where appropriate.

### Evidence Rules

* Evidence must relate to the actual mystery.
* Evidence must support logical deduction.
* Red herrings are allowed.
* Contradictions must be meaningful.
* Evidence must not reveal the culprit directly.
* All generated materials must be labelled fictional.

## FR-06: Investigation Room

The Investigation Room is the primary gameplay interface.

It contains five sections.

### 1. Case Overview

Display:

* Case title.
* Incident description.
* Location.
* Difficulty.
* Category.
* Investigation status.

### 2. Suspects

Display suspect cards containing:

* Profile image/avatar.
* Name.
* Age.
* Occupation.
* Description.
* Relationship to incident.

Clicking a suspect opens detailed information.

Do not reveal the actual culprit.

### 3. Evidence Locker

Display evidence in organised categories:

* Chats
* Images
* Audio
* Documents
* Reports
* Other

Users can:

* Open evidence.
* View details.
* Play audio.
* Zoom images.
* Read transcripts.
* Review evidence repeatedly.

### 4. Investigation Notes

Users can:

* Add notes.
* Edit notes.
* Delete notes.
* Save notes.
* Review notes later.

Notes must persist in MongoDB and belong to the authenticated user.

### 5. Final Accusation

Provide a dedicated interface for selecting the suspected culprit.

## FR-07: Culprit Selection

Display all suspects and allow users to select exactly one.

### Interface

* Heading: Who do you think is responsible?
* Suspect cards.
* Selection indicator.
* Submit Final Accusation button.

### Submission Rules

1. User selects one suspect.
2. Frontend sends the suspect ID to the backend.
3. Backend verifies case ownership.
4. Backend retrieves the private solution.
5. Backend evaluates the accusation.
6. Result is stored.
7. Investigation is marked completed.
8. Solution is revealed.

A completed case cannot be accused again in the initial version.

## FR-08: Case Resolution

### Correct Answer

Display:

* Case Solved!
* Correct suspect.
* Motive.
* Method.
* Important clues.
* Evidence supporting the conclusion.
* Complete incident timeline.
* Explanation of the investigation.

### Incorrect Answer

Display:

* Case Unsolved!
* Actual culprit.
* Correct motive.
* Missed clues.
* Why the selected suspect was innocent.
* Complete investigation explanation.

### Result Metrics

* Case Title
* Difficulty
* Selected Suspect
* Actual Culprit
* Correct/Incorrect
* Completion Date

## FR-09: User Dashboard

Display:

* Welcome message.
* Total Investigations.
* Cases Solved.
* Cases Unsolved.
* Success Rate.
* Recent Investigations.
* Start New Mystery button.

### Investigation History

Each entry must display:

* Case Title
* Creation Date
* Difficulty
* Status
* Result

Users can reopen completed cases and review the original evidence and solution.

---

# 6. AI GENERATION RULES

Gemini must follow these rules for every mystery.

1. Generate exactly one actual culprit.
2. Generate the requested number of suspects.
3. Give each suspect a believable background.
4. Establish a clear motive for the culprit.
5. Establish a realistic opportunity.
6. Generate evidence supporting the solution.
7. Include misleading clues where appropriate.
8. Maintain timeline consistency.
9. Ensure evidence does not contradict the final solution unintentionally.
10. Ensure the mystery is solvable.
11. Match evidence complexity to difficulty.
12. Avoid generating identical mysteries repeatedly.

### AI Validation

Before storing a generated mystery, validate:

* Required fields.
* Unique suspect IDs.
* Exactly one culprit.
* Culprit belongs to suspect list.
* Valid evidence references.
* Valid timestamps.
* Timeline consistency.
* Solution supported by evidence.
* Public/private data separation.

Use Zod or an equivalent schema-validation library.

If generation fails, retry with corrective instructions up to a configured limit. If validation still fails, return an error without saving an incomplete case.

---

# 7. DATABASE DESIGN

Use MongoDB with Mongoose.

## 7.1 Users Collection

Fields:

* _id
* name
* email
* password
* createdAt
* updatedAt

Email must be unique.

## 7.2 Mysteries Collection

Fields:

* _id
* userId
* title
* scenario
* category
* difficulty
* status
* suspects
* publicCaseDetails
* createdAt
* updatedAt

## 7.3 Evidence Collection

Fields:

* _id
* mysteryId
* type
* title
* description
* content
* assetUrl
* timestamp
* relatedSuspects
* createdAt

## 7.4 Case Solutions Collection

Private collection containing:

* _id
* mysteryId
* culpritId
* motive
* method
* opportunity
* timeline
* reasoning
* importantClues
* createdAt

Only backend services can access this collection.

## 7.5 Investigation Results Collection

Fields:

* _id
* userId
* mysteryId
* selectedSuspectId
* isCorrect
* status
* submittedAt

Create a unique constraint on the user/mystery combination to prevent duplicate final submissions.

## 7.6 Investigation Notes Collection

Fields:

* _id
* userId
* mysteryId
* notes
* createdAt
* updatedAt

---

# 8. BACKEND API SPECIFICATION

Base URL:

`/api/v1`

### Authentication

| Method | Endpoint       | Purpose      |
| ------ | -------------- | ------------ |
| POST   | /auth/register | Register     |
| POST   | /auth/login    | Login        |
| GET    | /auth/me       | Current user |
| POST   | /auth/logout   | Logout       |

### Mysteries

| Method | Endpoint            | Purpose             |
| ------ | ------------------- | ------------------- |
| POST   | /mysteries/generate | Generate mystery    |
| GET    | /mysteries          | List user mysteries |
| GET    | /mysteries/:id      | Get mystery         |
| DELETE | /mysteries/:id      | Delete mystery      |

### Evidence

| Method | Endpoint                | Purpose       |
| ------ | ----------------------- | ------------- |
| GET    | /mysteries/:id/evidence | List evidence |
| GET    | /evidence/:id           | Get evidence  |

### Investigation

| Method | Endpoint                     | Purpose           |
| ------ | ---------------------------- | ----------------- |
| POST   | /mysteries/:id/notes         | Add note          |
| PUT    | /mysteries/:id/notes/:noteId | Update note       |
| DELETE | /mysteries/:id/notes/:noteId | Delete note       |
| POST   | /mysteries/:id/accuse        | Submit accusation |
| GET    | /mysteries/:id/result        | Get result        |

### Dashboard

| Method | Endpoint           | Purpose               |
| ------ | ------------------ | --------------------- |
| GET    | /dashboard         | Dashboard statistics  |
| GET    | /dashboard/history | Investigation history |

### API Rules

* Validate every request.
* Authenticate protected routes.
* Check ownership of every user-specific resource.
* Return consistent JSON responses.
* Use appropriate HTTP status codes.
* Apply rate limits.
* Never expose private solutions through public routes.

---

# 9. AI INTEGRATION ARCHITECTURE

### Mystery Generation Flow

USER INPUT
↓
REACT FRONTEND
↓
EXPRESS BACKEND
↓
INPUT VALIDATION
↓
GEMINI API
↓
STRUCTURED JSON OUTPUT
↓
OUTPUT VALIDATION
↓
EVIDENCE ASSET GENERATION
↓
MONGODB STORAGE
↓
INVESTIGATION ROOM

### Backend AI Services

Create modular services:

* mysteryGenerator.js
* suspectGenerator.js
* evidenceGenerator.js
* imageGenerator.js
* audioGenerator.js
* mysteryValidator.js
* solutionEvaluator.js

For the MVP, these should remain modules in one Express backend rather than separate microservices.

### AI Output Requirements

Gemini must return structured JSON.

The backend must:

1. Validate JSON structure.
2. Validate all required fields.
3. Check logical consistency.
4. Separate public and private data.
5. Save validated case information.
6. Handle generation failures.

Do not trust model-generated output without validation.

---

# 10. UI/UX SPECIFICATION

## Design Direction

Theme: Dark Detective Investigation Interface.

The application should resemble a modern digital detective investigation system.

### Colour Palette

| Element              | Colour  |
| -------------------- | ------- |
| Main Background      | #0B0D12 |
| Secondary Background | #151922 |
| Cards                | #1C222D |
| Primary Accent       | #D4AF37 |
| Danger Accent        | #C0392B |
| Primary Text         | #F5F5F5 |
| Secondary Text       | #9CA3AF |
| Success              | #27AE60 |

### Design Requirements

* Dark interface.
* Gold accent elements.
* Modern typography.
* Glassmorphism cards.
* Subtle shadows and glow.
* Smooth animations.
* Interactive evidence previews.
* Consistent spacing.
* Reusable UI components.
* Responsive layouts.

### Required Pages

1. Landing Page
2. Registration Page
3. Login Page
4. Mystery Creation Page
5. Generation Loading Page
6. User Dashboard
7. Investigation Room
8. Suspect Details Modal
9. Evidence Viewer Modal
10. Investigation Notes Panel
11. Final Accusation Page
12. Case Resolution Page
13. Investigation History Page

### Responsive Requirements

Support:

* Desktop
* Laptop
* Tablet
* Mobile

No important investigation functionality should disappear on smaller screens.

---

# 11. SECURITY REQUIREMENTS

1. Use bcrypt for password hashing.
2. Use JWT authentication.
3. Keep API credentials in environment variables.
4. Never expose the actual culprit before submission.
5. Never expose private solution documents through public APIs.
6. Verify case ownership on every protected operation.
7. Validate and sanitise user input.
8. Prevent duplicate accusations.
9. Apply API rate limiting.
10. Secure file uploads and generated assets.
11. Use HTTPS in production.
12. Prevent unauthorised access to user data.

### Environment Variables

Backend `.env`:

PORT=5000
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
IMAGE_API_KEY=
AUDIO_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=

Do not commit `.env` files to GitHub.

---

# 12. PROJECT FOLDER STRUCTURE

ai-mystery-room/

frontend/

* public/
* src/

  * assets/
  * components/
  * pages/
  * layouts/
  * context/
  * hooks/
  * services/
  * utils/
  * styles/
  * App.jsx
  * main.jsx

backend/

* config/
* controllers/
* middleware/
* models/
* routes/
* services/

  * ai/

    * mysteryGenerator.js
    * suspectGenerator.js
    * evidenceGenerator.js
    * imageGenerator.js
    * audioGenerator.js
  * mysteryValidator.js
  * solutionEvaluator.js
* validators/
* utils/
* app.js
* server.js

docs/

* SPEC.md
* ARCHITECTURE.md
* DATABASE.md
* API.md
* AI_GENERATION.md
* UI_UX.md
* TESTING.md
* DEVELOPMENT.md

README.md
.gitignore

---

# 13. NON-FUNCTIONAL REQUIREMENTS

| ID     | Requirement                          |
| ------ | ------------------------------------ |
| NFR-01 | Responsive across all screen sizes   |
| NFR-02 | Secure user authentication           |
| NFR-03 | Persistent database storage          |
| NFR-04 | Efficient API communication          |
| NFR-05 | Graceful AI failure handling         |
| NFR-06 | Validated AI-generated content       |
| NFR-07 | Secure private solution storage      |
| NFR-08 | User data isolation                  |
| NFR-09 | Reliable evidence asset delivery     |
| NFR-10 | Consistent UI and navigation         |
| NFR-11 | Appropriate loading and error states |
| NFR-12 | Maintainable and modular code        |

---

# 14. ERROR HANDLING

The application must handle:

* Invalid user input.
* Authentication failure.
* Gemini API failure.
* Invalid AI-generated JSON.
* AI generation timeout.
* Image generation failure.
* Audio generation failure.
* MongoDB connection failure.
* Missing investigation.
* Invalid suspect selection.
* Duplicate accusation.
* Unauthorised access.

Failed image or audio generation should not corrupt the case. The application should clearly indicate unavailable assets and allow safe retries where appropriate.

---

# 15. DEVELOPMENT PHASES

Development must happen incrementally.

| Phase | Scope                                     | Priority |
| ----- | ----------------------------------------- | -------- |
| 1     | MERN project setup and MongoDB connection | Critical |
| 2     | Authentication                            | Critical |
| 3     | Landing page and mystery creation UI      | Critical |
| 4     | Gemini integration                        | Critical |
| 5     | Mystery and suspect generation            | Critical |
| 6     | Text-based evidence generation            | Critical |
| 7     | Investigation room                        | Critical |
| 8     | Culprit selection and evaluation          | Critical |
| 9     | Case resolution                           | Critical |
| 10    | User dashboard and history                | Critical |
| 11    | AI-generated images                       | High     |
| 12    | AI-generated audio                        | High     |
| 13    | UI animations and optimisation            | High     |
| 14    | Testing and deployment                    | Critical |

### MVP Definition

The first release must include:

* Registration and login.
* Custom scenario input.
* AI-generated mystery.
* Multiple suspects.
* Text-based WhatsApp conversations.
* Witness statements.
* Documents.
* Evidence locker.
* Investigation notes.
* Culprit selection.
* Correct/incorrect evaluation.
* Complete solution reveal.
* Investigation history.

Image and audio generation should be integrated in later implementation phases without changing the core evidence architecture.

---

# 16. ACCEPTANCE CRITERIA

The project is considered complete when:

* [ ] Users can register and log in.
* [ ] Users can create custom mystery scenarios.
* [ ] Gemini generates structured investigations.
* [ ] Every mystery contains exactly one culprit.
* [ ] Every mystery contains multiple suspects.
* [ ] Evidence is generated and connected to the case.
* [ ] Users can examine evidence.
* [ ] Users can save investigation notes.
* [ ] Users can select and accuse a suspect.
* [ ] The backend correctly evaluates accusations.
* [ ] The hidden solution remains protected.
* [ ] The complete solution is revealed after submission.
* [ ] Results are stored in MongoDB.
* [ ] Investigation history is available.
* [ ] Users cannot access other users' private cases.
* [ ] The application is responsive.
* [ ] AI and database errors are handled properly.

---

# 17. PROJECT RULES AND CONSTRAINTS

These rules are mandatory.

1. AI Mystery Room is an interactive mystery-solving platform, not a chatbot.
2. Gemini must generate structured investigations.
3. Every case must have one predefined culprit.
4. Every evidence item must have a meaningful connection to the story.
5. Every mystery must be logically solvable.
6. Users must investigate before submitting accusations.
7. The actual culprit must remain hidden until submission.
8. All cases and evidence must be fictional.
9. The application must never present AI-generated materials as authentic real-world police evidence.
10. Each completed case must preserve its original solution.
11. User data must remain isolated.
12. Existing functionality must not be broken during development.
13. No fake dashboard statistics or pre-completed investigations.
14. No frontend-only implementations of backend-dependent features.
15. No unnecessary technology-stack changes.

---

# 18. CODEX DEVELOPMENT CONTRACT

You are the primary development agent responsible for implementing AI Mystery Room.

**SPEC.md is the Single Source of Truth.**

### Mandatory Instructions

1. Read the complete specification before development.
2. Follow the specified MERN architecture.
3. Use Google Gemini for AI generation.
4. Implement actual backend functionality.
5. Do not substitute mock data for real functionality.
6. Maintain modular and reusable code.
7. Implement and test APIs before connecting frontend features.
8. Maintain strict separation between public evidence and private solutions.
9. Never expose API keys.
10. Follow the defined database structure.
11. Handle loading, success, empty, and error states.
12. Ensure responsive design.
13. Preserve existing working features.
14. Do not silently change product requirements.
15. Update technical documentation when implementation changes.

### Mandatory SDD Workflow

For every feature:

STEP 1: Read relevant requirements.

STEP 2: Analyse existing code and dependencies.

STEP 3: Prepare an implementation plan.

STEP 4: Implement the feature.

STEP 5: Validate against SPEC.md.

STEP 6: Run relevant tests.

STEP 7: Update DEVELOPMENT.md.

STEP 8: Mark the feature complete only after successful verification.

### Conflict Resolution

If implementation decisions conflict with SPEC.md, follow SPEC.md.

If an important requirement is ambiguous, ask for clarification before making a significant architectural or product decision.

Do not implement all phases simultaneously.

Complete and verify each development phase before proceeding.

---

# 19. FINAL PRODUCT DEFINITION

AI Mystery Room is a full-stack AI-powered mystery investigation platform that converts user-provided scenarios into unique, interactive detective challenges.

Using the MERN stack and Google Gemini, it dynamically generates fictional suspects, motives, investigation timelines, evidence, hidden clues, and solutions.

Users investigate each case by analysing digital evidence, connecting clues, identifying contradictions, and selecting the suspected culprit.

The platform evaluates the final accusation and reveals the complete explanation of the mystery.

### Core Differentiator

Traditional mystery games provide predefined stories.

AI Mystery Room allows users to create their own scenarios and experience dynamically generated investigations.

**The goal is to make every investigation feel like entering a new detective case, where the truth is hidden in the evidence and the user must uncover it.**

---

**END OF SPECIFICATION DOCUMENT**

**Document:** SPEC.md
**Version:** 1.0
**Authority:** Single Source of Truth for AI Mystery Room development.
