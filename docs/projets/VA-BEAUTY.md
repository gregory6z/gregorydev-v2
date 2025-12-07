# VA Beauty - Site Vitrine & Système de Réservation

**Desenvolvedor**: Gregory Praxedes
**Período**: Maio - Agosto 2025
**Papel**: Full Stack Developer | UI/UX Designer
**Design UI/UX**: Gregory Praxedes (criação própria)

---

## Sumário Executivo

Site vitrine profissional e sistema de reservas para um instituto de beleza boutique localizado em Aubagne, França. A plataforma combina apresentação de serviços de alta qualidade com um sistema completo de agendamento online integrado ao Cal.com e pagamentos via Stripe.

### Impacto
- Presença digital profissional para o instituto
- Sistema de reservas online 24/7 com calendário em tempo real
- Galeria de transformações antes/depois para demonstrar resultados
- Blog integrado via Sanity CMS para conteúdo de marketing
- Painel administrativo para gestão de serviços e galeria
- Processamento de pagamentos seguro via Stripe

---

## Descrição do Projeto

### Contexto de Negócio
VA Beauty é um instituto de beleza especializado em tratamentos faciais de alta qualidade e micropigmentação. A proprietária, Valesca, precisava de uma presença digital que refletisse a qualidade premium de seus serviços e permitisse que clientes agendassem online.

### O Problema

A gestão manual apresentava:

- **Sem presença online** - Clientes não encontravam o instituto facilmente
- **Agendamentos por telefone/WhatsApp** - Perda de tempo e agendamentos perdidos
- **Sem portfólio visual** - Difícil mostrar resultados de tratamentos
- **Comunicação limitada** - Sem canal para compartilhar dicas e novidades
- **Gestão manual de serviços** - Dificuldade em atualizar preços e descrições

### Desafio Técnico
Criar uma plataforma que:
- Apresente serviços de forma atraente e profissional
- Permita agendamentos online com calendário em tempo real
- Processe pagamentos de forma segura
- Gerencie galeria de imagens e vídeos
- Ofereça blog para conteúdo de marketing
- Seja fácil de administrar sem conhecimento técnico

---

## Solução Implementada

### Visão Geral
Desenvolvimento de um **site vitrine completo** com:

1. **Landing page** premium com seções de serviços, galeria e depoimentos
2. **Sistema de reservas** integrado ao Cal.com com pagamento Stripe
3. **Galeria dinâmica** com antes/depois e vídeos de redes sociais
4. **Blog** gerenciado via Sanity CMS
5. **Painel admin** para gestão de serviços e galeria

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                        VA BEAUTY                                 │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  Next.js 15 + React 19                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │    Pages     │  │  Components  │  │   API Routes     │  │ │
│  │  │              │  │              │  │                  │  │ │
│  │  │ • Home       │  │ • Booking    │  │ • /api/booking   │  │ │
│  │  │ • Services   │  │ • Gallery    │  │ • /api/gallery   │  │ │
│  │  │ • Gallery    │  │ • Calendar   │  │ • /api/admin     │  │ │
│  │  │ • Blog       │  │ • Auth       │  │ • /api/webhooks  │  │ │
│  │  │ • Admin      │  │ • UI (21)    │  │                  │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│     ┌────────────────────────┼────────────────────────┐         │
│     ▼                        ▼                        ▼         │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Supabase    │    │   Cal.com    │    │   Stripe     │      │
│  │  (Database)  │    │  (Calendar)  │    │  (Payments)  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│           │                                                      │
│           ▼                                                      │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │  Cloudinary  │    │   Sanity     │    │   Vercel     │      │
│  │   (Images)   │    │    (CMS)     │    │  (Hosting)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| **BookingPage** | Fluxo de reserva multi-step |
| **CalEmbed** | Integração calendário Cal.com |
| **GalleryPageClient** | Galeria com filtros e modal |
| **ServiceCategoryPage** | Catálogo de serviços |
| **AdminServices** | CRUD de serviços |
| **AdminGallery** | Gestão de mídia |
| **AuthProvider** | Autenticação Supabase |

