# DocPal Frontend

## Overview

**DocPal Frontend** is the user-facing web application for the DocPal medical AI platform. It provides a secure, responsive, and intuitive chat interface that allows users to interact with the backend medical assistant powered by FDA-backed intelligence and LLM orchestration.

Built with **Next.js**, **React**, and **Tailwind CSS**, the frontend is designed to deliver a polished conversational experience while maintaining strong integration with authentication, backend APIs, and deployment-ready infrastructure.

---

## Purpose of the Frontend

The frontend serves as the presentation layer of the DocPal ecosystem.

Its responsibilities include:

- Rendering the conversational UI
- Managing user authentication
- Sending chat requests to the backend API
- Displaying structured medical responses
- Showing health/system readiness indicators
- Supporting responsive layouts for desktop and mobile users

The frontend does **not** perform medical reasoning itself — it delegates intelligence tasks to the backend and focuses solely on user interaction and experience.

---

## Core Objectives

- Deliver a clean and accessible medical AI chat experience
- Ensure seamless integration with the backend API
- Provide secure access control for users
- Maintain a scalable and production-ready codebase
- Support deployment on modern cloud platforms

---

## Technical Stack

### Framework & Libraries

- **Next.js** — React framework for routing and rendering
- **React** — component-based UI development
- **TypeScript** — static typing for reliability
- **Tailwind CSS** — utility-first styling
- **Clerk** — authentication and user management
- **Lucide Icons / UI utilities** — modern UI elements

---

## Application Architecture

### Layered Frontend Design

```text
User Browser
     ↓
Next.js App Router
     ↓
UI Components / Pages
     ↓
Hooks / State Management
     ↓
API Service Layer
     ↓
DocPal Backend API
```

### Repository Structure

```text
docpal-frontend/
├── pages/             # Next.js routes/pages
├── public/            # Static assets
├── styles/            # Global styles
├── middleware.ts      # Route protection / auth logic
├── next.config.js     # Next.js configuration
└── package.json       # Dependencies / scripts
```

## Key Features

1. Conversational Medical Chat Interface

The application provides a real-time chat experience where users can:

- Ask drug-related questions
- Compare medications
- Request follow-up clarifications

Responses are rendered in a structured, readable format with markdown support.

2. Authentication & Access Control

Clerk integration enables:

- User sign-up / sign-in
- Session persistence
- Protected routes
- User profile management

This ensures only authenticated users access the assistant.

3. Backend Connectivity

The frontend communicates with the backend via REST APIs.

Key API endpoints:

- `/api/chat` -> sends user prompts
- `/api/health` -> checks backend readiness

This supports health monitoring and user feedback.

4. Health Status Indicator

A visible system health check allows users to confirm:

- backend availability
- service readiness
- operational stability

This improves trust and transparency.

5. Responsive User Experience

Designed for:

- desktop
- tablet
- mobile devices

Ensures accessibility across screen sizes.

## UI/UX Philosophy

The frontend emphasizes:

- clarity
- minimal cognitive load
- trustworthiness
- fast interaction cycles

Because medical AI systems require user confidence, the interface avoids clutter and prioritizes readability.

## State Management Approach

State is managed locally using React hooks and component composition.

This lightweight approach supports:

- chat history handling
- loading states
- API responses
- authentication states

Avoids unnecessary complexity.

## Deployment Strategy

The frontend is optimized for deployment to Vercel.

### Why Vercel?

- native Next.js support
- fast global CDN
- automatic previews
- easy environment variable management

## Environment Configuration

Typical variables include:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-secret-key
```