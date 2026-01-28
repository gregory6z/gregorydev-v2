# energer-portal

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # TypeScript + Vite build
npm run lint       # Run ESLint
npm run typecheck  # TypeScript compiler check
npm run preview    # Preview production build
```

## Architecture

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
├── helpers/
│   ├── validators.ts       # Regex, Luhn, validation functions
│   └── formatters.ts       # Sanitizers (cleanPhone), display formatters (formatSiret, formatPhone)
├── lib/
│   ├── react-query/        # QueryClient config
│   └── utils.ts            # Utility functions (cn, etc.)
├── env.ts                  # Zod-validated environment variables
├── constants/              # App constants
└── Router.tsx              # Route definitions
```

## Detailed Documentation

- **API Layer**: `src/api/CLAUDE.md`
- **Internationalization**: `src/i18n/CLAUDE.md`

## Conventions

### Arrow Functions
All components and functions use **arrow functions**. No `function` declarations.

### Naming
- All folders: **kebab-case**
- Pages: flat files in `pages/`, named `{name}-page.tsx`
- Components: feature folders with `index.tsx`
- Types: co-located with components when specific, in `schemas.ts` when shared

### Environment Variables
- Validated at startup with Zod in `src/env.ts`
- Always access via `env.VITE_API_URL`, never `import.meta.env` directly
- To add a new variable: add to `.env`, `.env.example`, and `src/env.ts`

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

## Development Workflow

1. **Analysis**: Read the codebase to understand current implementation
2. **Planning**: Create a clear task breakdown
3. **Validation**: Validate approach with user if changes are significant
4. **Implementation**: Work systematically, keep changes minimal
5. **Simplicity**: Each change should impact the code minimally

## Best Practices

### DO
- Use API hooks directly in child components
- Co-locate types with their code
- Keep translations split by feature
- Follow existing patterns
- Run lint and typecheck before committing

### DO NOT
- Create `services/` or `types/` folders
- Create `common` i18n namespace
- Pass API data via props from parent to child
- Use `function` declarations
- Use Zod `transform` in schemas used with React Hook Form (zodResolver validates but does not apply transforms to form state)

## Zod + React Hook Form

Zod schemas must remain **pure validation** — no `.transform()`. React Hook Form's `zodResolver` uses Zod for validation only; transforms are not applied to the form state.

**Data transformation** (e.g., stripping spaces from phone numbers) must happen in the **mutation layer** (`mutations.ts`) before sending to the API.

```typescript
// schemas.ts — validation only
phone: z.string()
  .min(1, "validation.phoneRequired")
  .regex(/^(?:(?:\+33|0033)\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/, "validation.phoneInvalid"),

// mutations.ts — transform before sending
const cleanPhone = (v: string) => v.replace(/[\s.-]/g, "");
const payload = { ...data, phone: cleanPhone(data.phone) };
```
