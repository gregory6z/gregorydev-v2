# Document Dialog

## Structure

```
document-dialog/
├── index.tsx                    # Orchestrateur avec stepper (2 étapes)
├── upload-mode/
│   ├── upload-mode-content.tsx  # Contenu step 1 (upload fichier)
│   └── single-file-upload.tsx   # Zone upload (1 fichier max)
└── validation-mode/
    ├── validation-mode-content.tsx # Contenu step 2 (détails document)
    ├── document-header.tsx         # Titre + badges
    ├── document-info.tsx           # Bénéficiaire + Professionnel + QR
    ├── analysis-table/
    │   ├── index.tsx               # TanStack Table
    │   └── columns.tsx             # Colonnes
    ├── verification-status-badge.tsx # Badge C./N.C.
    └── version-selector.tsx        # V1/V2/V3 + Nouvelle version
```

## Flow (identique à creation-sheet)

1. User opens dialog → Step 1
2. Step 1: Upload fichier (1 seul PDF)
3. Click "Suivant" → Step 2 (PDF viewer appears on left)
4. Step 2: Voir détails document + analyse + versions
5. Click "Ajouter le fichier" → Add file to operation + close dialog

## Patterns réutilisés de creation-sheet

- Stepper avec 2 étapes
- Layout PDF Viewer externe + Sheet (step 2)
- `SheetFooter` pour les boutons
- `StepBadge` pour l'indicateur d'étape
- AlertDialog pour confirmation annulation
- `hideOverlay` quand PDF Viewer visible

## Mutations utilisées

- `useAddFileToOperation()` — ajout du fichier
- `useUploadNewFileVersion()` — nouvelle version (step 2)

## Règles

1. TanStack Table pour `analysis-table` (cohérence projet)
2. `"use no memo"` en haut de `analysis-table/index.tsx` (React Compiler)
3. Footer sticky en step 2 (version selector)
4. PDF Viewer externe au Sheet
5. Réutiliser `StatusBadge` pour les badges de conformité document
