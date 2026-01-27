# Energer Portal

Front-end de la plateforme Energer pour la gestion des opérations CEE (Certificats d'Economies d'Energie).

## Stack technique

- React + TypeScript + Vite
- shadcn/ui + Tailwind CSS v4
- TanStack Query (React Query) + ky
- react-hook-form + Zod v4
- React Router v6
- i18next (FR, lazy loading par feature)

## Figma

[Energer - web V2](https://www.figma.com/design/u2aZa0VJLmWGUz4OD72zmN/Energer---web-V2)

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de dev |
| `npm run build` | Build TypeScript + Vite |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run preview` | Preview du build |

## Structure

```
src/
├── api/            # Client HTTP, queries, mutations, schemas
├── components/     # UI (shadcn), layout, feature components
├── pages/          # Pages (fichiers plats)
├── i18n/           # Traductions par feature
├── contexts/       # React contexts
├── lib/            # Utilitaires, QueryClient
├── env.ts          # Variables d'env validées (Zod)
└── Router.tsx      # Routes
```
