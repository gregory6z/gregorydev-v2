# Ragboost - Plataforma SaaS de Chatbots IA

**Desenvolvedor**: Gregory Praxedes
**Período**: Outubro 2024 - Presente
**Papel**: Full Stack Developer & Founder
**Design UI/UX**: Gregory Praxedes (criação própria)

---

## Sumário Executivo

Plataforma SaaS multi-tenant para criação e gestão de chatbots IA com tecnologia RAG (Retrieval-Augmented Generation). Permite que empresas criem assistentes virtuais contextualizados com base em seus próprios documentos e conhecimentos, sem necessidade de programação.

### Proposta de Valor
- Preços acessíveis para PMEs
- Tecnologia RAG avançada via integração com serviço open source
- Arquitetura multi-tenant enterprise-ready
- Colaboração em equipe com RBAC completo
- Suporte a 4 idiomas (PT, EN, FR, ES)

---

## Descrição do Projeto

### Contexto de Negócio
O mercado de chatbots IA está em crescimento, mas soluções enterprise são caras para PMEs. Ragboost oferece uma alternativa acessível com recursos avançados, permitindo que empresas de todos os tamanhos criem assistentes virtuais inteligentes.

### O Problema

Empresas enfrentam:

- **Custo elevado** - Soluções enterprise cobram por mensagem e armazenamento
- **Complexidade técnica** - Integrar RAG requer conhecimento especializado
- **Falta de customização** - Widgets genéricos não representam a marca
- **Sem colaboração** - Uma pessoa gerencia tudo, sem delegação
- **Dados isolados** - Conhecimento da empresa não é aproveitado

### Desafio Técnico
Criar uma plataforma que:
- Suporte múltiplos tenants com isolamento total de dados
- Integre com serviço RAG open source para processamento de documentos
- Ofereça sistema de billing com Stripe
- Permita colaboração em equipe com roles granulares
- Seja performática e escalável

---

## Solução Implementada

### Visão Geral
Desenvolvimento de uma **plataforma SaaS completa** que:

1. **Democratiza** o acesso a chatbots IA com preços acessíveis
2. **Simplifica** a criação de assistentes sem código
3. **Escala** com arquitetura multi-tenant robusta
4. **Monetiza** com planos flexíveis via Stripe

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           RAGBOOST PLATFORM                              │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                    Frontend (React 19 + TypeScript)                  ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐ ││
│  │  │    Routes    │  │  Components  │  │          Hooks             │ ││
│  │  │              │  │              │  │                            │ ││
│  │  │ • Dashboard  │  │ • Chatbot    │  │ • useAuth                  │ ││
│  │  │ • Chatbots   │  │ • Knowledge  │  │ • useChatbots              │ ││
│  │  │ • Knowledge  │  │ • Widget     │  │ • useCurrentTenant         │ ││
│  │  │ • Settings   │  │ • Settings   │  │ • useTeamMembers           │ ││
│  │  │ • Billing    │  │ • Team       │  │ • useSubdomain             │ ││
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                    │                                     │
│          ┌─────────────────────────┼─────────────────────────┐          │
│          ▼                         ▼                         ▼          │
│  ┌──────────────┐    ┌────────────────────┐    ┌──────────────────┐    │
│  │ TanStack     │    │   TanStack Router  │    │    i18next       │    │
│  │ Query        │    │   (File-based)     │    │  (4 idiomas)     │    │
│  └──────────────┘    └────────────────────┘    └──────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                    Backend (Fastify + TypeScript)                    ││
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────────┐ ││
│  │  │   Modules    │  │  Use Cases   │  │       Integrations         │ ││
│  │  │              │  │              │  │                            │ ││
│  │  │ • Auth       │  │ • Create     │  │ • Stripe (Billing)         │ ││
│  │  │ • Tenant     │  │ • Update     │  │ • RAG Service (Open Source)│ ││
│  │  │ • Chatbot    │  │ • Delete     │  │ • Nodemailer (Email)       │ ││
│  │  │ • Knowledge  │  │ • List       │  │ • JWT (Auth)               │ ││
│  │  │ • Billing    │  │ • Invite     │  │                            │ ││
│  │  └──────────────┘  └──────────────┘  └────────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                    │                                     │
│                                    ▼                                     │
│                         ┌────────────────────┐                          │
│                         │   PostgreSQL 15+   │                          │
│                         │   (Prisma ORM)     │                          │
│                         └────────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| **useAuth** | Autenticação JWT com refresh automático |
| **useCurrentTenant** | Extração de contexto via subdomain |
| **useChatbots** | CRUD completo de chatbots |
| **useTeamMembers** | Gestão de equipe com convites |
| **useSubdomain** | Utilitários para roteamento multi-tenant |

---

## Stack Técnica

### Frontend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 19.1.0 | Framework UI moderno com hooks |
| TypeScript | 5.8.3 | Tipagem estática |
| Vite | 7.0.4 | Build tool ultra-rápido |
| TanStack Router | 1.131.27 | Roteamento file-based type-safe |
| TanStack Query | 5.85.5 | Cache e estado do servidor |
| Tailwind CSS | 4.1.11 | Estilização utility-first |
| shadcn/ui | Latest | Componentes headless |
| Radix UI | Latest | Primitivas acessíveis |
| React Hook Form | 7.62.0 | Formulários performáticos |
| Zod | 4.0.17 | Validação de schemas |
| i18next | 25.3.6 | Internacionalização |
| Recharts | 2.15.4 | Gráficos e analytics |
| Axios | 1.11.0 | Cliente HTTP |
| Sonner | 2.0.7 | Notificações toast |

### Backend

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Fastify | 5.2.2 | Framework HTTP high-performance |
| TypeScript | 5.8.3 | Tipagem estática |
| Prisma | 6.6.0 | ORM type-safe |
| PostgreSQL | 15+ | Banco de dados relacional |
| JWT | 9.1.0 | Autenticação stateless |
| Stripe | 18.0.0 | Pagamentos e billing |
| Nodemailer | 6.10.1 | Envio de emails |
| Swagger | 9.5.0 | Documentação da API |

---

## Funcionalidades Implementadas

### 1. Autenticação & Autorização

```typescript
// Sistema completo de auth
- Registro com verificação de email
- Login com JWT (access + refresh tokens)
- Reset de senha via email
- Sessões baseadas em cookies httpOnly
- RBAC com 4 níveis de permissão
```

**Roles do Sistema:**
| Role | Permissões |
|------|------------|
| **Owner** | Acesso total incluindo billing |
| **Admin** | Gerenciar equipe e chatbots |
| **Curator** | Criar e editar conteúdo |
| **User** | Apenas visualização |

### 2. Multi-Tenancy

```
Arquitetura baseada em subdomínios:

Main Domain:    ragboost.app
Tenant Access:  {empresa}.ragboost.app
Development:    lvh.me:3000 (wildcard local)
```

**Isolamento de Dados:**
- Middleware injeta contexto do tenant em todas as queries
- Header `X-Tenant-Subdomain` em todas as requisições
- Policies de banco garantem isolamento

### 3. Gestão de Chatbots

| Feature | Status |
|---------|--------|
| Criação de chatbots | ✅ |
| Configuração de modelo IA | ✅ |
| System prompt customizado | ✅ |
| Temperatura e tokens | ✅ |
| Múltiplas knowledge bases | ✅ |
| Widget embed configurável | ✅ |
| Chat playground | ✅ |

