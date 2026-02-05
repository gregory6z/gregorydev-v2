# Global Conformity Section

Section de la page détails d'opération qui affiche l'analyse de conformité globale.

## Structure

```
global-conformity/
├── index.tsx                      # GlobalConformitySection (composant principal)
├── global-conformity-header.tsx   # Header avec titre, badge statut et bouton télécharger
├── global-conformity-summary.tsx  # Section synthèse
├── verification-table/            # Table des étapes de vérification
│   ├── index.tsx                 # VerificationTable (DataTable + TanStack Table)
│   └── columns.tsx               # createVerificationColumns
└── issues-table/                  # Table des non-conformités et corrections
    ├── index.tsx                 # IssuesTable (DataTable + TanStack Table)
    └── columns.tsx               # createIssuesColumns
```

## Comportement

1. **État initial** : Bouton "Analyse cohérence globale" actif
2. **Pendant l'analyse** : Bouton affiche "Analyse en cours..." avec spinner
3. **Après l'analyse** : Bouton désactivé, Card avec résultats affichée

## Types

- `GlobalConformityAnalysis` : Résultat complet de l'analyse
- `VerificationStep` : Étape de vérification avec sous-vérifications
- `SubVerification` : Vérification individuelle avec statut et commentaire
- `NonConformity` : Non-conformité avec issue et correction

## Traductions

Toutes les traductions sont dans `operations.json` sous la clé `globalConformity`.

## Conventions

- Les tables utilisent `DataTable` avec TanStack Table (comme `files-table`)
- Les colonnes sont définies dans `columns.tsx` avec `createXxxColumns(t)`
- Hauteur de ligne minimum : 76px
- Couleur des boutons : `#007F72`
