# API Layer

## Overview

This folder contains everything related to API communication: HTTP client, React Query hooks (queries/mutations), and Zod schemas with TypeScript types.

## Structure

```
api/
├── client.ts           # ky instance + unwrapResponse
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

Errors are based on `statusCode`, never on `message`.

### Error Propagation Flow

API response `{ success: false, statusCode }` → `unwrapResponse()` throws `Error(statusCode)` → React Query catches → component reads `mutation.error.message` → i18n resolves `errors.{code}`

### Network Error Handling

`unwrapResponse()` handles network errors automatically:

| Error Type | Converted To | i18n Key |
|------------|--------------|----------|
| `TypeError: Failed to fetch` | `Error("network_error")` | `errors.network_error` |
| `TimeoutError` (ky) | `Error("timeout_error")` | `errors.timeout_error` |
| API `success: false` | `Error(statusCode)` | `errors.{statusCode}` |

### Using useFormState for Error Display

When using `useFormContext` with `trigger()`, use `useFormState({ control })` to subscribe to formState changes — otherwise errors won't re-render.

### Rules

- All mutations/queries use `unwrapResponse()` from `client.ts`
- `unwrapResponse()` receives a Promise (don't await before passing), handles network errors, and unwraps the response
- Components catch errors and translate via i18n using the error code
- Translation keys: `"401"`, `"403"`, `"404"`, `"409"`, `"500"`, `"network_error"`, `"timeout_error"`, `"unknown"`
- The `message` field from the API is **never** displayed to the user

## HTTP Client (ky)

Configured in `client.ts`:
- Uses `env.VITE_API_URL` (Zod-validated) as prefix
- Timeout: 30s
- Retry: 0 (React Query handles retries)
- `throwHttpErrors: false` — errors are handled via `unwrapResponse()`
- All responses follow `ApiResponse<T>` envelope: `{ success, data, message, statusCode }`

### unwrapResponse()

Single entry point for all API calls. Receives a Promise and handles everything. **Important:** Pass the Promise directly, don't await it — awaiting defeats network error handling.

### Request Hooks (beforeRequest)

1. **addAuthHeader** — Auto-injects JWT from cookies as `Authorization: Bearer <token>`
2. **transformRequestBody** — Converts request body keys from camelCase to snake_case

### Response Hooks (afterResponse)

1. **transformResponseBody** — Converts response body keys from snake_case to camelCase

### Case Transformation

The API uses snake_case, the front-end uses camelCase. Transformation is automatic via hooks. Helpers in `@/helpers/transformers.ts`: `toSnakeCaseKeys()` and `toCamelCaseKeys()`.

## Schemas & Types

### When to use Zod vs TypeScript Type

- **Zod schemas**: Forms with user input that needs validation
- **TypeScript types**: API response types, internal data structures (no validation needed)

### Const Enums Pattern

Use `as const` objects for enums, with a derived union type via `(typeof Obj)[keyof typeof Obj]`.

### Shared Fields

Extract common Zod fields (email, phone, password) as constants at the top of the schema file and reuse across schemas.

### Refine Helpers

Extract refine logic (e.g., password confirmation) as reusable generic functions.

### Nullable Fields

API responses with AI-extracted data may have nullable fields. Use explicit `| null`, not optional (`?`).

### Void Responses

Use `ApiResponse<void>` for mutations that don't return data.

### Zod 4

- Import from `zod/v4` (never `zod`)
- French locale configured globally via `z.config(fr())`
- Custom business messages use i18n keys as strings directly in the schema

## Queries (useQuery)

### Query Keys Factory

Each feature exports a `keys` factory in `queries.ts` for consistent cache management with keys: `all`, `counts()`, `lists()`, `list(filters)`. Enables granular invalidation, consistency, hierarchy, and type-safety.

### Query Options

| Option | When to use |
|--------|-------------|
| `enabled` | Conditional or dependent queries |
| `staleTime` | Data that rarely changes |
| `refetchOnWindowFocus` | Disable for static data |
| `placeholderData` | Keep old data during loading (pagination) |
| `refetch` | Force manual refetch (rare, prefer invalidation) |

### Rules

- Include all dependencies in `queryKey`
- Use `queryOptions` for reusable/prefetchable queries
- Use `placeholderData: keepPreviousData` to avoid loading flash during pagination

## Mutations (useMutation)

### Why Mutations Don't Need a Keys Factory

Mutations are not cached — they execute an action. What matters is invalidating the affected queries afterward.

### Separation of Concerns

**In `mutations.ts`:** Only `mutationFn` with `unwrapResponse()`. No `useQueryClient()` or cache logic.

**In component:** `onSettled` for cache invalidation, `onSuccess` for navigation/UI, `onError` for error feedback.

## setFilters Pattern

For components with filters (tables, paginated lists): parent defines `filters` state, children receive `filters` and `setFilters` as props. Use explicit names in callbacks: `setFilters((filters) => ...)`.

## Best Practices

### DO
- Pass Promise directly to `unwrapResponse()` (don't await)
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
- Await before passing to `unwrapResponse()`
