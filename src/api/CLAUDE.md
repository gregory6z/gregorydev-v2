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

Errors are based on `statusCode`, never on `message`.

### Error Propagation Flow

```
API response { success: false, statusCode: 401 }
        │
        ▼
unwrapResponse() (client.ts)
  → throw new Error(String(statusCode))   // Error("401")
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

### Using useFormState for Error Display

When using `useFormContext` with `trigger()` for validation, errors won't display unless you subscribe to formState changes. Use `useFormState` to ensure re-renders:

```tsx
// ❌ Won't re-render after trigger()
const { formState: { errors } } = useFormContext();

// ✅ Subscribes to formState changes
const { control } = useFormContext();
const { errors } = useFormState({ control });
```

### Rules

- All mutations use `unwrapResponse()` from `client.ts` to standardize error handling
- `unwrapResponse()` checks `response.success` — returns `data` on success, throws `Error(statusCode)` on failure
- Components catch errors and translate via i18n using the status code
- Translation keys are HTTP status codes: `"401"`, `"403"`, `"404"`, `"409"`, `"500"`, `"unknown"`
- The `message` field from the API is **never** displayed to the user — it exists only for logs/debug

## HTTP Client (ky)

Configured in `client.ts`:
- Uses `env.VITE_API_URL` (Zod-validated) as prefix
- Timeout: 30s
- Retry: 0 (React Query handles retries)
- `throwHttpErrors: false` — errors are handled via `unwrapResponse()`
- All responses follow `ApiResponse<T>` envelope: `{ success, data, message, statusCode }`
- Exports `unwrapResponse<T>()` — the single entry point for unwrapping API responses in mutations

### Request Hooks (beforeRequest)

1. **addAuthHeader** — Auto-injects JWT from cookies (`js-cookie`) as `Authorization: Bearer <token>`
2. **transformRequestBody** — Converts request body keys from camelCase to snake_case

### Response Hooks (afterResponse)

1. **transformResponseBody** — Converts response body keys from snake_case to camelCase

### Case Transformation

The API uses snake_case, the front-end uses camelCase. Transformation is automatic:

```
Front-end (camelCase)  →  API (snake_case)  →  Front-end (camelCase)
{ userName: "John" }   →  { user_name: "John" }  →  { userName: "John" }
```

Helpers are in `@/helpers/transformers.ts`:
- `toSnakeCaseKeys()` — for requests
- `toCamelCaseKeys()` — for responses

## Schemas & Types

### When to use Zod vs TypeScript Type

- **Zod schemas**: Forms with user input that needs validation
- **TypeScript types**: API response types, internal data structures (no validation needed)

### Const Enums Pattern

Use `as const` objects for enums, with a derived type for type-safety:
- Define a const object with values
- Derive a union type with `(typeof Obj)[keyof typeof Obj]`
- Use the object for runtime values, the type for compile-time checking

### Zod 4

- Import from `zod/v4` (never `zod`)
- French locale configured globally via `z.config(fr())` — handles standard messages automatically
- Custom business messages use i18n keys as strings directly in the schema

## Queries (useQuery)

### Query Keys Factory

Each feature exports a `keys` factory in `queries.ts` for consistent cache management:
- `all`: Base key for the feature
- `counts()`: For count queries
- `lists()`: For all list queries
- `list(filters)`: For a specific filtered list

**Why?**
- **Granular invalidation**: Invalidate all, just counts, all lists, or a specific filtered list
- **Consistency**: No typos, all queries use the same format
- **Hierarchy**: Parent keys invalidate all children
- **Type-safety**: `as const` ensures correct type inference

### Query Options

| Option | When to use |
|--------|-------------|
| `enabled` | Conditional or dependent queries |
| `staleTime` | Data that rarely changes (e.g., config, static lists) |
| `refetchOnWindowFocus` | Disable for data that doesn't change often |
| `placeholderData` | Keep old data during loading (pagination) |
| `refetch` | Force manual refetch (rare, prefer invalidation) |

### Rules

- Include all dependencies in `queryKey`
- Use `queryOptions` for reusable/prefetchable queries
- Use `placeholderData: keepPreviousData` to avoid loading flash during pagination

## Mutations (useMutation)

### Why Mutations Don't Need a Keys Factory

Queries are cached and identified by `queryKey`. Mutations are not cached - they execute an action and don't store the result. What matters is **invalidating the affected queries** afterward.

### Separation of Concerns

**In `mutations.ts`:**
- Only `mutationFn` with `unwrapResponse()`
- No `useQueryClient()` or cache logic
- Keep mutations simple and focused on the API call

**In component:**
- `onSettled`: cache invalidation with `queryClient.invalidateQueries`
- `onSuccess`: navigation, close dialog, reset form, change step
- `onError`: show error toast, user feedback

This separation ensures mutations are simple and reusable, while components control cache invalidation and UI logic.

## setFilters Pattern

For components with filters (tables, paginated lists):
- Parent component defines `filters` state with `useState`
- Child components (e.g., `DataTablePagination`) receive `filters` and `setFilters` as props
- Update logic lives in the component that needs it
- Use explicit names in callbacks: `setFilters((filters) => ...)` not `setFilters((f) => ...)`

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
