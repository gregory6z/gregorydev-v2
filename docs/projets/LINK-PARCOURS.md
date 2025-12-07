# LINK-Parcours - Plataforma de Gestão de Formação

**Desenvolvedor**: Gregory Praxedes
**Período**: Agosto - Outubro 2025
**Papel**: Desenvolvedor Frontend Principal (desenvolvimento em equipe)
**Design UI/UX**: Gregory Praxedes (criação própria)

---

## Sumário Executivo

Plataforma administrativa completa para gestão de sessões de formação profissional, usuários, candidatos e apprenants. Sistema de back-office com dashboard avançado, tabelas paginadas, formulários complexos com validação, e sistema de avaliação de posicionamento.

### Impacto
- Gestão centralizada de todas as sessões de formação
- Sistema de roles (admin/tuteur) com permissões granulares
- Avaliação de candidatos com múltiplos critérios (PIX, Cléa, soft skills)
- Tracking de progresso dos apprenants (béabas, missions)
- Interface internacionalizada em francês

---

## Descrição do Projeto

### Contexto de Negócio
Les Performeurs precisa gerenciar centenas de sessões de formação, cada uma com múltiplos dias (session_jours), participantes, e avaliações. Administradores e tuteurs precisam de ferramentas diferentes para suas responsabilidades.

### O Problema

A gestão manual apresentava:

- **Dados fragmentados** - Informações em planilhas, emails, sistemas diferentes
- **Sem controle de acesso** - Todos viam tudo, sem separação de responsabilidades
- **Avaliações manuais** - PIX, Cléa, soft skills registrados em papel
- **Tracking inexistente** - Progresso dos apprenants não era monitorado
- **Relatórios impossíveis** - Dados dispersos impediam análises

### Desafio Técnico
Criar um sistema administrativo que:
- Suporte CRUD completo de múltiplas entidades relacionadas
- Implemente controle de acesso baseado em roles
- Gerencie paginação server-side para grandes volumes
- Mantenha URL state para navegação com filtros
- Valide formulários complexos com feedback i18n

---

## Solução Implementada

### Visão Geral
Desenvolvimento de um **dashboard administrativo** que:

1. **Centraliza** toda gestão de formação em uma interface
2. **Separa responsabilidades** por role (admin vs tuteur)
3. **Padroniza avaliações** com formulários validados
4. **Permite análises** com tabelas filtráveis e ordenáveis

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                       LINK-PARCOURS                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  React 18 + TypeScript                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │    Pages     │  │  Components  │  │      Hooks       │  │ │
│  │  │              │  │              │  │                  │  │ │
│  │  │ • Users      │  │ • Tables     │  │ • useAuth        │  │ │
│  │  │ • Sessions   │  │ • Forms      │  │ • useUsers       │  │ │
│  │  │ • Apprenants │  │ • Positioning│  │ • useSessions    │  │ │
│  │  │ • Details    │  │ • Progress   │  │ • useApprenant   │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ React Query  │    │  React Hook  │    │    nuqs      │      │
│  │   (Cache)    │    │    Form      │    │ (URL State)  │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                              │                                   │
│                              ▼                                   │
│                    ┌────────────────┐                           │
│                    │   LINK API     │                           │
│                    │   (Backend)    │                           │
│                    └────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| **useAuth** | Autenticação JWT + redirecionamento por role |
| **useUsers** | CRUD de usuários com paginação server-side |
| **useSessions** | Gestão de sessões e session_jours |
| **useApprenant** | Dados de apprenants com filtros client-side |
| **usePositioning** | Avaliações PIX, Cléa, soft skills |
| **useProgress** | Tracking de béabas e missions |
| **TanStack Table** | Tabelas com sorting, filtering, pagination |
| **React Hook Form + Zod** | Formulários validados |

### Funcionalidades Implementadas

**Gestão de Usuários (Admin)**
- CRUD completo de usuários
- Atribuição de roles (admin, tuteur, apprenant)
- Upload de foto de perfil
- Ativação/desativação de contas

**Gestão de Sessions**
- Criar/editar sessões de formação
- Múltiplos dias (session_jours) por sessão
- Gestão de participantes por dia
- Pré-inscrições de candidatos

**Avaliação de Posicionamento**
- Scores PIX (compétences numériques)
- Résultats Cléa (certification)
- Soft skills games
- Entretiens (motivation, comportement, capacité)

**Tracking de Progresso**
- Béabas (étapes de base)
- Missions (tâches complètes)
- Cálculo de percentagem global
- Statuts configuráveis

**Gestão de Apprenants (Tuteur)**
- Lista de apprenants assignés
- Détail complet du profil
- Historique de progression
- Évaluations em tempo real

---

## Design Patterns Implementados

### 1. Role-Based Access Control Pattern

