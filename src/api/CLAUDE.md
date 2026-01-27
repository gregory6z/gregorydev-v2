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

- Mocks return `message` in **English** (internal codes for logs/debug only)
- Mutations throw a native `Error` with the `status_code` as string: `throw new Error(String(response.status_code))`
- Components translate via i18n using the status code: `t(`errors.${error.message}`)` → `t("errors.401")`
- Translation keys are HTTP status codes: `"401"`, `"403"`, `"500"`, `"unknown"`
- The `message` field from the API is **never** displayed to the user

## HTTP Client (ky)

Configured in `client.ts`:
- Uses `env.VITE_API_URL` (Zod-validated) as prefix
- Timeout: 30s
- Retry: 0 (React Query handles retries)
- Auto-injects JWT from localStorage via beforeRequest hook
- All responses follow `ApiResponse<T>` envelope: `{ success, data, message, status_code }`

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

- Use `onSuccess` for side effects (cache update, localStorage, redirect)
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
