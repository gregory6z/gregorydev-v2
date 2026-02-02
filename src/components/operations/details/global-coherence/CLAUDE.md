# Global Coherence Section

Section de la page détails d'opération qui affiche l'analyse de cohérence globale.

## Structure

```
global-coherence/
├── index.tsx                    # GlobalCoherenceSection (composant principal)
├── global-coherence-header.tsx  # Header avec titre, badge statut et bouton télécharger
├── global-coherence-summary.tsx # Section synthèse
├── verification-table/          # Table des étapes de vérification
│   ├── index.tsx               # VerificationTable (DataTable + TanStack Table)
│   └── columns.tsx             # createVerificationColumns
└── issues-table/               # Table des non-conformités et corrections
    ├── index.tsx               # IssuesTable (DataTable + TanStack Table)
    └── columns.tsx             # createIssuesColumns
```

## Comportement

1. **État initial** : Bouton "Analyse cohérence globale" actif
2. **Pendant l'analyse** : Bouton affiche "Analyse en cours..." avec spinner
3. **Après l'analyse** : Bouton désactivé, Card avec résultats affichée

## Types

- `GlobalCoherenceAnalysis` : Résultat complet de l'analyse
- `VerificationStep` : Étape de vérification avec sous-vérifications
- `SubVerification` : Vérification individuelle avec statut et commentaire
- `NonConformity` : Non-conformité avec issue et correction
- `CoherenceStatus` : `conform` | `non_conform` | `not_applicable`

## Traductions

Toutes les traductions sont dans `operations.json` sous la clé `globalCoherence`.

## Conventions

- Les tables utilisent `DataTable` avec TanStack Table (comme `files-table`)
- Les colonnes sont définies dans `columns.tsx` avec `createXxxColumns(t)`
- Hauteur de ligne minimum : 76px
- Couleur des boutons : `#007F72`
