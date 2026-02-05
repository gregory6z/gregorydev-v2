# i18n - Internationalization

## Overview

Uses **i18next** with **react-i18next**, translations split by feature and lazy loaded on demand.

## Structure

```
i18n/
├── i18n.ts             # i18next configuration
├── CLAUDE.md           # This file
└── locales/
    └── fr/             # French translations (default)
        ├── auth.json
        ├── dashboard.json
        ├── operations.json
        └── ...
```

## Key Principles

### One Namespace = One Feature
Each feature has its own translation file. **No shared `common` namespace.**

### Lazy Loading
Translations are loaded on demand via dynamic imports. Vite code-splits each JSON file automatically.

### Namespace per Component
Each component declares which namespace it uses via `useTranslation('feature')`.

### Multiple Namespaces
If a component needs multiple namespaces, pass an array: `useTranslation(['auth', 'validation'])`. Prefer single namespace per component when possible.

## Translation File Format

- Nested objects in JSON, accessed with dot notation: `t('login.title')`
- Interpolation with double braces: `{{count}}`, `{{name}}`
- Same key structure across all language files

## Adding a New Feature

1. Create `src/i18n/locales/fr/newFeature.json`
2. Add translations as nested JSON
3. Use in component: `useTranslation('newFeature')`
4. The namespace is automatically loaded on first use

## Loading States

With `useSuspense: true` (default), wrap components in `<Suspense>`. Or disable per-component with `useTranslation('auth', { useSuspense: false })`.

## Best Practices

### DO
- Keep translations close to their feature
- Use descriptive, hierarchical keys
- Include all dynamic values as interpolation
- Use the same key structure across all language files

### DO NOT
- Create a `common` or shared namespace
- Hardcode text in components
- Use translation keys as display text
- Mix multiple features in one namespace