### 4. Knowledge Base

**Integração com Serviço RAG Open Source:**
- Upload de documentos (PDF, DOCX, TXT, MD)
- Chunking automático de texto
- Embedding vetorial
- Busca semântica
- Citação de fontes nas respostas

### 5. Colaboração em Equipe

```typescript
// Sistema de convites
- Envio de convite por email
- Tracking de convites pendentes
- Atribuição de roles
- Revogação de acesso
- Resend de convites expirados
```

### 6. Billing & Subscriptions

**Planos Configurados:**

| Plano | Chatbots | Mensagens/mês | Storage | Preço |
|-------|----------|---------------|---------|-------|
| Free | 1 | 100 | 2MB | Grátis |
| Starter | 3 | 1.000 | 10MB | $29 |
| Pro | 10 | 10.000 | 100MB | $99 |
| Enterprise | ∞ | ∞ | ∞ | Custom |

**Integração Stripe:**
- Checkout sessions
- Webhooks para eventos
- Customer portal
- Gestão de invoices

---

## Padrões de Design

### Frontend Patterns

**1. Custom Hooks com TanStack Query**
```typescript
// hooks/use-chatbots.ts - CRUD completo com cache

// Schema Zod para validação de runtime
const ChatbotSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(["active", "inactive", "draft"]),
  // ...
});

export type Chatbot = z.infer<typeof ChatbotSchema>;

// Query hook com cache configurado
export function useChatbots(page = 1, limit = 20) {
  const { currentTenant } = useCurrentTenant();

  return useQuery({
    queryKey: ["chatbots", currentTenant?.id, page, limit],
    queryFn: async () => {
      const response = await apiWithTenant.get(`/chatbots?page=${page}&limit=${limit}`);
      return ChatbotsResponseSchema.parse(response.data); // Validação Zod
    },
    enabled: !!currentTenant?.id,
    staleTime: 5 * 60 * 1000,  // 5 minutos
    gcTime: 15 * 60 * 1000,    // 15 minutos
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
```

**2. Optimistic Updates Completo**
```typescript
export function useCreateChatbot() {
  const queryClient = useQueryClient();
  const { currentTenant } = useCurrentTenant();

  return useMutation({
    mutationFn: async (data: CreateChatbotData) => {
      const response = await apiWithTenant.post("/chatbots", data);
      return ChatbotSchema.parse(response.data.chatbot);
    },
    onMutate: async (newChatbot) => {
      // 1. Cancela queries em andamento
      await queryClient.cancelQueries({ queryKey: ["chatbots", currentTenant?.id] });

      // 2. Snapshot do estado anterior
      const previousChatbots = queryClient.getQueryData(["chatbots", currentTenant?.id, 1, 20]);

      // 3. Atualização otimista com chatbot temporário
      const tempChatbot = { id: `temp-${Date.now()}`, ...newChatbot };
      queryClient.setQueryData(["chatbots", currentTenant?.id, 1, 20], (old) => ({
        ...old,
        chatbots: [tempChatbot, ...old.chatbots],
      }));

      return { previousChatbots }; // Para rollback
    },
    onError: (_err, _newChatbot, context) => {
      // Rollback em caso de erro
      queryClient.setQueryData(["chatbots", currentTenant?.id, 1, 20], context.previousChatbots);
    },
    onSuccess: (data) => {
      // Atualiza cache com dados reais
      queryClient.invalidateQueries({ queryKey: ["chatbots", currentTenant?.id] });
    },
  });
}
```

**3. Tenant Context via Subdomain**
```typescript
// lib/api-with-tenant.ts - Cliente HTTP com contexto automático

function getCurrentSubdomain(): string | null {
  const hostname = window.location.hostname;

  // Development: tenant1.localhost
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    return parts.length > 1 ? parts[0] : null;
  }

  // Production: tenant1.multisaas.app
  if (hostname.includes("multisaas.app")) {
    const parts = hostname.split(".");
    return parts.length > 2 ? parts[0] : null;
  }

  return null;
}

export const apiWithTenant = {
  get: (url: string, config = {}) => {
    const subdomain = getCurrentSubdomain();
    return api.get(url, {
      ...config,
      headers: {
        ...config.headers,
        ...(subdomain && { "X-Tenant-Subdomain": subdomain }),
      },
    });
  },
  // post, put, delete, patch seguem o mesmo padrão
};
```

**4. File-Based Routing (TanStack Router)**
```typescript
// routes/_authenticated.tsx - Proteção de rotas

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    // 1. Verifica autenticação
    if (!isAuthenticated()) {
      throw redirect({ to: "/auth/login", search: { redirect: location.href } });
    }

    // 2. Verifica se tem tenant (exceto página de criar tenant)
    if (location.pathname === "/dashboard/tenants/create") return;

    const response = await api.get("/tenants");
    const tenants = response.data?.tenants || [];

    if (tenants.length === 0) {
      throw redirect({ to: "/dashboard/tenants/create", replace: true });
    }
  },
  component: AuthenticatedLayout,
});

// Estrutura de pastas = rotas
// routes/
// ├── _authenticated.tsx           # Layout protegido
// ├── _authenticated.dashboard/
// │   ├── _layout.tsx              # Dashboard layout
// │   ├── chatbots/                # /dashboard/chatbots/*
// │   ├── knowledge-base/          # /dashboard/knowledge-base/*
// │   └── tenants/                 # /dashboard/tenants/*
// └── auth/                        # Rotas públicas
```

**5. Auth Storage com Cookies Cross-Subdomain**
```typescript
// auth/storage.ts - Tokens compartilhados entre subdomains

const COOKIE_NAME = "ragboost_auth_token";

export function setAuthToken(token: string): void {
  // Valida formato JWT
  const metadata = extractTokenMetadata(token);
  if (!metadata) throw new AuthStorageError("Invalid JWT token format");

  // Verifica expiração
  if (isTokenExpired(token)) throw new AuthStorageError("Cannot store expired token");

  // Salva em cookie (compartilhado entre subdomains via Domain=.localhost)
  setCookie({ name: COOKIE_NAME, value: token, days: 7 });

  emitAuthEvent("token_set");
}

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  return token !== null; // getAuthToken já valida expiração
}
```

**6. i18n com Namespaces**
```typescript
// lib/i18n.ts - Configuração i18next

const resources = {
  pt: {
    auth: ptAuth,
    common: ptCommon,
    dashboard: ptDashboard,
    "settings-general": ptSettingsGeneral,
    "settings-members": ptSettingsMembers,
    // ...
  },
  en: { /* ... */ },
  fr: { /* ... */ },
  es: { /* ... */ },
};

i18n
  .use(LanguageDetector)        // Detecta idioma do browser
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "es", "fr", "pt"],
    ns: ["auth", "common", "dashboard", "settings-general", "settings-members"],
    load: "languageOnly",       // "fr" não "fr-FR"
  });

// Uso nos componentes
const { t } = useTranslation("settings-members");
t("inviteButton"); // "Convidar membro"
```

