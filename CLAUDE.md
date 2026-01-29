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
│   ├── ui/                 # Generic reusable components - shadcn pattern (see src/components/ui/CLAUDE.md)
│   │   ├── data-table.tsx            # DataTable, Header, Body, SortableHeader, Loading
│   │   ├── data-table-pagination.tsx # Server-side pagination
│   │   ├── data-table-search.tsx     # Search input
│   │   └── ...                       # Other shadcn components
│   ├── app-layout/         # Main app layout (Header + Outlet)
│   ├── auth/auth-layout/   # Auth pages layout (tabs + Outlet)
│   ├── route-layout/       # Route guards (public/private)
│   └── operations/         # Operations feature (see src/components/operations/CLAUDE.md)
├── pages/                  # Flat page files (login-page.tsx, etc.)
├── i18n/                   # Internationalization (see src/i18n/CLAUDE.md)
│   ├── i18n.ts             # i18next configuration
│   └── locales/fr/         # French translations per feature
├── contexts/               # React contexts
├── helpers/
│   ├── validators.ts       # Regex, Luhn, validation functions
│   └── formatters.ts       # Sanitizers (cleanPhone), display formatters (formatSiret, formatPhone)
├── hooks/                  # Custom hooks (use-debounced-value, use-format-date, etc.)
├── lib/
│   ├── react-query/        # QueryClient config
│   └── utils.ts            # Utility functions (cn, etc.)
├── env.ts                  # Zod-validated environment variables
├── constants/              # App constants
└── Router.tsx              # Route definitions
```

## Detailed Documentation

- **API Layer**: `src/api/CLAUDE.md`
- **UI Components (shadcn pattern)**: `src/components/ui/CLAUDE.md`
- **Operations Components**: `src/components/operations/CLAUDE.md`
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

## Layouts et Outlet (React Router)

Les layouts utilisent `<Outlet />` de React Router pour rendre les pages enfants.

- Les layouts sont définis dans `Router.tsx` comme éléments parents des routes
- Chaque layout rend ses pages enfants via `<Outlet />`
- **Les pages ne doivent jamais importer ni wrapper leur contenu avec un layout**
- Le contenu d'une page est rendu directement, sans wrapper (utiliser `<>...</>` si nécessaire)

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

Data transformation (e.g., stripping spaces from phone numbers) must happen in the **mutation layer** (`mutations.ts`) before sending to the API.

## State Management avec setFilters

Pour les composants avec filtres (tables, listes), utiliser le pattern `filters` + `setFilters`:

- Le composant parent définit l'état `filters` avec `useState`
- Les composants enfants reçoivent `filters` et `setFilters` en props
- La logique de mise à jour est dans le composant qui en a besoin (ex: `DataTablePagination` gère la pagination)
- Utiliser des noms explicites dans les callbacks: `setFilters((filters) => ...)` pas `setFilters((f) => ...)`
