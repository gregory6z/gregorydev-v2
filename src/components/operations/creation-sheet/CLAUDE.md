# Creation Sheet

## Structure

```
creation-sheet/
├── index.tsx           # Main orchestrator
├── sheet-footer.tsx    # Shared footer (cancel + confirm buttons)
├── step-badge.tsx      # Step indicator (1/2)
├── step-1/
│   ├── step-1-form.tsx      # Name field + file upload
│   ├── file-upload-zone.tsx # Dropzone
│   ├── file-list.tsx        # List of uploaded files
│   └── file-item.tsx        # Single file row
└── step-2/
    ├── step-2-form.tsx      # Renders validation fields
    ├── validation-field.tsx # Input + OK button to toggle validation
    └── signature-select.tsx # Signature dropdown
```

## Flow

1. User opens sheet → Step 1
2. Step 1: Enter operation name + upload files
3. Click "Suivant" → Step 2 (PDF viewer appears on left)
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

**Step 1:**
- `methods` (useForm) - operation name
- `useFileUpload` - file upload state

**Step 2:**
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

- **SheetFooter**: Used by both steps with different labels
  - cancelLabel, confirmLabel, loadingLabel
  - onCancel, onConfirm
  - isConfirmDisabled, isLoading

## Step 1 Components

- **Step1Form**: Uses `useFormContext` to access form
- **FileUploadZone**: Dropzone with react-dropzone
- **FileList/FileItem**: Display uploaded files with progress

## Step 2 Components

- **Step2Form**: Receives `extractedData`, `validatedFields`, `signature` and callbacks as props
- **ValidationField**: Read-only input + OK button to toggle validation
- **SignatureSelect**: Dropdown for signature status (Présente/Absente)
