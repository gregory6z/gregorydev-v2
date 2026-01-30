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
    ├── step-2-form.tsx      # Fetches data + manages validation state
    ├── validation-form.tsx  # Renders validation fields
    ├── validation-field.tsx # Input + OK button to toggle validation
    └── signature-select.tsx # Signature dropdown
```

## Flow

1. User opens sheet → Step 1
2. Step 1: Enter operation name + upload files
3. Click "Suivant" → Step 2 (PDF viewer appears on left)
4. Step 2: Validate extracted data + select signature
5. Click "Créer opération" → Create operation + close sheet

## State Management

- **FormProvider** wraps both steps to persist form data
- **useFileUpload** hook manages file upload state
- Step 2 data stored in local state (step2Data)
- PDF file derived from uploaded files

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

- **Step2Form**: Fetches extracted data, manages validation state
- **ValidationForm**: Renders validation fields
- **ValidationField**: Input + OK button to toggle validation
- **SignatureSelect**: Dropdown for signature status (Présente/Absente)
