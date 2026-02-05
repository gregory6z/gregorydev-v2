# Operations Components

## Structure

```
operations/
├── index.tsx           # Main component (OperationsTable)
├── header.tsx          # Page header with title + create button
├── tabs.tsx            # Conformity filter tabs with counts
├── status-badge.tsx    # Unified badge for all status types (Operation, Conformity, File)
├── creation-sheet/     # Operation creation modal (see creation-sheet/CLAUDE.md)
│   ├── index.tsx       # Main orchestrator
│   ├── step-badge.tsx  # Shared step indicator
│   ├── step-1/         # Step 1 components (name + file upload)
│   └── step-2/         # Step 2 components (validation form)
├── operations-table/   # Table-specific components
│   ├── columns.tsx     # TanStack Table column definitions
│   └── delete-dialog.tsx
└── details/            # Operation details page components
    ├── details-header.tsx
    ├── info-block.tsx
    ├── info-field.tsx
    ├── keyword-badge.tsx
    └── files-table/    # Files table in details page
        ├── index.tsx
        ├── columns.tsx
        └── truncated-text.tsx
```

## Architecture

- State and logic live in `index.tsx`
- UI components from `ui/` (DataTable, DataTablePagination, etc.)
- Server-side pagination and search (API returns paginated data)
- TanStack Table for table instance management

## Creation Sheet

Two-step modal for creating operations:
- Step 1: Operation name + file upload
- Step 2: PDF viewer (outside sheet) + validation form

PDF viewer appears on the left (700px), sheet stays on the right (640px).

Step 2 uses `useExtractedData` from `api/operations/queries.ts` to fetch OCR/AI extracted data. Validation state is simplified: `validatedFields: Set` for checkboxes and `signature` for the dropdown.

## Rules

1. Feature-specific components - generic ones go in `ui/`
2. All text via i18n translations
3. Types from `api/operations/schemas.ts`
4. Composition pattern for UI components