**7. Componentes UI (shadcn/ui + Radix)**
```
components/ui/  (31 componentes)
├── accordion.tsx      ├── dialog.tsx        ├── sidebar.tsx
├── alert-dialog.tsx   ├── dropdown-menu.tsx ├── skeleton.tsx
├── alert.tsx          ├── form.tsx          ├── slider.tsx
├── avatar.tsx         ├── input.tsx         ├── sonner.tsx
├── badge.tsx          ├── label.tsx         ├── switch.tsx
├── breadcrumb.tsx     ├── scroll-area.tsx   ├── table.tsx
├── button.tsx         ├── select.tsx        ├── tabs.tsx
├── card.tsx           ├── separator.tsx     ├── textarea.tsx
├── chart.tsx          ├── sheet.tsx         ├── toast.tsx
├── checkbox.tsx       └── tooltip.tsx
└── collapsible.tsx
```

**8. useAuth - Autenticação Completa com Error Handling**
```typescript
// hooks/use-auth.ts - Auth completo com TanStack Query v5

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t: tAuth } = useTranslation("auth");

  // Login com prefetch inteligente de tenants
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post("/sessions", data);
      return response.data;
    },

    onSuccess: async (data) => {
      // 1. Salva token IMEDIATAMENTE
      setAuthToken(data.token);

      // 2. Prefetch de tenants para decidir redirecionamento
      const tenants = await queryClient.ensureQueryData({
        queryKey: ["tenants"],
        queryFn: async () => (await api.get("/tenants")).data.tenants,
        staleTime: 5 * 60 * 1000,
      });

      // 3. Redirecionamento baseado em tenants
      if (tenants.length === 0) {
        navigate({ to: "/dashboard/tenants/create" });
      } else {
        // Redireciona para subdomain do primeiro tenant
        window.location.href = getTenantSubdomainUrl(tenants[0].subdomain);
      }
    },

    onError: (error) => {
      // Error handling granular por status code
      if (error.response?.status === 401) {
        error.message = tAuth("errors.invalidCredentials");
      } else if (error.response?.status === 429) {
        error.message = tAuth("errors.tooManyAttempts");
      }
    },

    // Retry strategy: NUNCA retry em auth errors
    retry: (failureCount, error) => {
      if ([400, 401, 403, 429].includes(error.response?.status)) return false;
      return failureCount < 1;
    },

    networkMode: "online",
  });

  // Logout com cleanup seletivo de cache
  const logoutMutation = useMutation({
    mutationFn: async () => {
      try { await api.post("/auth/logout"); } catch {}
    },
    onSettled: () => {
      removeAuthToken();
      // Limpa APENAS caches relacionados (não queryClient.clear()!)
      queryClient.removeQueries({ queryKey: ["tenants"] });
      queryClient.removeQueries({ queryKey: ["chatbots"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      window.location.href = getLoginUrl();
    },
    retry: false,
    networkMode: "always", // Logout funciona offline
  });

  return { isAuthenticated, login: loginMutation, logout: logoutMutation };
}
```

**9. useTeamMembers - Gestão de Equipe com RBAC**
```typescript
// hooks/use-team-members.ts

export function useTeamMembers() {
  const tenantId = useCurrentTenantId();

  return useQuery({
    queryKey: ["team-members", tenantId],
    queryFn: async () => {
      const response = await api.get("/users");
      return TeamMembersResponseSchema.parse(response.data).users;
    },
    enabled: !!tenantId,
    staleTime: 2 * 60 * 1000, // 2 min - equipe muda pouco
  });
}

// Hook para role do usuário atual
export function useCurrentUserRole() {
  const { data: currentUser } = useUser();
  const { data: teamMembers } = useTeamMembers();

  return useMemo(() => ({
    role: currentUserMember?.role,
    isOwner: role === "owner",
    isAdmin: role === "admin",
    canManageTeam: role === "owner" || role === "admin",
    canEditChatbots: ["owner", "admin", "curator"].includes(role),
  }), [currentUserMember]);
}

// Mutation com optimistic update e rollback
export function useRemoveMember() {
  return useMutation({
    mutationFn: (userId) => api.delete(`/tenants/users/${userId}`),
    onMutate: async (userId) => {
      const previousMembers = queryClient.getQueryData(["team-members", tenantId]);
      queryClient.setQueryData(["team-members", tenantId],
        (old) => old.filter((m) => m.id !== userId)
      );
      return { previousMembers };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["team-members", tenantId], context.previousMembers);
      toast.error("Erro ao remover membro");
    },
    onSuccess: () => toast.success("Membro removido"),
  });
}
```

**10. Axios Interceptors - Refresh Token Automático**
```typescript
// lib/axios.ts - Interceptors com retry logic

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true, // Envia cookies cross-domain
});

// Request interceptor - adiciona token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor - refresh token automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // 401 - tenta refresh token
    if (error.response?.status === 401 && !config._isRetryAfterRefresh) {
      try {
        // Chama refresh (cookie httpOnly vai automaticamente)
        const { data } = await axios.patch("/refresh-token", {}, { withCredentials: true });
        setAuthToken(data.token);

        // Retenta requisição original com novo token
        config._isRetryAfterRefresh = true;
        config.headers.Authorization = `Bearer ${data.token}`;
        return api(config);
      } catch {
        // Refresh falhou - desloga
        removeAuthToken();
        window.location.href = getLoginUrl();
      }
    }

    // Network error - retry com exponential backoff
    if (!error.response && config.retry < 3) {
      config.retry = (config.retry || 0) + 1;
      await new Promise((r) => setTimeout(r, 2 ** config.retry * 1000));
      return api(config);
    }

    return Promise.reject(error);
  }
);
```

**11. API Queries Layer - Separação de Concerns**
```typescript
// api/queries/tenant/index.ts - Barrel exports
export { useTenantsQuery } from "./use-tenants-query";
export { useCreateTenantMutation } from "./use-create-tenant-mutation";
export { useUpdateTenantMutation } from "./use-update-tenant-mutation";
export { useDeleteTenantMutation } from "./use-delete-tenant-mutation";
export { useJoinTenantMutation } from "./use-join-tenant-mutation";

// api/queries/
// ├── tenant/      # CRUD de tenants
// ├── member/      # Gestão de membros
// ├── plan/        # Planos e pricing
// └── subscription/ # Assinaturas
```

**12. Subdomain Detection Strategy**
```typescript
// hooks/use-subdomain.ts

export const getCurrentSubdomain = (): string | null => {
  const hostname = window.location.hostname;

  // Development: lvh.me (domínio mágico que resolve para localhost)
  if (hostname.includes("lvh.me")) {
    const parts = hostname.split(".");
    return parts.length > 2 ? parts[0] : null; // tenant1.lvh.me → "tenant1"
  }

  // Development: localhost (tenant1.localhost)
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    return parts.length > 1 ? parts[0] : null;
  }

  // Production: multisaas.app (tenant1.multisaas.app)
  if (hostname.includes("multisaas.app")) {
    const parts = hostname.split(".");
    return parts.length > 2 ? parts[0] : null;
  }

  return null;
};

// Hook que usa cache de tenants (sem API call extra)
export function useSubdomain() {
  const { data: tenants } = useTenantsQuery();
  const subdomain = getCurrentSubdomain();

  // Encontra tenant que match o subdomain atual
  const currentTenant = subdomain && tenants
    ? tenants.find((t) => t.subdomain === subdomain)
    : null;

  return { data: currentTenant, subdomain };
}
```

### Backend Patterns

