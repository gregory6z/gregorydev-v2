# API Layer

## Overview

This folder contains everything related to API communication: HTTP client, React Query hooks (queries/mutations), and Zod schemas with TypeScript types.

## Structure

```
api/
├── client.ts           # ky instance + ApiResponse interface
├── CLAUDE.md           # This file
└── {feature}/
    ├── queries.ts      # useQuery hooks
    ├── mutations.ts    # useMutation hooks
    └── schemas.ts      # Zod schemas + TypeScript types
```

## Key Principles

### No Separate Services or Types Folders
- **NO `services/` folder** — Use `ky` directly in query/mutation files
- **NO `types/` folder** — Types live in `schemas.ts` alongside Zod schemas

### Use Hooks Directly in Components
Each component calls its own hooks. React Query handles caching. Don't fetch in parent and pass via props.

## Error Handling

Errors are based on `status_code`, never on `message`.

### Error Propagation Flow

```
API response { success: false, status_code: 401 }
        │
        ▼
unwrapResponse() (client.ts)
  → throw new Error(String(status_code))   // Error("401")
        │
        ▼
React Query catches the error
  → mutation.error = Error("401")
  → mutation.isError = true
        │
        ▼
Component reads mutation.error.message
  → t(`errors.${mutation.error.message}`)  // t("errors.401")
        │
        ▼
i18n resolves the key (auth.json)
  → "errors.401" → "Identifiants incorrects"
```

### Rules

- All mutations use `unwrapResponse()` from `client.ts` to standardize error handling
- `unwrapResponse()` checks `response.success` — returns `data` on success, throws `Error(status_code)` on failure
- Components catch errors and translate via i18n using the status code: `t(`errors.${error.message}`)`
- Translation keys are HTTP status codes: `"401"`, `"403"`, `"404"`, `"409"`, `"500"`, `"unknown"`
- The `message` field from the API is **never** displayed to the user — it exists only for logs/debug

## HTTP Client (ky)

Configured in `client.ts`:
- Uses `env.VITE_API_URL` (Zod-validated) as prefix
- Timeout: 30s
- Retry: 0 (React Query handles retries)
- Auto-injects JWT from localStorage via beforeRequest hook
- All responses follow `ApiResponse<T>` envelope: `{ success, data, message, status_code }`
- Exports `unwrapResponse<T>()` — the single entry point for unwrapping API responses in mutations

## Schemas & Types

### When to use Zod vs TypeScript Interface

- **Zod schemas**: Forms with user input that needs validation
- **TypeScript interfaces**: API response types, internal data structures (no validation needed)

### Zod 4

- Import from `zod/v4` (never `zod`)
- French locale configured globally via `z.config(fr())` — handles standard messages automatically
- Custom business messages use i18n keys as strings directly in the schema

## Queries (useQuery)

- Use query key factories for consistency
- Use `enabled` for conditional/dependent queries
- Use `queryOptions` for reusable/prefetchable queries
- Include all dependencies in `queryKey`

## Mutations (useMutation)

- Always wrap API calls with `unwrapResponse()` inside `mutationFn`
- `onSuccess` in mutation definition: only for universal side effects (e.g. localStorage token storage)
- `onSuccess` in component: for navigation, step transitions, UI-specific logic
- Use `queryClient.invalidateQueries` after mutations that change data
- Optimistic updates: `onMutate` → `onError` rollback → `onSettled` invalidate

## Best Practices

### DO
- Include all dependencies in queryKey
- Use query key factories
- Use `isPending` for loading states
- Invalidate queries after mutations
- Use Zod only for forms with user input

### DO NOT
- Create separate services or types files
- Pass API data via props from parent to child
- Use Zod for types that don't need validation
- Display `message` from API responses to the user