**Problema**: Sistema com 8 tipos de usuários (superAdmin, admin, supervisor, contentCreator, evaluateur, tuteur, candidat, apprenant), cada um com permissões e visões diferentes da aplicação.

**Solução**: Componente `RoleProtectedRoute` + hook `useRoleBasedRedirect`.

```
┌─────────────────────────────────────────────────────────────┐
│                  Route Protection                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              ProtectedRouteLayout                    │    │
│  │         (Verifica autenticação)                      │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              RoleProtectedRoute                      │    │
│  │         (Verifica role do usuário)                   │    │
│  │                                                      │    │
│  │   allowedRoles={[UserGroupCode.admin,               │    │
│  │                  UserGroupCode.superAdmin]}          │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │  /users     │   │  /sessions  │   │ /apprenants │       │
│  │ (admin)     │   │ (admin)     │   │  (tuteur)   │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Segurança**: Acesso controlado por role
- **Redirecionamento automático**: Após login, segundo o role
- **Composabilidade**: Fácil adicionar novos roles

### 2. Container/Presenter Pattern (Tables)

**Problema**: Tabelas complexas misturam lógica de dados com UI.

**Solução**: Separar hooks de dados dos componentes de tabela.

```
┌─────────────────────────────────────────────────────────────┐
│                    Table Architecture                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   useSessions()                      │    │
│  │              (Dados + Paginação)                     │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 SessionsTable                        │    │
│  │              (UI + TanStack Table)                   │    │
│  │                                                      │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │    │
│  │  │  Columns   │  │  Filters   │  │ Pagination │    │    │
│  │  └────────────┘  └────────────┘  └────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Separação de concerns**: Dados vs UI
- **Reusabilidade**: Mesmo pattern para todas as tabelas
- **Testabilidade**: Hooks testáveis independentemente

### 3. URL State Management Pattern

**Problema**: Filtros, pagination, tabs devem persistir na URL para compartilhamento e navegação.

**Solução**: `nuqs` sincroniza o estado com os query parameters.

```
┌─────────────────────────────────────────────────────────────┐
│                   URL State Flow                             │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  Component  │───▶│    nuqs     │───▶│    URL      │     │
│  │   State     │    │  (Adapter)  │    │  ?page=2    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         ▲                                     │             │
│         └─────────────────────────────────────┘             │
│                      (Bidirecional)                          │
└─────────────────────────────────────────────────────────────┘
```

**Exemplo**:
```typescript
const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
```

**Benefícios**:
- **Compartilhamento**: URL contém todo o estado
- **Navegação**: Back/Forward funcionam
- **Refresh**: Estado preservado após recarregamento

### 4. Schema Validation Pattern (Zod + React Hook Form)

**Problema**: Validação de formulários complexos com mensagens i18n.

**Solução**: Schemas Zod dinâmicos com traduções.

```
┌─────────────────────────────────────────────────────────────┐
│                   Form Validation Flow                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Zod Schema (Dynamic)                    │    │
│  │                                                      │    │
│  │   const schema = userCreateFormSchema(t);           │    │
│  │   // t = função de tradução                          │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              React Hook Form                         │    │
│  │                                                      │    │
│  │   resolver: zodResolver(schema)                     │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Form Component                          │    │
│  │                                                      │    │
│  │   {errors.email?.message} → "L'email est requis"    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Type-safe**: Inferência de tipos automática
- **i18n**: Mensagens na língua do usuário
- **Reutilizável**: Mesmo schema para criação e edição

### 5. Composition Pattern (UI Components)

**Problema**: Componentes UI reutilizáveis com variações.

**Solução**: shadcn/ui + Radix UI com `class-variance-authority`.

```
┌─────────────────────────────────────────────────────────────┐
│                   Component Composition                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Radix UI                          │    │
│  │            (Primitives acessíveis)                   │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   shadcn/ui                          │    │
│  │             (Styling + Composição)                   │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │   Button    │   │   Dialog    │   │   Table     │       │
│  │ variant="x" │   │             │   │             │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Acessibilidade**: Radix gerencia ARIA automaticamente
- **Customização**: Tailwind para o styling
- **Consistência**: Design system uniforme

### 6. Adapter Pattern (Data Fetching)

**Problema**: API retorna estruturas diferentes, frontend espera formato uniforme.

**Solução**: Hooks adaptam os dados antes de expô-los.

```typescript
// API retorna
{ data: { users: [...], pagination: {...} } }

// Hook expõe
const { users, totalPages, currentPage } = useUsers();
```

**Benefícios**:
- **Desacoplamento**: Componentes ignoram a estrutura da API
- **Facilidade de mudança**: Modificar a API sem tocar os componentes

---

## Decisões Técnicas e Trade-offs

### 1. Tailwind CSS vs CSS Modules

**Decisão**: Tailwind CSS v4

