# ProjectForge AI

ProjectForge AI is an intelligent software project idea generator that runs fully on local logic without external paid APIs.

## Features
- **Smart Idea Generation:** Generates unique project ideas based on Skill Level, Domain, and Language.
- **Detailed Output:** Provides Problem Statement, Tech Stack, Roadmap, and Folder Structure.
- **Rule-based AI Engine:** Uses internal templates and randomization logic (No OpenAI/Gemini required).
- **Responsive UI:** Modern Cyber/Tech aesthetic built with React and Tailwind CSS.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, TypeScript (Rule-based Logic Engine)
- **Database:** PostgreSQL (for logging generations)

## Setup & Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   The project uses a built-in PostgreSQL database.
   ```bash
   npm run db:push
   ```

3. **Start the Application:**
   ```bash
   npm run dev
   ```
   The app will run on port 5000.

## Folder Structure
- `client/`: React Frontend
- `server/`: Express Backend & AI Engine
- `shared/`: Shared TypeScript Types & Schemas

## Deployment
This project is ready for deployment on Replit. Simply click "Run" or "Deploy".