**1. Clean Architecture com Camadas**
```
modules/{name}/
├── routes/        # Definição de endpoints Fastify
├── http/          # Controllers (handlers HTTP)
├── use-cases/     # Business logic isolada
├── repositories/  # Data access (Prisma)
├── factories/     # Dependency Injection
├── entities/      # Domain models
├── dtos/          # Schemas Zod + OpenAPI
└── errors/        # Custom errors do domínio
```

**2. Either Monad Pattern (Functional Error Handling)**
```typescript
// core/either.ts - Tratamento funcional de erros
export type Either<L, R> = Left<L, R> | Right<L, R>

// Left = Erro, Right = Sucesso
export const left = <L, R>(value: L): Either<L, R> => new Left(value)
export const right = <L, R>(value: R): Either<L, R> => new Right(value)

// Uso nos use cases
async execute(): Promise<Either<NotAllowedError | Error, Chatbot>> {
  if (!hasPermission) return left(new NotAllowedError())
  return right(chatbot)
}
```

**3. Use Case Pattern com Injeção de Dependências**
```typescript
export class CreateChatbotUseCase {
  constructor(
    private chatbotRepository: ChatbotRepository,
    private checkPermissionUseCase: CheckPermissionUseCase,
    private getTenantLimitsUseCase: GetTenantLimitsUseCaseInterface
  ) {}

  async execute(request: CreateChatbotUseCaseRequest): Promise<Either<Error, Chatbot>> {
    // 1. Verifica permissões via RBAC
    const permissionResult = await this.checkPermissionUseCase.execute({...})
    if (permissionResult.isLeft()) return left(new NotAllowedError())

    // 2. Verifica limites do plano
    const limitsResult = await this.getTenantLimitsUseCase.execute({...})
    if (currentCount >= maxChatbots) return left(new ChatbotLimitExceededError())

    // 3. Executa operação
    const chatbot = await this.chatbotRepository.create(request)
    return right(chatbot)
  }
}
```

**4. Factory Pattern para DI**
```typescript
export function makeCreateChatbotUseCase() {
  const chatbotRepository = makeChatbotRepository()
  const checkPermissionUseCase = makeCheckPermissionUseCase()
  const getTenantLimitsUseCase = makeGetTenantLimitsUseCase()

  return new CreateChatbotUseCase(
    chatbotRepository,
    checkPermissionUseCase,
    getTenantLimitsUseCase
  )
}
```

**5. Controller Pattern (HTTP → Use Case)**
```typescript
export async function createChatbotController(
  request: FastifyRequest<{ Body: CreateChatbotRequest }>,
  reply: FastifyReply
) {
  const createChatbotUseCase = makeCreateChatbotUseCase()

  const result = await createChatbotUseCase.execute({...})

  if (result.isLeft()) {
    const error = result.value
    if (error instanceof NotAllowedError) return reply.code(403).send({...})
    if (error instanceof ChatbotLimitExceededError) return reply.code(400).send({...})
    return reply.code(500).send({...})
  }

  return reply.code(201).send(result.value)
}
```

**6. Routes com Zod + OpenAPI**
```typescript
export const createChatbotRoutes: FastifyPluginAsyncZod = async app => {
  app.post("/", {
    schema: {
      tags: ["Chatbots"],
      summary: "Create a new chatbot",
      body: createChatbotSchema,        // Zod validation
      response: { 201: chatbotResponseSchema },
      operationId: "createChatbot",     // OpenAPI
    },
    onRequest: [verifyJwt()],           // Middleware
    handler: createChatbotController,
  })
}
```

**7. Provider Pattern para Serviços Externos**
```
providers/
├── email/          # Nodemailer
├── payment/        # Stripe
├── ragflow/        # Serviço RAG
├── hash/           # bcrypt
├── token/          # JWT
├── firecrawl/      # Web crawling
└── crawl4ai/       # AI crawling
```

---

## Métricas do Código

### Frontend

| Métrica | Valor |
|---------|-------|
| Arquivos TypeScript/TSX | 206 |
| Componentes React | 88 |
| Custom Hooks | 7+ |
| Rotas | 15+ |
| Linhas de Código | ~52.000 |
| Idiomas Suportados | 4 |
| Componentes UI (shadcn) | 33 |

### Backend

| Métrica | Valor |
|---------|-------|
| Arquivos TypeScript | 200+ |
| Módulos de Domínio | 10 |
| Use Cases | 30+ |
| Endpoints API | 50+ |
| Modelos de Banco | 12 |
| Linhas de Código | ~52.000 |

### Total do Projeto

| Métrica | Valor |
|---------|-------|
| **Total de Arquivos** | 2.066 |
| **Total LOC** | ~221.000 |
| **Cobertura de Testes** | Em desenvolvimento |

---

## Decisões Técnicas

### React 19 + Vite vs Next.js

| Decisão | Justificativa |
|---------|---------------|
| **React 19 SPA** | Aplicação dashboard não precisa de SSR |
| **Vite** | HMR instantâneo, builds 10x mais rápidos |
| **TanStack Router** | Type-safety completo, file-based routing |

### Fastify vs Express vs NestJS

| Decisão | Justificativa |
|---------|---------------|
| **Fastify** | 2x mais rápido que Express |
| **Schema validation** | Validação nativa com JSON Schema |
| **Plugin system** | Arquitetura modular e extensível |

### PostgreSQL + Prisma vs MongoDB

| Decisão | Justificativa |
|---------|---------------|
| **PostgreSQL** | ACID compliance, relações complexas |
| **Prisma** | Type-safety, migrations, studio |
| **Multi-tenant** | Row-level security nativo |

### TanStack Query vs Redux

| Decisão | Justificativa |
|---------|---------------|
| **TanStack Query** | Cache automático, mutations |
| **Server state** | Separação clara de estado |
| **Menos boilerplate** | Sem actions/reducers |

---

## Desafios & Soluções

### 1. Isolamento Multi-Tenant

**Problema:** Prevenir vazamento de dados entre tenants

**Solução:**
```typescript
// Middleware em todas as rotas
app.addHook('preHandler', async (req) => {
  const subdomain = req.headers['x-tenant-subdomain']
  req.tenant = await getTenantBySubdomain(subdomain)
  if (!req.tenant) throw new UnauthorizedError()
})

// Queries sempre filtradas
const chatbots = await prisma.chatbot.findMany({
  where: { tenantId: req.tenant.id }
})
```

### 2. State Management Complexo

**Problema:** Gerenciar estado global + estado do servidor

**Solução:**
- TanStack Query para server state (cache, refetch)
- useCurrentTenant() para contexto do tenant
- Estado local para UI components
- Zero Redux/Zustand (evitar complexidade)

### 3. Streaming de Respostas IA

**Problema:** Exibir respostas token por token

**Solução:**
```typescript
// Backend suporta Server-Sent Events
// Frontend renderiza tokens conforme chegam
// Fallback para polling se SSE falhar
// Citações embutidas no stream
```

### 4. Internacionalização em Escala

**Problema:** Manter 4 idiomas sincronizados

**Solução:**
```typescript
// Organização por namespaces
locales/
├── pt/
│   ├── common.json
│   ├── auth.json
│   └── chatbot.json
├── en/
├── fr/
└── es/

// Lazy loading por idioma
i18n.loadNamespaces(['chatbot'])
```

