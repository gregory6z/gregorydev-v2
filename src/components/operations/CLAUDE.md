# Operations Components

## Overview

This folder contains components specific to the **Operations** feature (dashboard table). These are not generic - they use operations-specific types, translations, and business logic.

## Structure

```
operations/
├── columns.tsx          # TanStack Table column definitions
├── conformity-badge.tsx # Badge for conformity status
├── delete-dialog.tsx    # Delete confirmation dialog
├── header.tsx           # Page header with title + create button
├── status-badge.tsx     # Badge for operation status
└── tabs.tsx             # Conformity filter tabs with counts
```

## How Tables Work

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ dashboard-page.tsx (Page)                                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ State & Logic                                        │   │
│  │ - filters (conformity, search, page, perPage)       │   │
│  │ - sorting, rowSelection                              │   │
│  │ - useReactTable() instance                           │   │
│  │ - useOperations() query                              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ UI Components (from ui/)                             │   │
│  │                                                      │   │
│  │  <DataTable table={table}>        ← receives table   │   │
│  │    <DataTableContent>                                │   │
│  │      <DataTableHeader />          ← from context     │   │
│  │      <DataTableBody />            ← from context     │   │
│  │    </DataTableContent>                               │   │
│  │  </DataTable>                                        │   │
│  │                                                      │   │
│  │  <DataTablePagination />          ← server-side      │   │
│  │  <DataTableSearch />              ← server-side      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Feature Components (from operations/)                │   │
│  │                                                      │   │
│  │  <OperationsHeader />             ← page title       │   │
│  │  <OperationsTabs />               ← conformity tabs  │   │
│  │  <DeleteConfirmationDialog />     ← delete modal     │   │
│  │  columns.tsx                      ← column defs      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Server-Side vs Client-Side

We use **server-side pagination and search**:
- API returns paginated data (not all data at once)
- `page`, `totalPages`, `total` come from API response
- Search and pagination components control filters, which trigger new API requests
- Sorting can be client-side (current) or server-side

This approach is used because of large datasets (926+ operations).

## Creating a New Table

### Step 1: Define Types

In `api/{feature}/schemas.ts`:
- Create interface for the item (e.g., `MyItem`)
- Create interface for filters (e.g., `MyItemsListFilters`)
- Create interface for API response with pagination

### Step 2: Create API Layer

In `api/{feature}/`:
- `queries.ts` with query keys factory and useQuery hook
- `mutations.ts` if needed (delete, update, etc.)
- `mocks.ts` for mock data until backend is ready

### Step 3: Create Columns

In `components/dashboard/{feature}/columns.tsx`:
- Export `createColumns` function that receives translation function
- Use `DataTableSortableHeader` from ui for sortable columns
- Use `Checkbox` from ui for row selection column
- Create custom cell renderers (badges, formatted values) as needed

### Step 4: Create Feature Components

In `components/dashboard/{feature}/`:
- Badges for status display (if needed)
- Header with title and actions
- Filter tabs (if needed)
- Dialogs for confirmations (if needed)

### Step 5: Create Page

In `pages/{feature}-page.tsx`:
- Import all ui components (DataTable, DataTablePagination, etc.)
- Import feature components (columns, header, etc.)
- Set up filters state with useState
- Set up table state (sorting, rowSelection) with useState
- Create table instance with useReactTable
- Fetch data with your query hook
- Render components in composition pattern

### Key Points

- Filters and pagination state live in the page, not in components
- Table instance is created in the page and passed to DataTable
- DataTablePagination and DataTableSearch receive filter handlers directly
- Use debounced search value for API calls
- Handle loading state with DataTableLoading

## Component Guidelines

### Badges

- Use config object pattern mapping enum values to label/icon/className
- Always use translations for labels
- Import enums from schemas.ts for type safety

### Columns

- First column is usually row selection checkbox
- Use DataTableSortableHeader for sortable columns
- Custom cell renderers for formatted data (dates, badges, truncated text)
- Set explicit `size` for each column

### Dialogs

- Use AlertDialog from ui for confirmations
- Pass `open`, `onOpenChange`, `onConfirm`, `isLoading` as props
- Keep translations in the component (feature-specific)

## Rules

1. **Keep feature-specific** - Don't try to make these generic, that's what ui/ is for
2. **Use translations** - All user-facing text via i18n
3. **Type everything** - Use types from `schemas.ts`
4. **Composition** - Follow the same composition pattern as ui components
