# UI Components

## Overview

This folder contains reusable UI components following the **shadcn/ui pattern**. These are generic, design-system-agnostic components that can be used across the entire application.

## Structure

```
ui/
├── data-table.tsx            # DataTable, Header, Body, SortableHeader, Loading
├── data-table-pagination.tsx # Server-side pagination controls
├── data-table-search.tsx     # Search input
├── button.tsx                # Button variants
├── input.tsx                 # Input variants
├── table.tsx                 # Base table components
└── ...                       # Other shadcn components
```

## Shadcn Pattern

### Core Principles

1. **Composition over Props** - Build small, composable pieces instead of monolithic components with many props
2. **Function Components** - Each component is a simple function, not a class
3. **No Internal State** - Components are controlled, state lives in the parent
4. **data-slot Attribute** - Each component has a `data-slot` for styling and testing
5. **className Prop** - All components accept `className` for customization via `cn()`
6. **Named Exports** - Export each component individually, never use default exports

### When to Use Context

Use React Context when child components need access to shared state or instance (e.g., DataTable shares the table instance with Header and Body).

### File Naming

- Component files: `kebab-case.tsx` (e.g., `data-table.tsx`)
- One "family" of components per file (e.g., all DataTable components in `data-table.tsx`)
- Related but separate components can have their own file (e.g., `data-table-pagination.tsx`)

## Creating a New Component

### Checklist

1. Is it truly generic? (no feature-specific logic)
2. Does it follow composition pattern?
3. Does it accept `className` prop?
4. Does it have `data-slot` attribute?
5. Is state controlled by parent?
6. Are translations passed as props (not hardcoded)?

### Structure

- Root component with context provider (if needed)
- Child components that consume context or receive props
- All components exported as named exports
- Use `cn()` from `@/lib/utils` for className merging

## DataTable Components

### Available Components

| Component | Description |
|-----------|-------------|
| `DataTable` | Root component with context provider, receives TanStack Table instance |
| `DataTableContent` | Table wrapper |
| `DataTableHeader` | Renders table headers from context |
| `DataTableBody` | Renders table rows + empty state from context |
| `DataTableSortableHeader` | Header cell with sort button |
| `DataTableLoading` | Loading state with spinner |
| `DataTablePagination` | Server-side pagination controls (outside DataTable) |
| `DataTableSearch` | Search input (outside DataTable) |

### Usage Notes

- `DataTable` requires a TanStack Table instance via `table` prop
- `DataTablePagination` receives `filters` and `setFilters` directly - it handles pagination logic internally
- `DataTableSearch` is **outside** the DataTable because it controls server-side filters
- Use `useDataTable()` hook inside child components to access table instance from context

### Naming Conventions

- Use explicit names in callbacks (e.g., `setFilters((filters) => ...)` not `setFilters((f) => ...)`)
