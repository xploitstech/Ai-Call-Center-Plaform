# AI Call Center Platform - Product Requirements Document (PRD)

## Project Overview

You are building an AI-based call center platform that enables users to create and configure agents tailored to their business needs, facilitating customer support operations. This project focuses on developing a Minimum Viable Product (MVP) for the platform, allowing users to perform CRUD operations on agents responsible for handling calls.

### Technologies Used

**Frontend:**
- TypeScript
- Next.js
- ShadCN UI
- Tailwind CSS
- Lucide Icons

**Backend:**
- Drizzle ORM
- PostgreSQL
- Next.js App Router

**Authentication:**
- Supabase (password-based)

## Table of Contents

1. [Core Functionalities](#core-functionalities)
   - [Authentication](#1-authentication)
   - [Landing Page](#2-landing-page)
   - [User Dashboard](#3-user-dashboard)
   - [Agent Dashboard](#4-agent-dashboard)
2. [Database Design](#database-design)
   - [Schema](#schema)
   - [Row-Level Security (RLS)](#row-level-security-rls)
3. [Documentation](#documentation)
   - [Supabase Authentication with Next.js](#supabase-authentication-with-nextjs)
   - [Drizzle ORM with Zod](#drizzle-orm-with-zod)
   - [Drizzle Connection with PostgreSQL](#drizzle-connection-with-postgresql)
4. [File and Folder Structure](#file-and-folder-structure)
5. [Development Guidelines](#development-guidelines)

## Core Functionalities

### 1. Authentication

#### Objective
Set up authentication using Supabase to manage user registration and login, providing secure access to the platform's features.

#### Implementation Steps

1. **Set Up Supabase Authentication**

   a. Install Necessary Packages:
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```

   b. Configure Environment Variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Set Up Supabase Client Utilities**

   a. Client-side Supabase Client:
   ```typescript
   // lib/supabaseClient.ts
   import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

   export function createClient() {
     return createBrowserSupabaseClient();
   }
   ```

   b. Server-side Supabase Client:
   ```typescript
   // lib/supabaseServer.ts
   import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
   import { cookies } from 'next/headers';

   export function createClient() {
     return createServerSupabaseClient({ headers, cookies });
   }
   ```

3. **Implement Middleware for Session Management**

```typescript
// app/middleware.ts
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 2. Landing Page

#### Objective
Develop the landing page with modals for Sign In and Sign Up that utilize the Supabase authentication.

#### Components

1. **Navbar**
   - Left: Product name "AI CALL CENTER" (serves as the home button)
   - Right: "Sign In" and "Sign Up" buttons

2. **Hero Section**
   - Headline: "Let our Agent manage your customer interactions for you"
   - Call-to-Action (CTA) button

3. **Testimonials Carousel**
   - Displays user testimonials with navigation controls

4. **Footer**
   - Left: "By NextGen Tech"
   - Right: "Contact Us" and "About AI Call Center" buttons

5. **Modals**
   - About AI Call Center: Scrollable information modal
   - Sign Up Form:
     - Fields: Name, Email, Password
     - Uses lib/supabaseClient.ts for registration
   - Sign In Form:
     - Fields: Email, Password
     - Uses lib/supabaseClient.ts for authentication
   - Contact Us Form:
     - Fields: Email, Message (textarea)

### 3. User Dashboard

#### Layout

1. **Sidebar**
   - Top: "Home," "Settings," "Billing" buttons
   - Bottom: "Logout" button

2. **Main Section**
   
   a. No Agents View:
   - Heading: "Let our AI agents handle your customers"
   - CTA: "Create your first agent"

   b. Existing Agents View:
   - Scrollable table with columns:
     - Status
     - Agents
     - Actions
   - "Create New Agent" button

#### Create New Agent Sheet

- **Basic Fields:**
  - Agent Name
  - System Prompt
  - Greetings Message

- **Select Components:**
  - Voice (Options: "Alloy," "Shimmer")
  - Language (Multi-select: "English," "Hindi")
  - Integration (Multi-select: "SQL DB," "Zendesk")

- **Advanced Section:**
  - Toggle switch labeled "Advanced"

### 4. Agent Dashboard

#### Layout

1. **Sidebar**
   - Header: Combobox for agent selection
   - Sections: "Analytics," "Configuration," "Advanced"
   - Footer: "Back" button

2. **Main Section**
   - Analytics Section (Empty for MVP)
   - Configuration Section
     - Form with agent settings
     - Save button for updates
   - Advanced Section (Empty for MVP)

## Database Design

### Schema

1. **User Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

2. **Agent Table**
```sql
CREATE TABLE agents (
  agent_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255),
  system_prompt TEXT DEFAULT 'Lorem Ipsum',
  greeting_message TEXT DEFAULT 'Lorem Ipsum',
  language TEXT[] NOT NULL,
  integration TEXT[],
  voice VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Row-Level Security (RLS)

- Users can only access their own data and agents
- Implement RLS policies for data isolation

## Documentation

### Supabase Authentication with Next.js

[Detailed implementation steps and code samples moved to a separate documentation file for brevity]

### Drizzle ORM with Zod

[Detailed implementation steps and code samples moved to a separate documentation file for brevity]

### Drizzle Connection with PostgreSQL

[Detailed implementation steps and code samples moved to a separate documentation file for brevity]

## File and Folder Structure

```
ai-call-center
├── README.md
├── .gitignore
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── drizzle.config.ts
├── .env.local
├── app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── middleware.ts
│   ├── dashboard
│   │   ├── page.tsx
│   │   └── agent
│   │       └── page.tsx
│   ├── login
│   │   └── page.tsx
│   ├── signup
│   │   └── page.tsx
├── components
│   ├── UIComponents.tsx
│   ├── Modals.tsx
│   ├── DashboardComponents.tsx
│   ├── AgentComponents.tsx
│   └── Hooks.tsx
├── lib
│   ├── db.ts
│   ├── supabaseClient.ts
│   ├── supabaseServer.ts
│   └── utils.ts
├── db
│   └── schema.ts
```

## Development Guidelines

### Implementation Order

1. Set up authentication with Supabase
2. Develop landing page and modals
3. Build user dashboard
4. Implement agent dashboard

### Coding Standards

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write modular, reusable components
- Implement proper error handling
- Use Tailwind CSS for styling
- Write unit tests for critical components

### Authentication and Security

- Use Supabase for both client and server-side auth
- Protect routes using middleware
- Implement RLS policies
- Validate all data using Zod schemas

### State Management

- Use React hooks and context API
- Keep global state minimal
- Localize state to components when possible

### Version Control

- Use Git for version control
- Follow GitFlow branching strategy