# Arquitetura do Projeto | Portfólio Gregory Praxedes

## Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Next.js | 15/16 | Framework React |
| React | 19 | UI Library |
| TypeScript | 5 | Type Safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 12 | Animações |
| **next-intl** | 4 | **Internacionalização** |
| Lucide React | - | Ícones |
| Radix UI | - | Componentes acessíveis |
| Biome | - | Linting/Formatting |

---

## Estrutura de Pastas

```
gregorypraxedes/
├── docs/                      # Documentação do projeto
│   ├── arquitetura.md
│   ├── prd-hero.md
│   ├── boas-praticas-hero.md
│   └── conteudo-paginas.md
│
├── public/
│   ├── images/
│   │   ├── profile/          # Foto de perfil
│   │   ├── projects/         # Screenshots dos projetos
│   │   └── tech/             # Logos das tecnologias
│   └── fonts/                # Fontes customizadas (se houver)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Layout raiz (fonts, metadata)
│   │   ├── globals.css       # Estilos globais
│   │   │
│   │   └── [locale]/         # Rotas com i18n
│   │       ├── layout.tsx    # Layout com NextIntlClientProvider
│   │       ├── page.tsx      # Home page
│   │       │
│   │       ├── projetos/
│   │       │   ├── page.tsx  # Lista de projetos
│   │       │   └── [slug]/
│   │       │       └── page.tsx
│   │       │
│   │       ├── sobre/
│   │       │   └── page.tsx
│   │       │
│   │       └── contato/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Timeline.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── TechIcon.tsx
│   │       ├── Marquee.tsx
│   │       ├── GradientText.tsx
│   │       └── LanguageSwitcher.tsx  # Seletor de idioma
│   │
│   ├── i18n/                  # Configuração de internacionalização
│   │   ├── config.ts          # Idiomas suportados
│   │   ├── routing.ts         # Configuração de rotas
│   │   ├── navigation.ts      # Hooks de navegação
│   │   ├── request.ts         # Carregamento de mensagens
│   │   │
│   │   └── messages/          # Traduções
│   │       ├── pt/
│   │       │   ├── index.ts
│   │       │   ├── common.json
│   │       │   ├── hero.json
│   │       │   ├── about.json
│   │       │   ├── projects.json
│   │       │   └── contact.json
│   │       │
│   │       ├── en/
│   │       │   └── ...
│   │       │
│   │       ├── es/
│   │       │   └── ...
│   │       │
│   │       └── fr/
│   │           └── ...
│   │
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── timeline.ts
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   └── types/
│       └── index.ts
│
├── .gitignore
├── biome.json
├── components.json
├── next.config.ts             # Com plugin next-intl
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Internacionalização (i18n)

### Idiomas Suportados
| Código | Idioma | Default |
|--------|--------|---------|
| `pt` | Português | ✅ |
| `en` | English | |
| `es` | Español | |
| `fr` | Français | |

### Estrutura de URLs
```
/pt              → Home em português (default)
/en              → Home em inglês
/pt/projetos     → Projetos em português
/en/projects     → Projects em inglês
```

### Arquivos de Configuração

#### `src/i18n/config.ts`
```typescript
export const locales = ["pt", "en", "es", "fr"] as const
export const defaultLocale = "pt" as const
export type Locale = (typeof locales)[number]
```

#### `src/i18n/routing.ts`
```typescript
import { defineRouting } from "next-intl/routing"
import { locales, defaultLocale } from "./config"

export const routing = defineRouting({
  locales,
  defaultLocale,
})
```

#### `src/i18n/navigation.ts`
```typescript
import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
```

#### `src/i18n/request.ts`
```typescript
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}`)).default,
  }
})
```

#### `next.config.ts`
```typescript
import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts")

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
```

### Estrutura de Mensagens

