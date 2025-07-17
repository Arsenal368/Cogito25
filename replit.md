# Cogito - Political Bias Detection & News Analysis Platform

## Overview

Cogito is a sophisticated web application designed to help users identify and understand political bias in news media. The platform combines a political compass assessment tool with bias detection capabilities to provide users with a more informed and balanced perspective on current events. Built with a focus on minimalist design and intellectual aesthetics, Cogito aims to combat AI-driven disinformation and political polarization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth interactions and micro-animations
- **Design System**: Custom design tokens based on minimalist, academic aesthetic

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with planned PostgreSQL persistence
- **API Design**: RESTful endpoints with `/api` prefix

### Database Schema
The application uses a PostgreSQL database with four main tables:
- **users**: Stores user credentials and political leanings
- **quizResponses**: Tracks individual quiz answers for political assessment
- **articles**: Contains news articles with bias scores and perspective classifications
- **readingHistory**: Records user reading patterns for personalized recommendations

## Key Components

### Political Assessment System
- Interactive quiz with economic and social questions
- Dynamic political compass visualization
- Real-time scoring and classification
- Persistent user profiling

### News Analysis Engine
- Article categorization by political perspective (liberal, conservative, neutral)
- Bias scoring algorithm
- Content analysis for emotional language and factual content
- Source credibility assessment

### User Interface Components
- **Navigation**: Fixed header with smooth transitions
- **Hero Section**: Animated thought node following cursor movement
- **Article Cards**: Perspective-based styling with hover animations
- **Political Compass**: Interactive visualization with quadrant mapping
- **Bias Detector**: Real-time analysis of URLs and text content

### Design System
- **Color Palette**: Alabaster white (#F6F6F6), Ink graphite (#121212), Cogito blue (#0C6CF5), Sage green (#3BAF8E)
- **Typography**: Clean sans-serif fonts with academic styling
- **Animations**: Cognitive-paced transitions and scroll-linked 3D elements
- **Layout**: Precision grid system with generous whitespace

## Data Flow

1. **User Registration/Authentication**: Users create accounts and take political assessment quiz
2. **Political Profiling**: Quiz responses are processed to generate political compass position
3. **Content Curation**: Articles are fetched and categorized based on political perspective
4. **Personalized Recommendations**: Content is filtered based on user's political leanings
5. **Bias Analysis**: Real-time processing of article content for bias detection
6. **Reading Tracking**: User interactions are logged for improved recommendations

## External Dependencies

### Database & Infrastructure
- **Neon Database**: PostgreSQL hosting service
- **Drizzle Kit**: Database migration and schema management

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Development Tools
- **TypeScript**: Type safety and developer experience
- **ESLint/Prettier**: Code quality and formatting
- **Vite**: Development server and build tool

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Local PostgreSQL or Neon cloud instance
- **Environment Variables**: DATABASE_URL for database connection

### Production Build
- **Frontend**: Static files built with Vite and served from `/dist/public`
- **Backend**: Node.js server compiled with esbuild
- **Database**: Managed PostgreSQL instance with connection pooling
- **Deployment**: Containerized deployment with Express serving both API and static files

### Build Commands
- `npm run dev`: Development server with hot reload
- `npm run build`: Production build (frontend + backend)
- `npm run start`: Production server
- `npm run db:push`: Database schema synchronization

The application follows a monorepo structure with shared TypeScript definitions, enabling type safety across the full stack while maintaining clear separation between client and server code.