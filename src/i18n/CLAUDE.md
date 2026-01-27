# i18n - Internationalization

## Overview

This project uses **i18next** with **react-i18next** for internationalization, with translations split by feature and lazy loaded on demand.

## Structure

```
i18n/
├── i18n.ts             # i18next configuration (standard naming)
├── CLAUDE.md           # This file
└── locales/
    └── fr/             # French translations (default)
        ├── auth.json       # Authentication feature
        ├── dashboard.json  # Dashboard feature
        ├── operations.json # Operations feature
        └── ...
```

## Configuration

```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(initReactI18next)
  .use(resourcesToBackend((language, namespace) => 
    import(`./locales/${language}/${namespace}.json`)
  ))
  .init({
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
```

## Key Principles

### 1. One Namespace = One Feature
Each feature has its own translation file. No shared `common` namespace.

```
locales/fr/
├── auth.json        # Login, register, password reset
├── dashboard.json   # Dashboard page
├── operations.json  # Operations management
└── settings.json    # User settings
```

### 2. Lazy Loading
Translations are loaded **on demand** using dynamic imports. Vite automatically code-splits each JSON file.

Benefits:
- Smaller initial bundle size
- Only loads translations when the feature is accessed
- Better performance for large applications

### 3. Namespace per Component/Page
Each component declares which namespace it uses:

```typescript
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation('auth');
  
  return (
    <div>
      <h1>{t('login.title')}</h1>
      <p>{t('login.subtitle')}</p>
    </div>
  );
}
```

## Translation File Format

### Flat Keys with Dot Notation in Code
Use nested objects in JSON, access with dot notation:

```json
// locales/fr/auth.json
{
  "login": {
    "title": "Connexion",
    "subtitle": "Connectez-vous a votre compte",
    "email": "Adresse e-mail",
    "password": "Mot de passe",
    "submit": "Se connecter",
    "forgotPassword": "Mot de passe oublie ?",
    "noAccount": "Pas encore de compte ?",
    "createAccount": "Creer un compte"
  },
  "register": {
    "title": "Creer un compte",
    "steps": {
      "account": "Compte",
      "company": "Entreprise",
      "confirmation": "Confirmation"
    }
  },
  "validation": {
    "emailRequired": "L'adresse e-mail est requise",
    "emailInvalid": "L'adresse e-mail n'est pas valide",
    "passwordRequired": "Le mot de passe est requis",
    "passwordMinLength": "Le mot de passe doit contenir au moins {{count}} caracteres"
  }
}
```

### Usage in Code

```typescript
const { t } = useTranslation('auth');

// Simple key
t('login.title') // -> "Connexion"

// With interpolation
t('validation.passwordMinLength', { count: 8 }) 
// -> "Le mot de passe doit contenir au moins 8 caracteres"
```

## Multiple Namespaces in One Component

If a component needs translations from multiple features:

```typescript
const { t } = useTranslation(['auth', 'validation']);

// Specify namespace explicitly
t('auth:login.title')
t('validation:errors.required')

// Or use the ns option
t('login.title', { ns: 'auth' })
```

**Prefer single namespace per component when possible.**

## Adding a New Feature

1. Create the translation file:
```bash
touch src/i18n/locales/fr/newFeature.json
```

2. Add translations:
```json
{
  "title": "Nouvelle fonctionnalite",
  "description": "Description de la fonctionnalite"
}
```

3. Use in component:
```typescript
const { t } = useTranslation('newFeature');
```

The namespace is automatically loaded on first use.

## Dependencies

```bash
npm install i18next react-i18next i18next-resources-to-backend
```

## Best Practices

### DO
- Keep translations close to their feature
- Use descriptive, hierarchical keys: `login.form.email.placeholder`
- Include all dynamic values as interpolation: `{{count}}`, `{{name}}`
- Use the same key structure across all language files

### DO NOT
- Create a `common` or shared namespace
- Hardcode text in components
- Use translation keys as display text
- Mix multiple features in one namespace
- Use array indices as keys

## Handling Loading States

With `useSuspense: true`, wrap components in Suspense:

```typescript
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginPage />
    </Suspense>
  );
}
```

Or disable suspense for specific components:

```typescript
const { t, ready } = useTranslation('auth', { useSuspense: false });

if (!ready) return <LoadingSpinner />;

return <div>{t('login.title')}</div>;
```

## Type Safety (Optional)

For TypeScript autocompletion on translation keys, create a type definition:

```typescript
// i18n/types.ts
import 'i18next';
import auth from './locales/fr/auth.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'auth';
    resources: {
      auth: typeof auth;
    };
  }
}
```