### Funcionalidades Implementadas

**Site Público**

- **Hero Section**: Banner com gradiente, indicadores de confiança (500+ clientes, 5★)
- **Serviços**: Grid com 3 categorias principais (Sourcils, Lèvres, Soins)
- **Combos/Pacotes**: Ofertas especiais com preços
- **Galeria Antes/Depois**: Transformações visuais
- **Depoimentos**: Avaliações de clientes
- **Localização**: Endereço, mapa e contato
- **Blog**: Artigos via Sanity CMS

**Sistema de Reservas**

- Seleção de serviços com preços e durações
- Calendário em tempo real via Cal.com
- Formulário de informações do cliente
- Processamento de pagamento Stripe
- Confirmação por email
- Páginas de sucesso/cancelamento

**Galeria Dinâmica**

- Filtro por categoria (Sourcils, Lèvres, Soins, Micropigmentation)
- Tipos de mídia: imagens, antes/depois, vídeos (Instagram, YouTube, TikTok)
- Modal full-screen com navegação
- SEO otimizado com alt text e tags

**Painel Administrativo**

- CRUD completo de serviços
- Upload de imagens para Cloudinary
- Gestão de galeria com categorias
- Configuração Cal.com
- Verificação de admin via Supabase

---

## Design Patterns Implementados

### 1. App Router Pattern (Next.js 15)

**Problema**: Organizar rotas complexas com diferentes níveis de acesso.

**Solução**: Estrutura de pastas com route groups e layouts.

```
┌─────────────────────────────────────────────────────────────┐
│                   Route Structure                            │
│                                                              │
│  src/app/                                                    │
│  ├── (Home)/              ← Route group (sem afetar URL)    │
│  │   └── page.tsx         → /                               │
│  ├── services/                                               │
│  │   └── [category]/                                         │
│  │       └── [service]/   → /services/sourcils/design       │
│  ├── admin/               ← Protected routes                │
│  │   ├── layout.tsx       → Admin layout com auth check     │
│  │   ├── services/                                           │
│  │   └── gallery/                                            │
│  └── api/                 ← API routes                       │
│      ├── booking/                                            │
│      ├── gallery/                                            │
│      └── webhooks/                                           │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Organização clara**: Rotas públicas vs admin
- **Layouts aninhados**: Compartilhar UI entre páginas
- **Loading states**: Arquivos loading.tsx para skeletons

### 2. Server/Client Component Pattern

**Problema**: Otimizar performance com Server Components do React 19.

**Solução**: Separar componentes server (data fetching) de client (interatividade).

```
┌─────────────────────────────────────────────────────────────┐
│               Server vs Client Components                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Server Components (default)             │    │
│  │                                                      │    │
│  │  • page.tsx - Fetch data directly from Supabase     │    │
│  │  • layout.tsx - Shared layouts                       │    │
│  │  • SEO metadata generation                           │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Client Components ('use client')        │    │
│  │                                                      │    │
│  │  • BookingPageClient - Forms e interações           │    │
│  │  • GalleryPageClient - Filtros e modal              │    │
│  │  • CalEmbed - Widget Cal.com                        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Zero JS** para componentes server
- **SEO friendly** com metadata server-side
- **Interatividade** onde necessário

### 3. Multi-Step Form Pattern

**Problema**: Fluxo de reserva com múltiplas etapas e validação.

**Solução**: Estado centralizado com steps progressivos.

