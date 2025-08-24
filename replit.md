# replit.md

## Overview

ResumeRooster is a comprehensive job search platform that helps users find relevant job opportunities through intelligent matching and AI-powered assistance. The application combines job board aggregation with resume analysis to provide personalized job recommendations and career guidance. Built as a full-stack TypeScript application, it features a React frontend with shadcn/ui components and an Express backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite for build tooling and development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library with Radix UI primitives and Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation resolvers
- **Styling**: Tailwind CSS with custom design system including dark mode support

### Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **File Handling**: Multer middleware for resume file uploads with memory storage
- **Development**: Hot module replacement via Vite integration in development mode
- **Error Handling**: Centralized error middleware with structured error responses

### Data Storage Solutions
- **Primary Database**: PostgreSQL accessed via Neon serverless driver
- **ORM**: Drizzle ORM with schema-first approach for type safety
- **Session Management**: PostgreSQL session store using connect-pg-simple
- **File Storage**: Memory-based file handling for resume uploads (designed to extend to cloud storage)
- **Fallback Storage**: In-memory storage implementation for development and testing

### Database Schema Design
- **Users**: Authentication and profile management
- **Resumes**: File metadata, parsed content, and extracted data storage
- **Jobs**: Aggregated job listings from multiple sources with normalized fields
- **Search Queries**: User search history and analytics
- **AI Conversations**: Chat history and context preservation for AI interactions

### Authentication and Authorization
- Session-based authentication using PostgreSQL session storage
- User management with encrypted passwords
- Cookie-based session persistence with configurable expiration

### External Service Integrations
- **OpenAI API**: GPT-4o integration for resume analysis, job matching, and career advice
- **Job Board APIs**: Designed for Indeed, LinkedIn, and other job aggregation services
- **Resume Parsing**: Extensible architecture supporting PDF, DOC, and text file processing

### API Architecture
- **RESTful Design**: Consistent REST endpoints with proper HTTP status codes
- **File Upload Endpoints**: Multipart form data handling for resume uploads
- **Search Endpoints**: Parameterized job search with filtering and pagination
- **AI Endpoints**: Conversational AI interface for career guidance
- **Data Validation**: Zod schema validation for all API inputs and outputs

### Component Architecture
- **Modular UI Components**: Reusable components for job cards, search interfaces, and filters
- **Widget System**: Floating AI chat widget and modal-based interactions
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA compliance and keyboard navigation support

### Development and Build Process
- **Development Server**: Vite with HMR and TypeScript compilation
- **Production Build**: Optimized bundling with esbuild for server and Vite for client
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Organized import structure with @ aliases for clean code organization