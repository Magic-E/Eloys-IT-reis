# Eloy's Learning Dashboard

## Overview

This is a personal portfolio/learning dashboard application for Eloy Hoofs, a Technical Project Lead at Gemeente Heerlen. The application showcases his IT learning journey through an IT Basic Training program, displaying assignments, skills progression, and reflections. It features an AI-powered "Digital Twin" chat widget that can answer questions about his experience and learning.

The stack is a full-stack TypeScript application with React frontend, Express backend, PostgreSQL database, and OpenAI integration for the chat feature.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom "Deep Space" dark theme
- **UI Components**: shadcn/ui component library (Radix primitives)
- **Animations**: Framer Motion for page transitions and interactions
- **Charts**: Recharts for radar chart visualization of skills

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod validation

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains tables for assignments, skills, reflections, conversations, and messages
- **Migrations**: Managed via `drizzle-kit push` command

### Key Data Models
- **Assignments**: Learning modules with title, description, key learnings, and metadata
- **Skills**: Skill progression tracking with before/after levels (1-10 scale)
- **Reflections**: Personal reflection content organized by topic
- **Conversations/Messages**: Chat history for the AI Digital Twin feature

### API Structure
Routes are defined declaratively in `shared/routes.ts` with method, path, and Zod response schemas:
- `GET /api/assignments` - List all assignments
- `GET /api/assignments/:id` - Get single assignment
- `GET /api/skills` - List all skills
- `GET /api/reflections` - List all reflections
- `POST /api/chat` - Send message to AI Digital Twin

### Development vs Production
- Development: Vite dev server with HMR, proxied through Express
- Production: Static files served from `dist/public`, server bundled to `dist/index.cjs`

## External Dependencies

### AI Integration
- **OpenAI API**: Used for the "Digital Twin" chat feature via `openai` npm package
- **Environment Variables**: 
  - `AI_INTEGRATIONS_OPENAI_API_KEY` - API key for OpenAI
  - `AI_INTEGRATIONS_OPENAI_BASE_URL` - Base URL (uses Replit AI Integrations)

### Database
- **PostgreSQL**: Required, connection via `DATABASE_URL` environment variable
- **Session Store**: `connect-pg-simple` for session storage (if sessions are enabled)

### Replit Integrations
The `server/replit_integrations/` and `client/replit_integrations/` folders contain pre-built utilities for:
- Audio/voice chat streaming
- Image generation
- Chat conversation persistence
- Batch processing with rate limiting

These are optional integrations that can be enabled by calling their registration functions.

### External APIs Used
- Chuck Norris Jokes API (`api.chucknorris.io`) - Demo of external API integration on the API Integration page
- Digitoegankelijk.nl Dashboard (organisatie-ID: 281) - Digital accessibility status for Gemeente Heerlen
- Waarstaatjegemeente.nl / CBS - Municipal statistics (gemeentecode: 0951)

### Pages
- **Home**: Hero slider, features overview
- **Mijn reis**: Learning journey assignments
- **Vaardigheden**: Skills radar chart and progression
- **Reflecties**: Personal reflections on learning
- **API-integratie**: Demo API calls (Chuck Norris, Vlaai API, data source references)
- **Toegankelijkheid**: Digital accessibility dashboard and municipal statistics for Gemeente Heerlen