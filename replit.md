# Real Estate CRM Dashboard Application

## Overview

This is a full-stack web application designed for real estate professionals, built with a focus on CRM integration and transaction management. The application provides a comprehensive dashboard for managing real estate transactions, forms, team members, and tasks. It's architected to work seamlessly with FollowUpBoss CRM and is optimized for Heroku deployment with a single-dyno architecture.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **UI Library**: Radix UI components with shadcn/ui for consistent, accessible design
- **Styling**: Tailwind CSS with custom design tokens optimized for professional business use
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful endpoints with consistent error handling and validation
- **Session Management**: Express sessions with PostgreSQL storage via connect-pg-simple
- **Development Server**: Hot-reload development server with production static file serving

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Connection**: Neon Database serverless PostgreSQL for cloud deployment
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation

### Single-Dyno Deployment Pattern
- **Unified Server**: Single Express server handles both API routes and static file serving
- **Port Configuration**: Uses process.env.PORT for Heroku compatibility (defaults to 5000)
- **Build Process**: Vite builds frontend assets, ESBuild bundles backend for production
- **Asset Serving**: Development uses Vite middleware, production serves static files from dist

### Authentication and Authorization
- **Session-based Authentication**: Uses Express sessions with PostgreSQL storage
- **User Management**: Role-based user system with agents and administrators
- **Security**: CORS configuration and request logging middleware

### Component Architecture
- **Shared Schemas**: Common TypeScript interfaces and Zod validation schemas
- **Modular Components**: Reusable UI components with consistent styling
- **Dashboard Layout**: Responsive sidebar navigation with mobile-friendly design
- **Form Handling**: React Hook Form with Zod resolvers for robust form validation

### Business Logic Integration
- **CRM-Ready Design**: Data structures optimized for FollowUpBoss integration
- **Transaction Management**: Complete lifecycle tracking for real estate transactions
- **Form Processing**: Multi-step form handling with status tracking and due dates
- **Team Collaboration**: Agent assignment, task management, and activity tracking
- **Quick Access**: External platform integration for MLS, analytics, and document management

## External Dependencies

### Database and Storage
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database queries and migrations
- **connect-pg-simple**: PostgreSQL session store for Express

### UI and Design System
- **Radix UI**: Comprehensive set of accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Modern icon library with consistent styling
- **shadcn/ui**: Pre-built component library based on Radix UI

### Development and Build Tools
- **Vite**: Frontend build tool with HMR and optimized production builds
- **TypeScript**: Type safety across the entire application stack
- **ESBuild**: Fast JavaScript bundler for backend production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### External Platform Integrations
- **MLS Integration**: Property search and listing management
- **SISU.co**: Real estate analytics and performance tracking
- **Dotloop**: Transaction document management
- **Skyslope**: Transaction management platform
- **FollowUpBoss**: Primary CRM system for lead and client management

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class name utility
- **class-variance-authority**: Component variant management
- **zod**: Runtime type validation and schema definition
- **react-hook-form**: Form state management and validation