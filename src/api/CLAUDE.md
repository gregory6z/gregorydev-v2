# API Layer

## Overview

This folder contains everything related to API communication: HTTP client, React Query hooks (queries/mutations), and Zod schemas with TypeScript types.

## Structure

```
api/
├── client.ts           # ky instance configured
├── CLAUDE.md           # This file
└── {feature}/
    ├── queries.ts      # useQuery hooks
    ├── mutations.ts    # useMutation hooks
    └── schemas.ts      # Zod schemas + TypeScript types
```

## Key Principles

### 1. No Separate Services or Types Folders
- **NO `services/` folder** - Use `ky` directly in query/mutation files
- **NO `types/` folder** - Types live in `schemas.ts` alongside Zod schemas

### 2. Use Hooks Directly in Components
Instead of fetching in parent and passing via props, let each component call its own hooks. React Query handles caching.

```typescript
// ✅ GOOD - Child fetches its own data
function UserProfile() {
  const { data: user } = useCurrentUser();
  return <div>{user?.name}</div>;
}

// ❌ BAD - Parent fetches and passes via props
function Dashboard() {
  const { data: user } = useCurrentUser();
  return <UserProfile user={user} />;
}
```

## HTTP Client (ky)

```typescript
// client.ts
import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [(request) => {
      const token = localStorage.getItem('token');
      if (token) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    }],
  },
});
```

## Schemas & Types

Types and schemas live together in `schemas.ts`.

### When to use Zod vs TypeScript Interface

**Use Zod schemas** only when:
- There's a real form with user interaction
- Need validation with error messages
- User input that can fail

**Use TypeScript interfaces** when:
- API response types (no user input)
- Internal data structures
- No validation needed

### Zod 4 Schemas with i18n

This project uses **Zod 4** (`^4.3.6`) which has **built-in locale support**.

#### Global Setup (done once in app init)

Zod's built-in French locale handles standard messages (required, invalid type, etc.) automatically:

```typescript
// main.tsx or i18n.ts
import { z } from 'zod/v4';
import { fr } from 'zod/v4/locales';

z.config(fr());
```

This means standard Zod errors like "Required", "Invalid email", "Too short" are automatically in French. **No need to pass `t()` for these.**

#### Custom Business Messages via `t()`

For **custom business validation messages** (not standard Zod errors), schemas are functions that receive `t`:

```typescript
// auth/schemas.ts
import { z } from 'zod/v4';
import type { TFunction } from 'i18next';

// ✅ Schema with custom business messages via t()
export const loginSchema = (t: TFunction) =>
  z.object({
    email: z.email(),  // Built-in fr() handles "Email invalide"
    password: z.string().min(8), // Built-in fr() handles "Minimum 8 caractères"
  });

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

// ✅ Schema with custom business rules needing t()
export const registerSchema = (t: TFunction) =>
  z.object({
    siret: z
      .string()
      .length(14)
      .regex(/^\d+$/, { error: t('validation.siretDigitsOnly') }),
    email: z.email(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, { error: t('validation.passwordUppercase') })
      .regex(/[a-z]/, { error: t('validation.passwordLowercase') })
      .regex(/[0-9]/, { error: t('validation.passwordDigit') })
      .regex(/[^A-Za-z0-9]/, { error: t('validation.passwordSpecial') }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordsMustMatch'),
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;
```

#### Usage in Component

```typescript
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/api/auth/schemas';

function LoginForm() {
  const { t } = useTranslation('auth');
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema(t)),
  });
}
```

#### When to use `t()` vs built-in locale

| Situation | Approach |
|-----------|----------|
| Required field, invalid type, min/max | Built-in `fr()` locale handles it |
| Custom regex, business rules, refine | Use `t('validation.myKey')` |
| Error message specific to the domain | Use `t('validation.myKey')` |

#### Important: Zod 4 Import Path

```typescript
// ✅ Zod 4
import { z } from 'zod/v4';

// ❌ Zod 3 style (do not use)
import { z } from 'zod';
```

```typescript
// ✅ TypeScript interface - API response (no user input, no Zod)
export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

// ✅ TypeScript interface - Internal types (no Zod)
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
```

## Queries (useQuery)

### Basic Query

```typescript
// auth/queries.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../client';
import type { User } from './schemas';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.get('auth/me').json<User>(),
  });
};
```

### Query Key Factory Pattern

```typescript
// auth/queries.ts
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
  user: (id: string) => [...authKeys.all, 'user', id] as const,
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => api.get('auth/me').json<User>(),
  });
};
```

### Query with Parameters

```typescript
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: authKeys.user(userId),
    queryFn: () => api.get(`users/${userId}`).json<User>(),
    enabled: !!userId,
  });
};
```

### Reusable Query Options (for prefetching)

```typescript
import { queryOptions } from '@tanstack/react-query';

export const currentUserOptions = queryOptions({
  queryKey: authKeys.currentUser(),
  queryFn: () => api.get('auth/me').json<User>(),
});

// Usage in component
const { data } = useQuery(currentUserOptions);

// Usage for prefetching
queryClient.prefetchQuery(currentUserOptions);
```

## Mutations (useMutation)

### Basic Mutation

```typescript
// auth/mutations.ts
import { useMutation } from '@tanstack/react-query';
import { api } from '../client';
import type { LoginFormData, LoginResponse } from './schemas';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) =>
      api.post('auth/login', { json: data }).json<LoginResponse>(),
  });
};
```

### Mutation with Cache Update

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserData) =>
      api.put(`users/${data.id}`, { json: data }).json<User>(),
    onSuccess: (data, variables) => {
      // Update specific item in cache
      queryClient.setQueryData(authKeys.user(variables.id), data);
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};
```

### Optimistic Updates

```typescript
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => api.delete(`users/${userId}`).json(),
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previous = queryClient.getQueryData(['users']);
      queryClient.setQueryData(['users'], (old: User[]) =>
        old.filter((u) => u.id !== userId)
      );
      return { previous };
    },
    onError: (err, userId, context) => {
      queryClient.setQueryData(['users'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
```

## Handling States in Components

```typescript
function MyComponent() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;

  // data is guaranteed to exist here
  return <TodoList todos={data} />;
}
```

## Dependent Queries

```typescript
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: () => getUserByEmail(email),
});

const { data: projects } = useQuery({
  queryKey: ['projects', user?.id],
  queryFn: () => getProjectsByUser(user!.id),
  enabled: !!user?.id, // Only run when userId exists
});
```

## Best Practices

### DO
- Include all dependencies in queryKey that are used in queryFn
- Use query key factories for consistency
- Use `isPending` for loading states
- Invalidate queries after mutations
- Use `enabled` for conditional queries
- Use Zod only for forms with user input validation
- Use TypeScript interfaces for API responses and internal types

### DO NOT
- Create separate services files - use ky directly
- Create separate types files - put in schemas.ts
- Pass API data via props - use hooks in child components
- Forget to include variables in queryKey
- Use Zod for types that don't need validation (API responses, internal state)
