# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow

1. **Analysis Phase**: First, think about the problem and read the codebase to understand the current implementation
2. **Planning**: Create a clear task breakdown that can be tracked using TodoWrite
3. **Validation**: Before starting work, validate the approach with user if changes are significant
4. **Implementation**: Work on tasks systematically, marking them as completed as progress is made
5. **Simplicity**: Each change should impact the code minimally. Everything comes down to simplicity
6. **Review**: Provide a comprehensive summary of changes made

## Project Overview

Energer is a React TypeScript application built with Vite for managing energy operations (CEE - Certificats d'Economies d'Energie). Platform for energy professionals to manage their operations, with SIRET-based company registration.

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # TypeScript + Vite build
npm run lint       # Run ESLint
npm run typecheck  # TypeScript compiler check
npm run preview    # Preview production build
```

## Architecture Overview

```
src/
├── api/                    # API layer (see src/api/CLAUDE.md)
│   ├── client.ts           # ky instance
│   └── {feature}/          # queries.ts, mutations.ts, schemas.ts
├── components/
│   ├── ui/                 # shadcn/ui components (flat)
│   ├── layout/             # Layout components (public, private)
│   └── {feature}/          # Feature-specific components
├── pages/                  # Flat page files (login-page.tsx, etc.)
├── i18n/                   # Internationalization (see src/i18n/CLAUDE.md)
│   ├── i18n.ts             # i18next configuration
│   └── locales/fr/         # French translations per feature
├── contexts/               # React contexts
├── lib/
│   ├── react-query/        # QueryClient config
│   └── utils.ts            # Utility functions (cn, etc.)
├── env.ts                  # Zod-validated environment variables
├── constants/              # App constants
└── Router.tsx              # Route definitions
```

## Detailed Documentation

- **API Layer**: `src/api/CLAUDE.md` - Queries, mutations, schemas, ky, TanStack Query
- **Internationalization**: `src/i18n/CLAUDE.md` - i18next, namespaces, lazy loading

## Key Architecture Decisions

### 1. API Layer
> See `src/api/CLAUDE.md` for detailed documentation

- NO `services/` folder - use ky directly in queries/mutations
- NO `types/` folder - types in `schemas.ts` or co-located
- Use hooks directly in child components (not props from parent)

### 2. Internationalization
> See `src/i18n/CLAUDE.md` for detailed documentation

- Divided by feature with lazy loading
- Each feature has its own namespace
- No shared `common` namespace

### 3. Arrow Functions
All components and functions use **arrow functions**. No `function` declarations.

```typescript
// ✓
export const LoginForm = () => { ... }
export const useLogin = () => { ... }

// ✗
export function LoginForm() { ... }
export function useLogin() { ... }
```

### 4. Naming Convention
All folders in the project use **kebab-case**. No exceptions.

### 5. File Structure

**Pages** are flat files directly in `pages/`, named in **kebab-case** :

```
pages/
├── login-page.tsx
├── forgot-password-page.tsx
├── register-siret-page.tsx
└── dashboard-page.tsx
```

**Components** live in feature folders with an `index.tsx` :

```
components/
├── layout/
│   ├── public-layout/
│   │   └── index.tsx
│   └── private-layout/
│       └── index.tsx
├── auth/
│   ├── login-form/
│   │   └── index.tsx
│   └── password-input/
│       └── index.tsx
└── ui/                 # shadcn/ui components (flat)
```

Types are co-located with components when specific, in `schemas.ts` when shared:

```typescript
// components/auth/login-form/index.tsx
type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  // ...
}
```

## Configuration

### Environment Variables

Environment variables are validated at startup with Zod in `src/env.ts`. If a variable is missing or invalid, the app crashes immediately with a clear message.

```typescript
import { env } from "@/env";
env.VITE_API_URL // ✓ typed and validated
import.meta.env.VITE_API_URL // ✗ never use directly
```

To add a new variable:
1. Add it to `.env` and `.env.example`
2. Add it to the schema in `src/env.ts`
3. Use it via `env.MY_VARIABLE`

Current variables:
- `VITE_API_URL`: Backend API URL

### Key Dependencies
- **UI**: shadcn/ui, Tailwind CSS v4, Lucide icons
- **Forms**: react-hook-form, Zod validation
- **Data**: TanStack Query (React Query)
- **HTTP**: ky
- **Routing**: React Router v6
- **i18n**: i18next, react-i18next

## Route Structure

```
/login              - Login page (public only)
/register           - Registration flow (public only)
/forgot-password    - Password reset request (public only)
/reset-password     - New password form (public only)
/dashboard          - Main dashboard (protected)
/operations         - Operations list (protected)
```

## Development Guidelines

### DO
- Use API hooks directly in child components
- Co-locate types with their code
- Keep translations split by feature
- Follow existing patterns

### DO NOT
- Create `services/` folder - use ky in queries/mutations
- Create `types/` folder - put in schemas or co-locate
- Create `common` i18n namespace - split by feature
- Pass API data via props from parent to child

### Import Patterns
```typescript
import { Button } from '@/components/ui/button';
import { useLogin } from '@/api/auth/mutations';
import { loginSchema } from '@/api/auth/schemas';
import { useCurrentUser } from '@/api/auth/queries';
```

## Important Notes

- Always run lint and typecheck before committing
- API calls go through `api/` folder using ky + React Query
- Form validation uses Zod schemas
- Types live with their related code