---

## Segurança Implementada

### Frontend
- XSS protection (React escaping)
- CSRF prevention (SameSite cookies)
- Token storage em httpOnly cookies
- Validação de input com Zod
- Environment variables para secrets

### Backend
- JWT signature verification
- Rate limiting em endpoints
- SQL injection prevention (Prisma ORM)
- Request validation com Zod
- Tenant isolation middleware
- CORS configurado
- HTTPS enforcement

---

## Status de Desenvolvimento

### Completo (90%)

| Módulo | Status |
|--------|--------|
| Autenticação | ✅ 100% |
| Multi-tenancy | ✅ 100% |
| Team Management | ✅ 95% |
| UI Infrastructure | ✅ 100% |
| Forms & Validation | ✅ 100% |
| i18n (4 idiomas) | ✅ 100% |
| API Backend | ✅ 95% |
| Stripe Integration | ✅ 100% (backend) |

### Em Progresso

| Módulo | Status |
|--------|--------|
| Chatbot UI | 🔄 70% |
| Knowledge Base Upload | 🔄 60% |
| Analytics Dashboard | 🔄 30% |
| Billing UI | 🔄 0% |

---

## Estrutura de Pastas

### Frontend
```
src/
├── api/              # TanStack Query hooks
│   ├── queries/      # useQuery hooks
│   ├── mutations/    # useMutation hooks
│   └── schemas/      # Zod schemas
├── auth/             # Auth logic
├── components/       # 88 componentes
│   ├── ui/          # 33 shadcn/ui
│   ├── chatbot/     # Chatbot features
│   ├── features/    # Settings, plans
│   └── layouts/     # Page layouts
├── hooks/           # 7 custom hooks
├── lib/             # Utilities
├── routes/          # File-based routing
└── locales/         # 4 idiomas
```

### Backend
```
src/
├── modules/         # 10 domain modules
│   ├── auth/
│   ├── tenant/
│   ├── chatbot/
│   ├── ragflow/     # RAG integration
│   ├── subscription/
│   └── ...
├── core/            # Cross-cutting
├── middlewares/     # Request middleware
├── providers/       # External services
└── env/             # Configuration
```

---

## Estratégia de Testes

### Arquitetura de Testes

O projeto implementa uma estratégia de testes em duas camadas:

```
multi-saas/
├── src/
│   ├── core/
│   │   ├── either.spec.ts                    # Testes unitários do core
│   │   └── events/domain-events.spec.ts      # Testes de domain events
│   ├── modules/
│   │   ├── tenant/
│   │   │   ├── use-cases/
│   │   │   │   ├── create-tenant.spec.ts     # Unit tests
│   │   │   │   ├── update-tenant.spec.ts
│   │   │   │   └── delete-tenant.spec.ts
│   │   │   └── controllers/
│   │   │       ├── create-tenant.e2e.spec.ts # E2E tests
│   │   │       └── list-tenants.e2e.spec.ts
│   │   ├── auth/
│   │   │   ├── use-cases/authenticate-user.spec.ts
│   │   │   └── controllers/authenticate-user.e2e.spec.ts
│   │   └── subscription/
│   │       └── use-cases/
│   │           ├── create-checkout-session.spec.ts
│   │           ├── handle-webhook.spec.ts
│   │           └── cancel-subscription.spec.ts
│   └── providers/
│       └── email/in-memory/in-memory-email-provider.spec.ts
└── prisma/
    └── prisma-test-environment/              # Isolated test DB
```

### Unit Tests (Use Cases)

```typescript
// modules/tenant/use-cases/create-tenant.spec.ts
test("CreateTenantUseCase", async t => {
  // In-memory repositories para isolamento
  const tenantsRepository = new InMemoryTenantsRepository()
  const usersRepository = new InMemoryUsersRepository()

  await t.test("should create tenant with owner role", async () => {
    const useCase = new CreateTenantUseCase(tenantsRepository, usersRepository)

    const result = await useCase.execute({
      name: "Acme Corp",
      subdomain: generateUniqueSlug("acme"),
      userId: user.id,
    })

    assert.ok(result.isRight())
    assert.strictEqual(result.value.name, "Acme Corp")
  })

  await t.test("should reject duplicate subdomain", async () => {
    // ... test de conflito
  })
})
```

### E2E Tests (Controllers)

```typescript
// modules/tenant/controllers/create-tenant.e2e.spec.ts
test("Create Tenant (e2e)", async t => {
  const testDb = await setupTestDatabase()  // Prisma test environment
  const prisma = testDb.prisma

  await app.ready()

  t.beforeEach(async () => {
    // Limpa tabelas entre testes
    await prisma.userTenantRole.deleteMany()
    await prisma.tenant.deleteMany()
    await prisma.user.deleteMany()
  })

  t.after(async () => {
    await testDb.teardown()  // Cleanup do ambiente
  })

  await t.test("should be able to create a new tenant", async () => {
    // 1. Cria usuário
    const email = generateUniqueEmail("johndoe")
    await request(app.server).post("/accounts").send({
      name: "John Doe",
      email,
      password: "123456",
    })

    // 2. Autentica
    const authResponse = await request(app.server).post("/sessions").send({
      email,
      password: "123456",
    })
    const token = authResponse.body.token

    // 3. Cria tenant
    const subdomain = generateUniqueSlug("mycompany")
    const createResponse = await request(app.server)
      .post("/tenants")
      .set("Cookie", [`refreshToken=${token}`])
      .send({ name: "My Company", subdomain })

    assert.strictEqual(createResponse.statusCode, 201)

    // 4. Verifica no banco
    const tenantInDatabase = await prisma.tenant.findUnique({
      where: { subdomain },
    })
    assert.ok(tenantInDatabase)
  })
})
```

### Test Utilities

```typescript
// test/helpers/generate-unique-data.ts
export function generateUniqueEmail(prefix: string): string {
  return `${prefix}-${randomUUID().slice(0, 8)}@example.com`
}

export function generateUniqueSlug(prefix: string): string {
  return `${prefix}-${randomUUID().slice(0, 8)}`
}
```

### Comandos de Teste

```bash
# Todos os testes
npm test

# Apenas unit tests
npm run test:unit

# Apenas e2e tests
npm run test:e2e

# Watch mode
npm run test:watch
```

---

## Domain Events

### Arquitetura de Eventos

O sistema usa Domain Events para comunicação assíncrona entre módulos:

```typescript
// core/events/domain-events.ts
export const DomainEvents = {
  handlers: {} as Record<string, EventHandler[]>,
  markedEvents: [] as Event[],
  shouldRun: true,  // Desabilitado em testes

  markEvent(event: Event): void {
    DomainEvents.markedEvents.push(event)
  },

  async dispatchEventsForAggregate(): Promise<void> {
    if (!DomainEvents.shouldRun) return

    const events = DomainEvents.markedEvents
    DomainEvents.markedEvents = []

    for (const event of events) {
      await DomainEvents.dispatch(event)
    }
  },

  register<E extends Event>(eventName: string, handler: EventHandler<E>): void {
    if (!DomainEvents.handlers[eventName]) {
      DomainEvents.handlers[eventName] = []
    }
    DomainEvents.handlers[eventName].push(handler)
  },

  async dispatch(event: Event): Promise<void> {
    const handlers = DomainEvents.handlers[event.name]
    if (!handlers) return

    for (const handler of handlers) {
      await handler.handle(event)
    }
  },
}
```

