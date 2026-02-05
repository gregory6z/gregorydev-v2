# Creation Sheet

## Structure

```
creation-sheet/
├── index.tsx           # Main orchestrator
├── sheet-footer.tsx    # Shared footer (cancel + confirm buttons)
├── step-badge.tsx      # Step indicator (1/2)
├── upload-mode/
│   ├── upload-mode-content.tsx  # Name field + file upload
│   ├── file-upload-zone.tsx     # Dropzone
│   ├── file-list.tsx            # List of uploaded files
│   └── file-item.tsx            # Single file row
└── validation-mode/
    ├── validation-mode-content.tsx  # Renders validation fields
    ├── validation-field.tsx         # Input + OK button to toggle validation
    └── signature-select.tsx         # Signature dropdown
```

## Flow

1. User opens sheet → Step 1 (upload-mode)
2. Step 1: Enter operation name + upload files
3. Click "Suivant" → Step 2 (validation-mode, PDF viewer appears on left)
4. Step 2: Validate extracted data + select signature
5. Click "Créer opération" → Create operation + close sheet

## Code Organization (index.tsx)

The component is organized by sections:
1. **Shared State** - step, confirmDialog, mutation
2. **Step 1** - form, files, derived state, handleNext
3. **Step 2** - query, validation state, handlers, handleCreate
4. **Shared Handlers** - handleClose, handleConfirmClose
5. **Render**

## State Management

State lives in `index.tsx` because `handleCreate` needs data from both steps and `handleConfirmClose` needs to reset everything.

**Upload Mode (Step 1):**
- `methods` (useForm) - operation name
- `useFileUpload` - file upload state

**Validation Mode (Step 2):**
- `useExtractedData` (React Query) - fetches OCR/AI extracted data
- `validatedFields: Set<"fost" | "lieu" | "dateEngagement">` - tracks validated checkboxes
- `signature: SignatureStatusType | null` - selected signature status

## Layout (Step 2)

```
┌─────────────────────────────────────────────────────────────┐
│  Overlay (left)  │  PDF Viewer (700px)  │  Sheet (640px)   │
│     z-30         │       z-40           │      z-50        │
└─────────────────────────────────────────────────────────────┘
```

- PDF viewer rendered outside Sheet component
- Custom overlay covers only left side
- Sheet uses `hideOverlay` prop on step 2

## Shared Components

- **SheetFooter**: Used by both modes with different labels
  - cancelLabel, confirmLabel, loadingLabel
  - onCancel, onConfirm
  - isConfirmDisabled, isLoading

## Upload Mode Components

- **UploadModeContent**: Uses `useFormContext` to access form
- **FileUploadZone**: Dropzone with react-dropzone
- **FileList/FileItem**: Display uploaded files with progress

## Validation Mode Components

- **ValidationModeContent**: Receives `extractedData`, `validatedFields`, `signature` and callbacks as props
- **ValidationField**: Read-only input + OK button to toggle validation
- **SignatureSelect**: Dropdown for signature status (Présente/Absente)