**Motivos**:
- Produtividade aumentada (sem arquivos CSS separados)
- Design system integrado
- Purge automático (bundle mínimo)
- Ecossistema rico (plugins, shadcn/ui)

**Trade-off**: Curva de aprendizado, classes verbosas

### 2. Radix UI vs Material UI

**Decisão**: Radix UI + shadcn/ui

**Motivos**:
- Primitives acessíveis sem styling imposto
- Controle total sobre a aparência
- Bundle mais leve
- Sem opiniões sobre o design

**Trade-off**: Mais trabalho de styling inicial

### 3. nuqs vs React Router State

**Decisão**: nuqs para URL state

**Motivos**:
- Sincronização bidirecional automática
- Type-safe com parsers
- Compatível com React Router
- Suporte a valores padrão

**Trade-off**: Dependência adicional

### 4. React Hook Form vs Formik

**Decisão**: React Hook Form + Zod

**Motivos**:
- Performance (menos re-renders)
- Integração nativa com Zod
- API mais simples
- Melhor suporte TypeScript

**Trade-off**: Curva de aprendizado para Zod

### 5. TanStack Table vs ag-Grid

**Decisão**: TanStack Table

**Motivos**:
- Headless (controle total sobre a UI)
- Open source
- Leve
- Integração React Query

**Trade-off**: Menos funcionalidades "out of the box"

### 6. Paginação Server-side vs Client-side

**Decisão**: Híbrida

| Entidade | Tipo | Razão |
|----------|------|-------|
| Users | Server-side | Volume potencialmente grande |
| Sessions | Server-side | Volume potencialmente grande |
| Apprenants | Client-side | Volume limitado, filtagem rápida |

**Trade-off**: Complexidade aumentada, dois patterns para manter

---

## Desafios e Soluções

### Desafio 1: Gestão de Roles Complexa

**Problema**: Sistema com **8 níveis de roles** hierárquicos, cada um com permissões e acessos diferentes.

**Solução**:
- Enum `UserGroupCode` com códigos numéricos representando hierarquia
- `RoleProtectedRoute` verifica as permissões por rota
- `useRoleBasedRedirect` redireciona após login baseado no role

```typescript
enum UserGroupCode {
  superAdmin = 450,      // Acesso total ao sistema
  admin = 400,           // Gestão de usuários e sessões
  supervisor = 350,      // Supervisão de equipes
  contentCreator = 300,  // Criação de conteúdo pedagógico
  evaluateur = 250,      // Avaliação de candidatos
  tuteur = 200,          // Acompanhamento de apprenants
  candidat = 150,        // Candidatos em processo
  apprenant = 100,       // Aprendizes em formação
}
```

**Matriz de permissões**:

| Role | Users | Sessions | Apprenants | Candidats | Avaliações |
|------|-------|----------|------------|-----------|------------|
| superAdmin | ✅ CRUD | ✅ CRUD | ✅ View | ✅ View | ✅ View |
| admin | ✅ CRUD | ✅ CRUD | ✅ View | ✅ View | ✅ View |
| supervisor | ❌ | ✅ View | ✅ View | ✅ View | ✅ View |
| evaluateur | ❌ | ✅ View | ❌ | ✅ Avaliar | ✅ CRUD |
| tuteur | ❌ | ❌ | ✅ CRUD | ✅ View | ✅ View |

### Desafio 2: Formulários Multi-Etapas

**Problema**: Página de criação de usuário com muitos campos e validação complexa.

**Solução**:
- Tabs para organizar as seções
- Schema Zod parcial por seção
- Validação na submissão final
- Estado persistido entre tabs

### Desafio 3: Tabelas com Filtros Persistentes

**Problema**: Usuário filtra uma tabela, navega para detalhes, volta → filtros perdidos.

**Solução**:
- Estado dos filtros na URL via nuqs
- `location.state` para contexto de navegação
- Botão voltar reconstrói a URL com filtros

```typescript
const backUrl = buildUrlWithFilters('/sessions', navigationFilters);
```

### Desafio 4: Sistema de Posicionamento

**Problema**: Múltiplos tipos de avaliação com estruturas diferentes (PIX scores, Cléa results, soft skills).

**Solução**:
- Componentes dedicados por tipo de avaliação
- Hook `usePositioning` centraliza os dados
- Exibição condicional (null-safe)

```typescript
const { pix, clea, softSkills, entretien } = usePositioning(userId);
```

### Desafio 5: Internacionalização

**Problema**: Aplicação 100% em francês com mensagens de validação dinâmicas.

**Solução**:
- react-i18next com namespaces por domínio
- Schemas Zod recebem função `t`
- date-fns com locale `fr`

```typescript
const schema = userCreateFormSchema(t);
// Mensagens: t('validation.email.required')
```

### Desafio 6: Upload de Foto de Perfil