### Eventos do Sistema

| Evento | Módulo | Descrição |
|--------|--------|-----------|
| `tenant.created` | Tenant | Novo tenant criado |
| `invitation.created` | Invitation | Convite enviado |
| `invitation.accepted` | Invitation | Usuário aceitou convite |
| `subscription.created` | Subscription | Nova assinatura |
| `subscription.canceled` | Subscription | Assinatura cancelada |
| `invoice.paid` | Subscription | Pagamento confirmado |
| `limits.exceeded` | Limits | Limite de recursos atingido |

### Webhook Service (Stripe)

```typescript
// webhooks/webhook-service.ts
export class WebhookService {
  private handlers: Map<string, BaseWebhookHandler> = new Map()

  registerHandler(eventType: string, handler: BaseWebhookHandler): void {
    this.handlers.set(eventType, handler)
  }

  async processEvent(eventType: string, data: Record<string, unknown>): Promise<boolean> {
    const handler = this.handlers.get(eventType)
    if (!handler) return false

    await handler.handleEvent(data, eventType)
    return true
  }
}

// Handlers implementados:
// - CheckoutSessionHandler
// - SubscriptionHandler
// - InvoiceHandler
```

---

## Sistema RBAC Detalhado

### Estrutura de Permissões (50+)

```typescript
// modules/rbac/constants/permissions.ts
export const PERMISSIONS = {
  // Usuários
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",
  USERS_DELETE_ADMIN: "users:delete-admin",
  USERS_CHANGE_ROLE: "users:change-role",
  USERS_INVITE: "users:invite",

  // Tenant
  TENANT_VIEW: "tenant:view",
  TENANT_EDIT: "tenant:edit",
  TENANT_DELETE: "tenant:delete",
  TENANT_TRANSFER_OWNERSHIP: "tenant:transfer-ownership",
  TENANT_MANAGE_BILLING: "tenant:manage-billing",
  TENANT_MANAGE_PLAN: "tenant:manage-plan",
  TENANT_CHANGE_SUBDOMAIN: "tenant:change-subdomain",
  TENANT_ADD_USERS: "tenant:add-users",
  TENANT_REMOVE_USERS: "tenant:remove-users",

  // Convites
  INVITATION_CREATE: "invitation:create",
  INVITATION_VIEW: "invitation:view",
  INVITATION_REVOKE: "invitation:revoke",
  INVITATION_RESEND: "invitation:resend",

  // Chatbots
  CHATBOT_CREATE: "chatbot:create",
  CHATBOT_VIEW: "chatbot:view",
  CHATBOT_UPDATE: "chatbot:update",
  CHATBOT_DELETE: "chatbot:delete",
  BOTS_CONFIGURE: "bots:configure",
  BOTS_ADJUST_PROMPTS: "bots:adjust-prompts",

  // Knowledge Base
  KNOWLEDGE_VIEW: "knowledge:view",
  KNOWLEDGE_CREATE: "knowledge:create",
  KNOWLEDGE_EDIT: "knowledge:edit",
  KNOWLEDGE_DELETE: "knowledge:delete",
  KNOWLEDGE_MANAGE_SOURCES: "knowledge:manage-sources",
  KNOWLEDGE_ADJUST_RETRIEVAL: "knowledge:adjust-retrieval",

  // Conversas
  CONVERSATIONS_VIEW: "conversations:view",
  CONVERSATIONS_VIEW_OWN: "conversations:view-own",
  CONVERSATIONS_TAKEOVER: "conversations:takeover",
  CONVERSATIONS_PROVIDE_FEEDBACK: "conversations:provide-feedback",

  // Analytics
  ANALYTICS_VIEW_ALL: "analytics:view-all",
  ANALYTICS_VIEW_LIMITED: "analytics:view-limited",

  // Integrações
  INTEGRATIONS_MANAGE: "integrations:manage",
  INTEGRATIONS_RAGFLOW: "integrations:ragflow",

  // Subscriptions
  SUBSCRIPTIONS_VIEW: "subscriptions:view",
  SUBSCRIPTIONS_MANAGE: "subscriptions:manage",

  // Limites
  LIMITS_VIEW: "limits:view",
  LIMITS_MANAGE: "limits:manage",
  LIMITS_TRACK: "limits:track",
} as const
```

### Matriz de Roles

| Permissão | Owner | Admin | Curator | User |
|-----------|:-----:|:-----:|:-------:|:----:|
| TENANT_DELETE | ✅ | ❌ | ❌ | ❌ |
| TENANT_MANAGE_BILLING | ✅ | ❌ | ❌ | ❌ |
| USERS_DELETE_ADMIN | ✅ | ❌ | ❌ | ❌ |
| USERS_CHANGE_ROLE | ✅ | ✅ | ❌ | ❌ |
| CHATBOT_CREATE | ✅ | ✅ | ✅ | ❌ |
| CHATBOT_DELETE | ✅ | ✅ | ❌ | ❌ |
| KNOWLEDGE_EDIT | ✅ | ✅ | ✅ | ❌ |
| ANALYTICS_VIEW_ALL | ✅ | ✅ | ❌ | ❌ |
| CONVERSATIONS_VIEW_OWN | ✅ | ✅ | ✅ | ✅ |

---

## Database Schema (17 Entidades)

### Diagrama de Relacionamentos

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│    User     │───────│  UserTenantRole  │───────│   Tenant    │
│             │       │  (many-to-many)  │       │             │
│ • id        │       │ • role           │       │ • subdomain │
│ • email     │       │ • tenantId       │       │ • ragflowId │
│ • name      │       │ • userId         │       │             │
└─────────────┘       └──────────────────┘       └─────────────┘
      │                                                 │
      ▼                                                 │
┌─────────────────┐                                     │
│EmailVerification│                                     │
└─────────────────┘                                     │
                                                        ▼
                    ┌────────────────────────────────────────────────┐
                    │                     Tenant                      │
                    └────────────────────────────────────────────────┘
                            │       │       │       │       │
          ┌─────────────────┤       │       │       │       └──────────────┐
          ▼                 ▼       ▼       ▼       ▼                      ▼
    ┌──────────┐      ┌─────────┐  ┌───────────┐  ┌────────────┐  ┌─────────────┐
    │Invitation│      │ Chatbot │  │KnowledgeBase│ │Subscription│  │ChatbotWidget│
    └──────────┘      └─────────┘  └───────────┘  └────────────┘  └─────────────┘
                           │              │              │               │
                           │              ▼              │               ▼
                           │        ┌──────────┐         │        ┌─────────────┐
                           │        │ Document │         │        │WidgetSession│
                           │        └──────────┘         │        └─────────────┘
                           │                             │               │
                           └────────────────┐            │               ▼
                                            ▼            │        ┌─────────────┐
                                    ┌──────────────┐     │        │WidgetMessage│
                                    │ResourceLimit │     │        └─────────────┘
                                    └──────────────┘     │
                                                         ▼
                    ┌─────────────────────────────────────────────────┐
                    │                   Subscription                   │
                    └─────────────────────────────────────────────────┘
                            │              │              │
          ┌─────────────────┤              │              └──────────────┐
          ▼                 ▼              ▼                             ▼
    ┌──────────┐    ┌──────────────┐  ┌──────────────────┐        ┌──────────┐
    │   Plan   │    │SubscriptionAddon│ │SubscriptionUsage │        │PlanLimit │
    └──────────┘    └──────────────┘  └──────────────────┘        └──────────┘
          │
          ▼
    ┌──────────────┐
    │ AddonCatalog │
    └──────────────┘