```
┌─────────────────────────────────────────────────────────────┐
│                   Booking Flow                               │
│                                                              │
│  Step 1          Step 2          Step 3          Step 4     │
│  ┌──────┐        ┌──────┐        ┌──────┐        ┌──────┐   │
│  │Select│   →    │Choose│   →    │Enter │   →    │Confirm│  │
│  │Service│       │Date  │        │Info  │        │& Pay │   │
│  └──────┘        └──────┘        └──────┘        └──────┘   │
│     │               │               │               │        │
│     ▼               ▼               ▼               ▼        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  formData State                       │   │
│  │  {                                                    │   │
│  │    services: Service[],                              │   │
│  │    date: Date,                                       │   │
│  │    time: string,                                     │   │
│  │    customerInfo: { name, email, phone }              │   │
│  │  }                                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **UX progressiva**: Usuário não se sobrecarrega
- **Validação por step**: Erros claros em cada etapa
- **Persistência**: Dados mantidos entre steps

### 4. Provider Pattern (Auth)

**Problema**: Compartilhar estado de autenticação em toda a aplicação.

**Solução**: Context Provider com Supabase Auth.

```typescript
// AuthProvider wraps the entire app
<AuthProvider>
  <SupabaseProvider>
    {children}
  </SupabaseProvider>
</AuthProvider>

// Any component can access auth state
const { user, isAdmin, signOut } = useAuth()
```

**Benefícios**:
- **Estado global** de autenticação
- **Verificação de admin** centralizada
- **Session management** automático

### 5. Middleware Protection Pattern

**Problema**: Proteger rotas admin de acesso não autorizado.

**Solução**: Next.js Middleware com verificação Supabase.

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const user = await getUser(request)

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect('/auth/signin')
    }

    const isAdmin = await checkAdminStatus(user.email)
    if (!isAdmin) {
      return NextResponse.redirect('/unauthorized')
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/studio/:path*']
}
```

**Benefícios**:
- **Proteção no edge**: Antes de carregar a página
- **Redirecionamento automático**: Login ou unauthorized
- **Performance**: Não carrega código desnecessário

### 6. API Route Pattern

**Problema**: Backend logic para operações sensíveis.

**Solução**: API Routes com validação e error handling.

```
┌─────────────────────────────────────────────────────────────┐
│                   API Route Flow                             │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Client    │───▶│  API Route  │───▶│  Supabase   │     │
│  │   Request   │    │  /api/...   │    │  Database   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                            │                                 │
│                            ▼                                 │
│                     ┌─────────────┐                         │
│                     │  Response   │                         │
│                     │  { success, │                         │
│                     │    data,    │                         │
│                     │    error }  │                         │
│                     └─────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Segurança**: Credenciais no servidor
- **Validação**: Input sanitization
- **Logging**: Rastreamento de operações

---

## Decisões Técnicas e Trade-offs

### 1. Next.js 15 com App Router

**Decisão**: Next.js 15 com React 19

**Motivos**:
- Server Components para performance
- App Router para organização
- Turbopack para builds rápidos
- Streaming e Suspense

**Trade-off**: Curva de aprendizado, ecosystem ainda adaptando

### 2. Supabase vs Firebase

**Decisão**: Supabase

**Motivos**:
- PostgreSQL (SQL real, não NoSQL)
- Row Level Security nativo
- Auth integrado
- Open source
- Pricing mais acessível

**Trade-off**: Menos features que Firebase (Analytics, etc.)

### 3. Cal.com vs Calendly

**Decisão**: Cal.com

**Motivos**:
- Open source e auto-hostável
- API mais flexível
- Integração Stripe nativa
- Customização completa
- Sem branding forçado

**Trade-off**: Setup mais complexo, menos polish

### 4. Cloudinary vs S3

**Decisão**: Cloudinary

**Motivos**:
- Otimização automática de imagens
- Transformações on-the-fly
- CDN global incluído
- Upload widget pronto
- Free tier generoso

**Trade-off**: Vendor lock-in, limites de transformações

### 5. Sanity CMS vs Contentful

**Decisão**: Sanity

**Motivos**:
- Studio customizável
- GROQ query language poderosa
- Real-time collaboration
- Generous free tier
- Sanity MCP para Claude

**Trade-off**: Learning curve, hosting do Studio

### 6. shadcn/ui vs Material UI

**Decisão**: shadcn/ui + Radix UI

**Motivos**:
- Copy-paste, não dependência
- Customização total
- Acessibilidade via Radix
- Bundle menor
- Tailwind nativo

**Trade-off**: Mais trabalho inicial de styling

---

## Desafios e Soluções

### Desafio 1: Integração Cal.com + Stripe

**Problema**: Cal.com requer Stripe Connect para pagamentos, setup complexo com webhooks e connected accounts.

**Solução**:
- Configuração de Stripe Connected Account
- Webhooks bidirecionais (Cal → App, Stripe → App)
- Múltiplos endpoints de diagnóstico para debug
- Fallback para reservas sem pagamento

```typescript
// Webhook Cal.com
app/api/webhooks/cal/route.ts

