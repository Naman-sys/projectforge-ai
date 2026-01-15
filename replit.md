# ProjectForge AI

## Overview

ProjectForge AI is an intelligent software project idea generator that runs entirely on local rule-based logic without requiring external paid APIs (no OpenAI, Gemini, or Groq). Users input their skill level, domain, preferred language, and project type, and the system generates unique project ideas complete with problem statements, tech stacks, roadmaps, folder structures, and AIML-specific intelligence like model suggestions and dataset recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with Vite for fast development and HMR
- **Styling**: Tailwind CSS with a custom "Cyber/Tech" dark theme aesthetic
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Animations**: Framer Motion for smooth transitions and result card animations
- **State Management**: TanStack React Query for server state and mutations
- **Routing**: Wouter for lightweight client-side routing
- **Type Safety**: Full TypeScript with shared types between client and server

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **AI Engine**: Rule-based logic engine (no external AI APIs)
  - Uses internal templates and randomization
  - NLP keyword mapping via the `natural` library
  - Domain-specific content generation (AIML, Web Dev, Data Science, Cyber Security, App Dev)
  - Skill-level aware output (Beginner → Classical ML, Intermediate → Ensemble, Advanced → Deep Learning)
- **API Design**: RESTful endpoints with Zod schema validation
- **Build**: esbuild for production bundling with selective dependency bundling

### Data Flow
1. User selects options in the form (skill level, domain, language, project type)
2. Frontend sends POST request to `/api/generate` with validated input
3. Backend engine generates project idea using rule-based templates
4. Response includes title, problem statement, features, tech stack, roadmap, folder structure
5. AIML domain includes additional fields: model suggestions, learning types, evaluation metrics, dataset recommendations
6. Generation is logged to database (fire-and-forget, doesn't block response)

### Shared Code
- `shared/schema.ts`: Drizzle ORM table definitions and Zod validation schemas
- `shared/routes.ts`: API route definitions with input/output schemas
- Path aliases configured: `@/` for client, `@shared/` for shared code

## External Dependencies

### Database
- **PostgreSQL**: Primary database for logging generated ideas
- **Drizzle ORM**: Type-safe database queries and schema management
- **Drizzle Kit**: Database migrations and schema push (`npm run db:push`)
- Requires `DATABASE_URL` environment variable

### Key NPM Packages
- **natural**: NLP tokenization for keyword mapping in the AI engine
- **zod**: Runtime schema validation for API inputs/outputs
- **drizzle-zod**: Bridge between Drizzle schemas and Zod validation
- **@tanstack/react-query**: Async state management for API calls
- **framer-motion**: Animation library for UI transitions
- **Radix UI**: Accessible component primitives (via shadcn/ui)

### Development Tools
- **Vite**: Frontend dev server with HMR
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Production bundling for server code
- **Replit plugins**: Dev banner, cartographer, runtime error overlay (development only)