```

### Modelos Principais

| Entidade | Campos Chave | Relacionamentos |
|----------|--------------|-----------------|
| **User** | email, passwordHash, hasUsedTrial | UserTenantRole, Invitation |
| **Tenant** | subdomain, ragflowId | Chatbot, KnowledgeBase, Subscription |
| **Subscription** | externalId (Stripe), status, planId | Plan, SubscriptionAddon |
| **Chatbot** | name, configuration (JSON), status | ChatbotWidget, Tenant |
| **KnowledgeBase** | ragflowId, sizeBytes, documentsCount | Document, Tenant |
| **ChatbotWidget** | appearance, texts, behavior (JSON) | WidgetSession |

---

## Decisões Críticas de Arquitetura

### 1. Subdomain-based Multi-tenancy

**Decisão:** Usar subdomains para isolamento de tenants

**Alternativas consideradas:**
- Path-based (`/tenant1/dashboard`) - Menor isolamento
- Query param (`?tenant=id`) - Não profissional
- Header-based - Sem UX visual

**Justificativa:**
```
✅ Isolamento visual claro para usuários
✅ Cookies compartilhados via Domain=.ragboost.app
✅ Escalabilidade (cada tenant = URL única)
✅ SEO amigável para whitelabel futuro
```

### 2. Cookie-based Auth vs localStorage

**Decisão:** Armazenar access token em cookie JavaScript (não httpOnly)

**Justificativa:**
```typescript
// Compartilhamento cross-subdomain:
// - tenant1.ragboost.app pode ler mesmo cookie de tenant2.ragboost.app
// - Impossível com localStorage (isolado por origin)

setCookie({
  name: "ragboost_auth_token",
  value: token,
  days: 7,
  domain: ".localhost", // Dev
  // domain: ".ragboost.app" // Prod
})
```

### 3. Either Monad para Erros

**Decisão:** Usar Either<Error, Success> em vez de throw/catch

**Justificativa:**
```typescript
// Benefícios:
// ✅ Erros são type-safe
// ✅ Fluxo explícito (não há throw hidden)
// ✅ Fácil de compor
// ✅ Controller sabe exatamente que erros esperar

// Contra throw:
// ❌ Erros são stringly-typed
// ❌ Caller não sabe que erros podem ocorrer
// ❌ Stack traces confusas
```

### 4. Factory Pattern vs DI Container

**Decisão:** Factories manuais em vez de container como tsyringe

**Justificativa:**
```typescript
// Factories:
// ✅ Zero magic (fácil de debugar)
// ✅ Tree-shakeable
// ✅ TypeScript puro (sem decorators)
// ✅ Fácil de testar (override manual)

// DI Container:
// ❌ Decorators (precisa de reflect-metadata)
// ❌ Runtime overhead
// ❌ Debugging complexo
```

### 5. Zod em Runtime (Client + Server)

**Decisão:** Validação Zod tanto no frontend quanto backend

**Justificativa:**
```typescript
// Frontend:
const validated = ChatbotSchema.parse(response.data)
// Se API retornar formato errado, erro é capturado

// Backend:
const body = createChatbotSchema.parse(request.body)
// Request malformado é rejeitado com erro estruturado

// Benefícios:
// ✅ Single source of truth para types
// ✅ Erros detalhados para debugging
// ✅ Proteção contra API changes
```

---

## Fluxos de Implementação Detalhados

### 1. Fluxo de Autenticação Completo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FLUXO DE AUTENTICAÇÃO                           │
└─────────────────────────────────────────────────────────────────────────┘

REGISTRO:
┌──────────────┐     ┌────────────────┐     ┌───────────────────┐
│  Frontend    │────▶│  POST /accounts │────▶│ CreateAccountUseCase│
│  Register    │     │                │     │                   │
└──────────────┘     └────────────────┘     └───────────────────┘
                                                    │
                     ┌──────────────────────────────┘
                     ▼
         ┌───────────────────────┐     ┌──────────────────┐
         │ BcryptHashProvider    │────▶│ PrismaUserRepo   │
         │ (hash password)       │     │ (save user)      │
         └───────────────────────┘     └──────────────────┘
                     │
                     ▼
         ┌───────────────────────┐     ┌──────────────────┐
         │ EmailVerification     │────▶│ NodemailerProvider│
         │ Token (UUID)          │     │ (send email)     │
         └───────────────────────┘     └──────────────────┘

LOGIN:
┌──────────────┐     ┌────────────────┐     ┌───────────────────┐
│  Frontend    │────▶│  POST /sessions│────▶│AuthenticateUseCase│
│  Login       │     │                │     │                   │
└──────────────┘     └────────────────┘     └───────────────────┘
                                                    │
                     ┌──────────────────────────────┘
                     ▼
         ┌───────────────────────┐     ┌──────────────────┐
         │ BcryptHashProvider    │────▶│ JWTTokenProvider │
         │ (verify password)     │     │ (sign tokens)    │
         └───────────────────────┘     └──────────────────┘
                     │
                     ▼
         ┌───────────────────────────────────────────────────┐
         │ Response:                                          │
         │ • accessToken (15min) → Body JSON                 │
         │ • refreshToken (7d)   → httpOnly Cookie           │
         └───────────────────────────────────────────────────┘

REFRESH:
┌──────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  Frontend    │────▶│POST /token/refresh│───▶│ RefreshTokenUseCase│
│ (auto)       │     │ Cookie: refreshT  │     │                   │
└──────────────┘     └──────────────────┘     └───────────────────┘
```

### 2. Fluxo Multi-Tenant com Subdomain

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE RESOLUÇÃO DE TENANT                         │
└─────────────────────────────────────────────────────────────────────────┘

BROWSER REQUEST:
┌────────────────────────────────────────────────────────────────────────┐
│ URL: https://acme.ragboost.app/dashboard/chatbots                      │
│ Cookie: ragboost_auth_token=eyJhbG...                                  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   getCurrentSubdomain()       │
                    │   hostname.split(".")[0]      │
                    │   → "acme"                    │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ API Request:                                                            │
│ GET /chatbots                                                           │
│ Headers:                                                                │
│   X-Tenant-Subdomain: acme                                              │
│   Authorization: Bearer eyJhbG...                                       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   currentUserMiddleware()     │
                    │   1. Decode JWT               │
                    │   2. Find User                │
                    │   3. Find Tenant by subdomain │
                    │   4. Verify UserTenantRole    │
                    │   5. Inject request.tenant    │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │   ListChatbotsController      │
                    │   WHERE tenantId = req.tenant │
                    └───────────────────────────────┘