#### `src/i18n/messages/pt/hero.json`
```json
{
  "greeting": "Hey! Eu sou Gregory Praxedes",
  "headline": {
    "line1": "Código é minha arte.",
    "line2": "Resolver problemas, minha obsessão."
  },
  "description": "Anos aperfeiçoando a arte de criar experiências digitais. Interfaces que fazem sentido. Sistemas que não quebram.",
  "cta": {
    "projects": "Ver Projetos",
    "contact": "Fale Comigo"
  }
}
```

#### `src/i18n/messages/en/hero.json`
```json
{
  "greeting": "Hey! I'm Gregory Praxedes",
  "headline": {
    "line1": "Code is my art.",
    "line2": "Problem-solving, my obsession."
  },
  "description": "Years perfecting the art of creating digital experiences. Interfaces that make sense. Systems that don't break.",
  "cta": {
    "projects": "View Projects",
    "contact": "Get in Touch"
  }
}
```

### Uso nos Componentes

```typescript
import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section>
      <p>{t("greeting")}</p>
      <h1>
        {t("headline.line1")}
        <br />
        {t("headline.line2")}
      </h1>
      <p>{t("description")}</p>
      <button>{t("cta.projects")}</button>
    </section>
  )
}
```

---

## Rotas com i18n

| Rota (PT) | Rota (EN) | Descrição |
|-----------|-----------|-----------|
| `/pt` | `/en` | Home |
| `/pt/projetos` | `/en/projects` | Lista de Projetos |
| `/pt/projetos/[slug]` | `/en/projects/[slug]` | Projeto Individual |
| `/pt/sobre` | `/en/about` | Sobre |
| `/pt/contato` | `/en/contact` | Contato |

---

## Organização de Componentes

### `/components/layout/`
- **Header.tsx** - Navegação + LanguageSwitcher
- **Footer.tsx** - Rodapé com links
- **Navigation.tsx** - Lógica mobile/desktop

### `/components/sections/`
- **Hero.tsx** - Hero da home
- **About.tsx** - Sobre mim
- **Skills.tsx** - Grid de tecnologias
- **Projects.tsx** - Cards de projetos
- **Timeline.tsx** - Jornada
- **Contact.tsx** - CTA + formulário

### `/components/ui/`
- **Button.tsx** - Botões
- **Card.tsx** - Card genérico
- **Badge.tsx** - Tags
- **TechIcon.tsx** - Ícone de tech
- **Marquee.tsx** - Carrossel infinito
- **GradientText.tsx** - Texto gradiente
- **LanguageSwitcher.tsx** - Seletor de idioma

---

## Estrutura de Dados

### Projeto (`/data/projects.ts`)
```typescript
interface Project {
  slug: string
  // Textos vêm do i18n, aqui só dados não traduzíveis
  thumbnail: string
  images: string[]
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  date: string
}
```

**Nota:** Textos como título, descrição, etc. ficam nos arquivos de tradução (`projects.json`).

---

## Dependências Principais

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next-intl": "^4.5.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-dropdown-menu": "latest",
    "@radix-ui/react-slot": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@biomejs/biome": "latest",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "typescript": "^5",
    "@types/react": "^19",
    "@types/node": "^20"
  }
}
```

---

## Configurações Base

### `tailwind.config.ts`
```typescript
colors: {
  background: "#0a0a0a",
  foreground: "#ffffff",
  muted: "#a1a1aa",
  accent: "#a855f7",
  "accent-blue": "#3b82f6",
}
```

### Path Aliases (`tsconfig.json`)
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

---

## Padrões de Código

### Imports
```typescript
import { ... } from "react"
import { ... } from "next/..."
import { useTranslations } from "next-intl"
import { ... } from "@/components/..."
import { ... } from "@/lib/..."
import { ... } from "@/data/..."
import { ... } from "@/types"
```

### Nomenclatura
- **Componentes:** PascalCase
- **Funções/variáveis:** camelCase
- **Constantes:** SCREAMING_SNAKE_CASE
- **Arquivos i18n:** kebab-case.json

---

*Dezembro 2024*