// Webhook Stripe
app/api/webhooks/stripe/route.ts

// Diagnósticos
app/api/diagnose-cal-stripe/route.ts
app/api/test-stripe-connection/route.ts
```

### Desafio 2: Galeria Multi-Mídia

**Problema**: Suportar imagens locais, Cloudinary, e vídeos de múltiplas plataformas (Instagram, YouTube, TikTok).

**Solução**:
- Schema flexível com `type` discriminator
- Componente MediaModal que detecta tipo
- Embed responsivo para vídeos
- Before/after com comparação visual

```typescript
type GalleryItem = {
  type: 'image' | 'video' | 'before_after'
  // Para image
  image_path?: string
  // Para video
  video_url?: string
  video_platform?: 'instagram' | 'youtube' | 'tiktok'
  // Para before_after
  before_image_path?: string
  after_image_path?: string
}
```

### Desafio 3: Admin Access Control

**Problema**: Permitir múltiplos admins com diferentes permissões sem comprometer segurança.

**Solução**:
- Tabela `admin_accounts` com emails autorizados
- Campo `permissions` JSONB para granularidade
- Flag `is_active` para desativar sem deletar
- Super-admin hardcoded como fallback
- RLS policies no Supabase

```sql
CREATE TABLE admin_accounts (
  email TEXT UNIQUE NOT NULL,
  permissions JSONB DEFAULT '{"blog": true, "studio": true, "dashboard": true}',
  is_active BOOLEAN DEFAULT true
);

-- Função de verificação
CREATE FUNCTION is_admin(user_email TEXT) RETURNS BOOLEAN AS $$
  SELECT EXISTS(
    SELECT 1 FROM admin_accounts
    WHERE email = user_email AND is_active = true
  ) OR user_email = 'gregoryrag@gmail.com';
$$ LANGUAGE SQL SECURITY DEFINER;
```

### Desafio 4: SEO para Serviços Dinâmicos

**Problema**: Cada serviço precisa de metadata único para SEO, mas dados vêm do banco.

**Solução**:
- Função `generateMetadata` em cada page
- Structured data JSON-LD para serviços
- Sitemap dinâmico
- Alt text obrigatório para imagens

```typescript
// app/services/[category]/[service]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await getService(params.service)

  return {
    title: `${service.name} | VA Beauty`,
    description: service.description,
    openGraph: {
      images: [service.images.hero]
    }
  }
}
```

### Desafio 5: Performance com Muitas Imagens

**Problema**: Galeria e serviços têm muitas imagens, afetando carregamento.

**Solução**:
- Next.js Image com lazy loading
- Cloudinary para otimização automática
- Placeholder blur
- Responsive sizes
- Loading skeletons

```typescript
<Image
  src={cloudinaryUrl}
  alt={item.alt_text}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={blurUrl}
  className="object-cover"