```

### 3. Fluxo de Subscription com Stripe

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE SUBSCRIPTION STRIPE                         │
└─────────────────────────────────────────────────────────────────────────┘

CHECKOUT:
┌──────────────┐     ┌─────────────────┐     ┌───────────────────────┐
│  Frontend    │────▶│ POST /checkout  │────▶│CreateCheckoutUseCase  │
│ "Subscribe"  │     │                 │     │                       │
└──────────────┘     └─────────────────┘     └───────────────────────┘
                                                      │
                     ┌────────────────────────────────┘
                     ▼
         ┌───────────────────────┐     ┌──────────────────────┐
         │ PlansRepository       │────▶│ StripeProvider       │
         │ (get plan details)    │     │ createCheckoutSession│
         └───────────────────────┘     └──────────────────────┘
                                              │
         ┌────────────────────────────────────┘
         ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Response: { url: "https://checkout.stripe.com/..." }                    │
│ → Frontend redirects to Stripe Checkout                                 │
└────────────────────────────────────────────────────────────────────────┘

WEBHOOK (após pagamento):
┌──────────────────┐     ┌────────────────────┐     ┌─────────────────────┐
│ Stripe Event     │────▶│ POST /webhooks     │────▶│ WebhookService      │
│ checkout.complete│     │                    │     │ processEvent()      │
└──────────────────┘     └────────────────────┘     └─────────────────────┘
                                                           │
                         ┌─────────────────────────────────┘
                         ▼
             ┌───────────────────────────────┐
             │ CheckoutSessionHandler        │
             │ 1. Verify signature           │
             │ 2. Extract metadata           │
             │ 3. CreateSubscriptionUseCase  │
             │ 4. Update tenant limits       │
             │ 5. Dispatch SubscriptionEvent │
             └───────────────────────────────┘
                         │
                         ▼
             ┌───────────────────────────────┐
             │ DomainEvents.dispatch(        │
             │   "subscription.created"      │
             │ )                             │
             └───────────────────────────────┘
```

### 4. Fluxo de Convite de Membro

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE CONVITE DE MEMBRO                           │
└─────────────────────────────────────────────────────────────────────────┘

ENVIO:
┌──────────────┐     ┌─────────────────┐     ┌───────────────────────┐
│ Admin        │────▶│POST /invitations│────▶│ CreateInvitationUseCase│
│ "Invite"     │     │                 │     │                       │
└──────────────┘     └─────────────────┘     └───────────────────────┘
                                                      │
                     ┌────────────────────────────────┘
                     ▼
         ┌───────────────────────┐
         │ Validações:           │
         │ 1. Check permission   │
         │ 2. User not in tenant │
         │ 3. No pending invite  │
         │ 4. Team limit check   │
         └───────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐     ┌──────────────────────┐
         │ InvitationRepository  │────▶│ NodemailerProvider   │
         │ (save with token)     │     │ (send invite email)  │
         └───────────────────────┘     └──────────────────────┘

ACEITE:
┌──────────────┐     ┌─────────────────────┐     ┌──────────────────────┐
│ Email Link   │────▶│GET /invitations/:tok│────▶│AcceptInvitationUseCase│
│ "Accept"     │     │                     │     │                      │
└──────────────┘     └─────────────────────┘     └──────────────────────┘
                                                          │
                         ┌────────────────────────────────┘
                         ▼
             ┌───────────────────────────────┐
             │ 1. Validate token & expiry    │
             │ 2. Create/Get User            │
             │ 3. Create UserTenantRole      │
             │ 4. Update invitation status   │
             │ 5. Dispatch InvitationAccepted│
             └───────────────────────────────┘
```

### 5. Fluxo de RBAC (Permission Check)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUXO DE VERIFICAÇÃO DE PERMISSÃO                    │
└─────────────────────────────────────────────────────────────────────────┘

REQUEST:
┌──────────────────────────────────────────────────────────────────────────┐
│ DELETE /chatbots/123                                                     │
│ User: curator@example.com, Role: curator                                │
└──────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ DeleteChatbotController       │
                    │ makeDeleteChatbotUseCase()    │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ DeleteChatbotUseCase.execute()│
                    │                               │
                    │ checkPermissionUseCase.execute({
                    │   userId: "user-123",         │
                    │   tenantId: "tenant-456",     │
                    │   permission: CHATBOT_DELETE  │
                    │ })                            │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ CheckPermissionUseCase        │
                    │                               │
                    │ 1. Get UserTenantRole         │
                    │    role = "curator"           │
                    │                               │
                    │ 2. Get role permissions       │
                    │    curator_permissions = [    │
                    │      CHATBOT_VIEW,            │
                    │      CHATBOT_CREATE,          │
                    │      CHATBOT_UPDATE           │
                    │    ]                          │
                    │                               │
                    │ 3. Check if includes DELETE   │
                    │    ❌ NOT INCLUDED            │
                    │                               │
                    │ return left(NotAllowedError)  │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │ Controller Response:          │
                    │ 403 Forbidden                 │
                    │ { error: "Not allowed" }      │
                    └───────────────────────────────┘
```

---

## Módulos do Backend (10 Módulos)

### Estrutura Detalhada por Módulo

| Módulo | Use Cases | Controllers | Responsabilidade |
|--------|-----------|-------------|------------------|
| **account** | 5 | 5 | Criação de conta, perfil, senha |
| **auth** | 4 | 4 | Login, refresh, logout, reset |
| **tenant** | 12 | 10 | CRUD tenant, add/remove users |
| **chatbot** | 6 | 5 | CRUD chatbot, publish |
| **ragflow** | 8 | 6 | Knowledge bases, documents |
| **subscription** | 15 | 8 | Plans, checkout, webhooks |
| **limits** | 4 | 3 | Usage tracking, enforcement |
| **invitation** | 6 | 5 | Create, accept, revoke |
| **rbac** | 3 | 0 | Permission check, initialize |
| **widget** | 8 | 6 | Widget config, sessions, chat |

### Providers (Serviços Externos)

| Provider | Interface | Implementations |
|----------|-----------|-----------------|
| **email** | EmailProvider | NodemailerProvider, InMemoryEmailProvider |
| **payment** | PaymentProvider | StripeProvider, InMemoryPaymentProvider |
| **ragflow** | RagflowProvider | RagflowHttpProvider, InMemoryRagflowProvider |
| **hash** | HashProvider | BcryptHashProvider |
| **token** | TokenProvider | JWTTokenProvider |
| **firecrawl** | CrawlProvider | FirecrawlProvider |
| **crawl4ai** | AIcrawlProvider | Crawl4AIProvider |

---

## Próximos Passos

### Fase 1: Core Completion
- [ ] Finalizar UI de chatbots
- [ ] Implementar upload de knowledge base
- [ ] Chat playground completo

### Fase 2: Monetização
- [ ] Checkout Stripe
- [ ] Seleção de planos
- [ ] Billing dashboard

### Fase 3: Analytics
- [ ] Dashboard de métricas
- [ ] Histórico de conversas
- [ ] Relatórios de uso

### Fase 4: Scale
- [ ] Testes E2E
- [ ] Performance optimization
- [ ] Security audit

---

## Conclusão

Ragboost demonstra competência em:

- **Arquitetura SaaS** - Multi-tenant, billing, RBAC
- **Full Stack Moderno** - React 19, Fastify, TypeScript
- **Clean Architecture** - Use Cases, Repositories, DDD
- **Integrações** - Stripe, serviço RAG, Email
- **UX/UI** - Design system, dark mode, i18n
- **DevOps** - Docker-ready, CI/CD prepared

**Status:** 85% completo, pronto para MVP