**Problema**: Editar foto existente, preview antes do upload, deletar foto.

**Solução**:
- react-dropzone para drag & drop
- Estado local para preview
- Mutation separada para upload/delete
- Refresh após sucesso

---

## Tecnologias Utilizadas

### Core Framework

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 18.3 | Biblioteca UI com concurrent features |
| **TypeScript** | 5.5 | Tipagem estática rigorosa |
| **Vite** | 6.2 | Build tool rápido |

### Styling & UI

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Tailwind CSS** | 4.0 | Utility-first CSS |
| **Radix UI** | Latest | 13+ primitives acessíveis |
| **shadcn/ui** | Latest | Componentes pré-estilizados |
| **Lucide React** | 0.485 | Ícones |
| **class-variance-authority** | 0.7 | Variants de componentes |
| **tailwind-merge** | 3.0 | Fusão de classes |

### Forms & Validation

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Hook Form** | 7.55 | Gestão de formulários |
| **Zod** | 3.24 | Validação de schemas |
| **@hookform/resolvers** | 4.1 | Integração Zod |

### Data Management

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **TanStack React Query** | 5.71 | Cache servidor |
| **TanStack React Table** | 8.21 | Tabelas avançadas |
| **nuqs** | 2.4 | URL state management |

### Routing & Navigation

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Router** | 6.27 | Navegação SPA |

### i18n & Dates

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **react-i18next** | 15.4 | Internacionalização |
| **i18next** | 23.7 | Core i18n |
| **date-fns** | 4.1 | Manipulação de datas |

### Markdown & Math

| Tecnologia | Uso |
|------------|-----|
| **react-markdown** | Renderização Markdown |
| **rehype-katex** | Fórmulas matemáticas |
| **remark-gfm** | GitHub Flavored Markdown |

### Charts & Data Viz

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Recharts** | 2.15 | Gráficos |

### Notifications & Feedback

| Tecnologia | Uso |
|------------|-----|
| **Sonner** | Toasts notifications |

### File Upload

| Tecnologia | Uso |
|------------|-----|
| **react-dropzone** | Drag & drop upload |

### Diagrama de Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND STACK                              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      React 18.3                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│     ┌────────────────────────┼────────────────────────┐         │
│     ▼                        ▼                        ▼         │
│  ┌────────────┐        ┌────────────┐          ┌────────────┐  │
│  │  Styling   │        │   State    │          │    Forms   │  │
│  │            │        │            │          │            │  │
│  │ Tailwind   │        │ React Query│          │ RHF + Zod  │  │
│  │ Radix UI   │        │ nuqs       │          │            │  │
│  │ shadcn/ui  │        │ TanStack   │          │            │  │
│  └────────────┘        └────────────┘          └────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    TypeScript 5.5                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      Vite 6.2                               │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Linhas de código TypeScript/TSX | ~21.524 |
| Componentes React | 26+ diretórios |
| Hooks personalizados | 14 |
| Páginas | 11 |
| Schemas Zod | 10 |
| Tipos/DTOs | 20+ |
| Componentes UI (shadcn) | 37 |

---

## Competências Demonstradas

### Design UI/UX
- **Criação completa do design** da interface administrativa
- Definição de fluxos de usuário e wireframes
- Design system coerente e profissional
- Escolha de componentes e padrões visuais

### Arquitetura Frontend
- Design de sistemas com roles e permissões
- Separação container/presenter
- URL state management
- Composição de componentes

### UI/UX Development
- Implementação do design system com Tailwind + shadcn/ui
- Acessibilidade com Radix UI
- Forms complexos com validação
- Tabelas interativas com filtros

### Estado & Dados
- React Query para cache servidor
- TanStack Table para dados tabulares
- Estado URL sincronizado
- Paginação híbrida (server/client)

### TypeScript Avançado
- Schemas Zod com inferência
- Tipos discriminados
- Generics
- Strict mode

### i18n
- Internacionalização completa
- Mensagens de validação traduzidas
- Formatação de datas localizada

### Performance
- Bundle optimization com Vite
- Code splitting por rota
- Cache strategies React Query
- Lazy loading

---

## Conclusão

O projeto LINK-Parcours demonstra capacidade de:

1. **Conceber dashboards** administrativos complexos
2. **Implementar RBAC** com rotas protegidas
3. **Criar formulários** com validação avançada
4. **Gerenciar tabelas** com paginação e filtros
5. **Aplicar patterns** de arquitetura frontend moderna
6. **Manter um design system** coerente

A aplicação está em produção, utilizada diariamente pelas equipes administrativas e pelos tuteurs.

---

**Tecnologias**: React, TypeScript, Vite, Tailwind CSS, Radix UI, React Query, React Hook Form, Zod, TanStack Table

**Período**: 3 meses (Agosto - Outubro 2025)