/>
```

---

## Tecnologias Utilizadas

### Core Framework

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Next.js** | 15.3.2 | App Router, Server Components, Turbopack |
| **React** | 19.0.0 | Concurrent features, Server Components |
| **TypeScript** | 5 | Tipagem estática rigorosa |

### Styling & UI

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Tailwind CSS** | 4 | Utility-first CSS |
| **shadcn/ui** | 2.5.0 | Componentes base |
| **Radix UI** | Latest | Primitives acessíveis |
| **Lucide React** | 0.511.0 | Ícones |
| **class-variance-authority** | 0.7.1 | Variantes de componentes |

### Database & Backend

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Supabase** | 2.50.3 | PostgreSQL + Auth + RLS |
| **Stripe** | 18.3.0 | Pagamentos |
| **Cal.com** | 1.5.3 | Calendário de reservas |

### CMS & Media

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Sanity** | 3.97.1 | CMS para blog |
| **Cloudinary** | 2.7.0 | Upload e otimização de imagens |

### Utilities

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **date-fns** | 4.1.0 | Manipulação de datas |
| **js-cookie** | 3.0.5 | Cookies |
| **uuid** | 11.1.0 | Geração de IDs |
| **react-day-picker** | 9.7.0 | Seleção de datas |

### Diagrama de Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                      FULL STACK                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Next.js 15 + React 19                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│     ┌────────────────────────┼────────────────────────┐         │
│     ▼                        ▼                        ▼         │
│  ┌────────────┐        ┌────────────┐          ┌────────────┐  │
│  │  Frontend  │        │  Backend   │          │  External  │  │
│  │            │        │            │          │            │  │
│  │ Tailwind   │        │ Supabase   │          │ Cal.com    │  │
│  │ shadcn/ui  │        │ API Routes │          │ Stripe     │  │
│  │ Radix UI   │        │ Middleware │          │ Cloudinary │  │
│  └────────────┘        └────────────┘          └────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    TypeScript 5                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Vercel (Hosting)                         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Linhas de código TypeScript/TSX | ~30.135 |
| Arquivos fonte | 188 |
| Componentes React | 57 |
| Diretórios de API routes | 32 |
| Componentes UI base (shadcn) | 21 |
| Componentes de Booking | 9 (~3.598 LOC) |
| Componentes de Calendar | 10 (~2.035 LOC) |
| Componentes de Gallery | 5 |

### Maiores Arquivos

| Arquivo | Linhas | Propósito |
|---------|--------|-----------|
| `/admin/services/[id]/page.tsx` | 895 | Editor de serviços |
| `/components/booking/SimpleBookingPage.tsx` | 781 | UI de reserva |
| `/components/booking/SimpleBookingPageClient.tsx` | 748 | Lógica de reserva |
| `/admin/services/new/page.tsx` | 716 | Criação de serviços |
| `/admin/gallery/[id]/page.tsx` | 706 | Editor de galeria |
| `/app/blog/[slug]/page.tsx` | 575 | Página de blog post |

---

## Competências Demonstradas

### Full Stack Development
- **Frontend**: React 19, Next.js 15, Server Components
- **Backend**: API Routes, Middleware, Webhooks
- **Database**: PostgreSQL, Supabase, RLS
- **Integrações**: Stripe, Cal.com, Cloudinary, Sanity

### UI/UX Design
- **Design completo** do site do zero
- Layout responsivo mobile-first
- Sistema de cores com gradientes
- Tipografia com fonte Sora
- Animações e transições suaves

### Arquitetura
- App Router com route groups
- Server/Client component separation
- Provider pattern para estado global
- Middleware para proteção de rotas
- API routes para operações sensíveis

### Integrações Complexas
- **Cal.com**: Calendário embarcado com disponibilidade real
- **Stripe**: Pagamentos com webhooks e Connected Accounts
- **Cloudinary**: Upload e otimização de imagens
- **Sanity**: CMS headless para blog
- **Supabase**: Auth, Database, RLS

### SEO & Performance
- Server-side rendering
- Dynamic metadata generation
- Structured data (JSON-LD)
- Image optimization
- Lazy loading

---

## Conclusão

O projeto VA Beauty demonstra capacidade de:

1. **Criar sites vitrine** profissionais e atraentes
2. **Implementar sistemas de reserva** complexos com múltiplas integrações
3. **Gerenciar conteúdo dinâmico** com CMS e banco de dados
4. **Processar pagamentos** de forma segura
5. **Construir painéis administrativos** para gestão de conteúdo
6. **Aplicar boas práticas** de SEO e performance

O site está em produção, utilizado diariamente pelo instituto de beleza para receber reservas e mostrar seu trabalho.

---

**Tecnologias**: Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase, Stripe, Cal.com, Cloudinary, Sanity CMS

**Período**: 4 meses (Maio - Agosto 2025)
