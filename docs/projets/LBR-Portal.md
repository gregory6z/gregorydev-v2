# LBR-Portal - Portal de Usuários com Chat IA

**Desenvolvedor**: Gregory Praxedes
**Período**: 2024 - 2025
**Papel**: Desenvolvedor Frontend Principal
**Design UI/UX**: Gregory Praxedes (criação própria)

---

## Sumário Executivo

Portal web React TypeScript para usuários finais interagirem com widgets de chat IA. Aplicação com autenticação robusta, refresh automático de tokens, integração com Stripe para pagamentos, e widget de chat embarcado em iframe isolado. Interface responsiva com sidebar para gerenciamento de conversas.

### Impacto
- Interface amigável para usuários finais do chat IA
- Sistema de autenticação com refresh automático
- Integração Stripe para gestão de subscrições
- Widget de chat em iframe isolado (sem conflitos de CSS/JS)
- Múltiplas conversas gerenciáveis

---

## Descrição do Projeto

### Contexto de Negócio
La Bonne Réponse (LBR) oferece widgets de chat com IA para empresas. Os usuários finais (funcionários ou clientes das empresas) precisam de um portal dedicado para acessar o chat, gerenciar conversas, e administrar suas contas.

### O Problema

A experiência do usuário apresentava:

- **Acesso disperso** - Usuários não tinham portal centralizado
- **Sem histórico** - Conversas anteriores não eram acessíveis
- **Autenticação frágil** - Tokens expiravam sem aviso
- **Pagamento manual** - Gestão de subscrição fora do sistema
- **Conflitos de CSS** - Widget embarcado causava problemas

### Desafio Técnico
Criar um portal que:
- Ofereça experiência fluida de chat
- Gerencie autenticação com refresh automático
- Integre pagamentos Stripe nativamente
- Isole widget em iframe para evitar conflitos
- Seja responsivo e acessível

---

## Solução Implementada

### Visão Geral
Desenvolvimento de um **portal de usuários** que:

1. **Centraliza** acesso ao chat IA com histórico de conversas
2. **Autentica** com JWT e refresh automático
3. **Integra** Stripe para gestão de subscrições
4. **Isola** widget em iframe para segurança e estabilidade

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                        LBR-PORTAL                                │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  React 18 + TypeScript                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │    Pages     │  │  Components  │  │      Hooks       │  │ │
│  │  │              │  │              │  │                  │  │ │
│  │  │ • Home       │  │ • Sidebar    │  │ • useAuth        │  │ │
│  │  │ • Login      │  │ • Header     │  │ • useWidget      │  │ │
│  │  │ • Account    │  │ • Stripe     │  │ • useSubscript.  │  │ │
│  │  │ • Reset      │  │ • Layouts    │  │ • useConversation│  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ React Query  │    │   Widget     │    │    Stripe    │      │
│  │   (Cache)    │    │   Iframe     │    │   Pricing    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                              │                                   │
│                              ▼                                   │
│                    ┌────────────────┐                           │
│                    │   LBR-API      │                           │
│                    │   (Backend)    │                           │
│                    └────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### Páginas Principais

| Página | Responsabilidade |
|--------|------------------|
| **HomePage** | Dashboard com widget de chat |
| **LoginPage** | Autenticação de usuários |
| **AccountPage** | Gerenciamento de conta e senha |
| **AccountActivationPage** | Ativação de novas contas |
| **RenewPasswordPage** | Solicitar reset de senha |
| **ResetPasswordPage** | Executar reset com token |
| **PresentationPage** | Página standalone para demos |

### Funcionalidades Implementadas

**Sistema de Autenticação**
- Login com email/senha
- JWT armazenado em cookie
- Refresh automático 10 min antes da expiração
- Logout global ao expirar token
- Ativação de conta via token
- Reset de senha via email

**Dashboard com Chat**
- Widget embarcado em iframe isolado
- Múltiplas conversas na sidebar
- Criar nova conversa
- Continuar conversas existentes
- Recarregar widget sob demanda

**Gestão de Conta**
- Editar perfil (nome, sobrenome)
- Selecionar título profissional
- Selecionar setor de trabalho
- Alterar senha com validação robusta
- 12-64 caracteres, uppercase, special char

**Integração Stripe**
- Pricing table dinâmica
- Verificação de status de subscrição
- Redirecionamento para billing portal
- Fallback para widget sem pagamento (B2B)

**Páginas de Apresentação**
- URL dinâmica por nome
- Carrega dados da API
- Widget embarcado
- Logo customizável
- Sem autenticação obrigatória

---

## Design Patterns Implementados

### 1. Automatic Token Refresh Pattern

**Problema**: Tokens JWT expiram e interrompem a sessão do usuário.

**Solução**: Refresh automático X minutos antes da expiração.

```
┌─────────────────────────────────────────────────────────────┐
│                  Token Refresh Flow                          │
│                                                              │
│  Login Success                                               │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              scheduleTokenRefresh()                  │    │
│  │                                                      │    │
│  │   expirationTime = decode(token).exp                │    │
│  │   timeUntilRefresh = expTime - now - 10min         │    │
│  │                                                      │    │
│  │   setTimeout(refreshToken, timeUntilRefresh)        │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              [Timer: 50 min later]                   │    │
│  │                                                      │    │
│  │   POST /users/refresh-token                         │    │
│  │   Cookies.set(newToken)                             │    │
│  │   refetchUser()                                     │    │
│  │   reloadWidget()                                    │    │
│  │   scheduleTokenRefresh() // Reagenda                │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┴─────────────────┐               │
│         ▼                                   ▼               │
│  ┌─────────────┐                   ┌─────────────┐         │
│  │   Success   │                   │   Failure   │         │
│  │  Continue   │                   │   Logout    │         │
│  └─────────────┘                   └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

**Implementação**:
```typescript
// useAuth.tsx
const REFRESH_BEFORE_EXPIRY = 10 * 60 * 1000; // 10 min

const scheduleTokenRefresh = useCallback(() => {
  const token = Cookies.get(JWT_TOKEN_NAME);
  if (!token) return;

  const decoded = jwtDecode(token);
  const expirationTime = decoded.exp * 1000;
  const timeUntilRefresh = expirationTime - Date.now() - REFRESH_BEFORE_EXPIRY;

  refreshTimerRef.current = setTimeout(async () => {
    const success = await refreshToken();
    if (success) {
      scheduleTokenRefresh();
    } else {
      logout();
    }
  }, Math.max(timeUntilRefresh, 0));
}, [refreshToken, logout]);
```

**Benefícios**:
- **Transparente**: Usuário não percebe refresh
- **Seguro**: Token sempre válido
- **Resiliente**: Logout automático se falhar

### 2. Widget Iframe Isolation Pattern

**Problema**: Widget embarcado pode conflitar com CSS/JS do portal.

**Solução**: Carregar widget em iframe com sandbox.

```
┌─────────────────────────────────────────────────────────────┐
│                  Widget Isolation Flow                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   HomePage                           │    │
│  │                                                      │    │
│  │   ┌─────────────────────────────────────────────┐   │    │
│  │   │             containerRef                     │   │    │
│  │   │                                             │   │    │
│  │   │   ┌─────────────────────────────────────┐   │   │    │
│  │   │   │            <iframe>                  │   │   │    │
│  │   │   │                                      │   │   │    │
│  │   │   │   sandbox="allow-scripts            │   │   │    │
│  │   │   │            allow-same-origin"       │   │   │    │
│  │   │   │                                      │   │   │    │
│  │   │   │   <script>                          │   │   │    │
│  │   │   │     lbr-widget.iife.js              │   │   │    │
│  │   │   │     ?site-token=xxx                 │   │   │    │
│  │   │   │     &user-jwt-token=yyy             │   │   │    │
│  │   │   │     &conversation-id=zzz            │   │   │    │
│  │   │   │   </script>                         │   │   │    │
│  │   │   │                                      │   │   │    │
│  │   │   └─────────────────────────────────────┘   │   │    │
│  │   │                                             │   │    │
│  │   └─────────────────────────────────────────────┘   │    │
│  │                                                      │    │
│  │   postMessage listener                              │    │
│  │     ├── 'widget-loaded' → setIsLoading(false)      │    │
│  │     └── 'widget-error' → setError(msg)             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Implementação**:
```typescript
// useWidgetScript.tsx
const loadWidget = useCallback(() => {
  setIsLoading(true);
  setError(null);

  // Criar iframe
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  iframe.style.cssText = 'width:100%; height:100%; border:none;';

  // Escrever HTML com script
  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  iframeDoc?.write(`
    <!DOCTYPE html>
    <html>
      <head></head>
      <body>
        <script src="${widgetUrl}/lbr-widget.iife.js
          ?site-token=${siteToken}
          &user-jwt-token=${userToken}
          &existing-conversation-id=${conversationId}
          &reload=${Date.now()}">
        </script>
      </body>
    </html>
  `);
  iframeDoc?.close();

  containerRef.current?.appendChild(iframe);
}, [siteToken, userToken, conversationId]);
```

**Benefícios**:
- **Isolamento**: CSS/JS do widget não afeta portal
- **Segurança**: Sandbox limita capabilities
- **Recarregamento**: Fácil recriar iframe

### 3. Protected Route Layout Pattern

**Problema**: Rotas precisam de verificação de autenticação.

**Solução**: Layouts diferentes para rotas protegidas e públicas.

```
┌─────────────────────────────────────────────────────────────┐
│                  Route Layout Structure                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   <Router>                           │    │
│  │                                                      │    │
│  │   <Route element={<ProtectedRouteLayout />}>        │    │
│  │     ├── / (HomePage)                                │    │
│  │     └── /account (AccountPage)                      │    │
│  │                                                      │    │
│  │   <Route element={<PublicOnlyRouteLayout />}>       │    │
│  │     ├── /login                                      │    │
│  │     ├── /renew-password                            │    │
│  │     └── /reset-password                            │    │
│  │                                                      │    │
│  │   <Route path="/presentation/:name" />              │    │
│  │     └── Standalone, sem layout                      │    │
│  │                                                      │    │
│  │   <Route path="/activation" />                      │    │
│  │     └── Public activation page                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ProtectedRouteLayout:                                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   if (!isAuthenticated()) → Navigate(/login)        │    │
│  │   else → <SidebarProvider><Outlet /></SidebarProvider> │ │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  PublicOnlyRouteLayout:                                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │   if (isAuthenticated()) → Navigate(/)              │    │
│  │   else → <Header><Outlet /></Header>                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Separação clara**: Layout por tipo de rota
- **Redirect automático**: Usuário direcionado corretamente
- **Manutenção**: Lógica de layout centralizada

### 4. Subscription Status Pattern

**Problema**: Decidir se mostrar widget, pagamento, ou erro.

**Solução**: Hook que determina status com lógica centralizada.

```
┌─────────────────────────────────────────────────────────────┐
│                  Subscription Logic                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               useSubscription()                      │    │
│  │                                                      │    │
│  │   currentUser = useAuth().currentUser               │    │
│  │                                                      │    │
│  │   if (loading) return 'loading'                     │    │
│  │                                                      │    │
│  │   subscriptionActive = user.subscription?.active    │    │
│  │   requiresSubscription = tenant.requires_payment    │    │
│  │   hasTenant = !!user.tenant_id                      │    │
│  │                                                      │    │
│  │   ┌─────────────────────────────────────────────┐   │    │
│  │   │                 Decision                     │   │    │
│  │   │                                             │   │    │
│  │   │  subscriptionActive?                        │   │    │
│  │   │    → 'show-widget'                          │   │    │
│  │   │                                             │   │    │
│  │   │  !requiresSubscription && hasTenant?        │   │    │
│  │   │    → 'show-widget' (B2B)                    │   │    │
│  │   │                                             │   │    │
│  │   │  requiresSubscription && !active?           │   │    │
│  │   │    → 'show-payment'                         │   │    │
│  │   │                                             │   │    │
│  │   │  else                                       │   │    │
│  │   │    → 'show-error'                           │   │    │
│  │   └─────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  HomePage renderiza baseado em status:                      │
│  • show-widget → <WidgetContainer />                        │
│  • show-payment → <StripePricingTable />                   │
│  • show-error → <ErrorMessage />                           │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Lógica centralizada**: Uma fonte de verdade
- **Flexível**: Suporta B2B e B2C
- **Testável**: Hook isolado

### 5. HTTP Interceptor Pattern

**Problema**: Injetar token e tratar erros em todas as requisições.

**Solução**: Função interceptFetch centralizada.

```typescript
// interceptFetch.utils.ts
const interceptFetch = async (
  url: string,
  options: RequestInit,
  includeAuth: boolean = true,
  handleErrors: boolean = true
): Promise<T | null> => {
  const headers = { ...options.headers };

  // 1. Injetar token
  if (includeAuth) {
    const token = Cookies.get(JWT_TOKEN_NAME);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  // 2. Adicionar base URL
  const finalUrl = `${API_BASE_URL}${url}`;

  // 3. Executar request
  try {
    const response = await fetch(finalUrl, { ...options, headers });

    // 4. Tratar 401
    if (response.status === 401 && handleErrors) {
      await handleTokenExpiration();
      return null;
    }

    // 5. Parse response
    return await response.json();
  } catch (error) {
    if (handleErrors) {
      console.error('Fetch error:', error);
    }
    return null;
  }
};
```

**Benefícios**:
- **DRY**: Lógica comum em um lugar
- **Consistente**: Todas as requests tratadas igual
- **Flexível**: Parâmetros para casos especiais

### 6. Global Widget Reload Pattern

**Problema**: Recarregar widget de múltiplos locais (sidebar, header).

**Solução**: Context com função de reload exposta globalmente.

```
┌─────────────────────────────────────────────────────────────┐
│                  Widget Context Flow                         │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                WidgetProvider                        │    │
│  │                                                      │    │
│  │   refetchFunctionRef = useRef(null)                 │    │
│  │                                                      │    │
│  │   registerRefetchFunction(fn) {                     │    │
│  │     refetchFunctionRef.current = fn                 │    │
│  │     window.reloadWidget = fn  // Global!            │    │
│  │   }                                                 │    │
│  │                                                      │    │
│  │   refetchWidget() {                                 │    │
│  │     refetchFunctionRef.current?.()                  │    │
│  │   }                                                 │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │  HomePage   │   │  Sidebar    │   │   Auth      │       │
│  │             │   │             │   │  (refresh)  │       │
│  │ register()  │   │ refetch()   │   │ reload()    │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Desacoplamento**: Componentes não conhecem widget
- **Flexível**: Reload de qualquer lugar
- **Global**: Acessível até de interceptors

---

## Decisões Técnicas e Trade-offs

### 1. Widget em Iframe vs Embed Direto

**Decisão**: Iframe com sandbox

**Motivos**:
- Isolamento completo de CSS/JS
- Sem conflitos com styles do portal
- Sandbox para segurança
- Recarregamento fácil

**Trade-off**: Comunicação limitada (só postMessage)

### 2. Cookie vs LocalStorage para JWT

**Decisão**: Cookie (httpOnly via backend)

**Motivos**:
- Mais seguro que localStorage
- Enviado automaticamente em requests
- Pode ser httpOnly (XSS proof)

**Trade-off**: Mais complexo para configurar

### 3. Stripe Pricing Table vs Custom UI

**Decisão**: Stripe Pricing Table embarcada

**Motivos**:
- Já estilizada e responsiva
- Atualização automática de preços
- PCI compliance simplificado

**Trade-off**: Menos controle sobre UI

### 4. React Query vs Context para Server State

**Decisão**: React Query

**Motivos**:
- Caching automático
- Refetch em background
- Deduplication de requests
- Invalidation granular

**Trade-off**: Bundle size aumentado

### 5. date-fns vs Moment.js

**Decisão**: date-fns

**Motivos**:
- Bundle muito menor (tree-shakeable)
- API funcional moderna
- Locale support nativo

**Trade-off**: API diferente do Moment

---

## Desafios e Soluções

### Desafio 1: Token Refresh Automático

**Problema**: Token expira e usuário perde sessão no meio do trabalho.

**Solução**:
- Decodificar JWT para obter expiração
- Agendar refresh 10 min antes
- Reagendar após cada refresh
- Logout se refresh falhar

```typescript
// useAuth.tsx
const scheduleTokenRefresh = useCallback(() => {
  if (refreshTimerRef.current) {
    clearTimeout(refreshTimerRef.current);
  }

  const token = Cookies.get(JWT_TOKEN_NAME);
  if (!token) return;

  const decoded = jwtDecode<JwtPayload>(token);
  const expirationTime = decoded.exp! * 1000;
  const timeUntilRefresh = expirationTime - Date.now() - REFRESH_BEFORE_EXPIRY;

  if (timeUntilRefresh <= 0) {
    // Token já expirado ou muito perto
    refreshToken();
    return;
  }

  refreshTimerRef.current = setTimeout(async () => {
    const success = await refreshToken();
    if (success) {
      refetchUser();
      window.reloadWidget?.(); // Reload widget com novo token
      scheduleTokenRefresh(); // Reagendar próximo
    } else {
      logout();
    }
  }, timeUntilRefresh);
}, [refreshToken, logout, refetchUser]);
```

### Desafio 2: Widget em Iframe com Parâmetros

**Problema**: Passar token e conversation ID para widget isolado.

**Solução**:
- Parâmetros via query string na URL do script
- postMessage para comunicação bidirecional
- Cache buster para forçar reload

```typescript
// useWidgetScript.tsx
const loadWidget = useCallback(() => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');

  const iframeDoc = iframe.contentDocument!;
  iframeDoc.write(`
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;">
        <script src="${WIDGET_URL}/lbr-widget.iife.js
          ?site-token=${siteToken}
          &user-jwt-token=${userToken}
          &existing-conversation-id=${conversationId || ''}
          &reload=${Date.now()}">
        </script>
      </body>
    </html>
  `);
  iframeDoc.close();

  containerRef.current?.appendChild(iframe);

  // Listener para eventos do widget
  window.addEventListener('message', (event) => {
    if (event.data === 'widget-loaded') {
      setIsLoading(false);
    } else if (event.data.type === 'widget-error') {
      setError(event.data.message);
    }
  });
}, [siteToken, userToken, conversationId]);
```

### Desafio 3: Validação de Senha Robusta

**Problema**: Senhas precisam ser seguras com múltiplas regras.

**Solução**:
- Zod com múltiplos regex
- Feedback visual de requisitos
- Validação condicional (opcional ou obrigatório)

```typescript
// accountSchema.ts
const passwordSchema = z.string()
  .min(12, t('validation.passwordMin'))
  .max(64, t('validation.passwordMax'))
  .regex(/[A-Z]/, t('validation.passwordUppercase'))
  .regex(/[@#!$%^&*(),.?":{}|<>]/, t('validation.passwordSpecial'));

// Schema condicional
const accountSchema = z.object({
  currentPassword: z.string().optional(),
  newPassword: passwordSchema.optional(),
})
.refine((data) => {
  // Se uma está preenchida, ambas devem estar
  if (data.currentPassword || data.newPassword) {
    return data.currentPassword && data.newPassword;
  }
  return true;
}, {
  message: t('validation.bothPasswordsRequired'),
  path: ['currentPassword']
});
```

### Desafio 4: Status de Subscrição com Múltiplos Cenários

**Problema**: Decidir entre widget, pagamento, ou erro baseado em múltiplas variáveis.

**Solução**:
- Hook dedicado com lógica clara
- Suporte a B2B (sem pagamento) e B2C (com pagamento)
- Estados bem definidos

```typescript
// useSubscription.tsx
const useSubscription = () => {
  const { currentUser, isLoadingUser } = useAuth();

  const status = useMemo(() => {
    if (isLoadingUser) return 'loading';
    if (!currentUser) return 'show-error';

    const subscriptionActive = currentUser.subscription?.active;
    const requiresSubscription = currentUser.tenant?.requires_payment;
    const hasTenant = !!currentUser.tenant_id;

    // B2C com subscrição ativa
    if (subscriptionActive) return 'show-widget';

    // B2B (tenant não requer pagamento)
    if (!requiresSubscription && hasTenant) return 'show-widget';

    // B2C sem subscrição
    if (requiresSubscription && !subscriptionActive) return 'show-payment';

    return 'show-error';
  }, [currentUser, isLoadingUser]);

  return {
    status,
    shouldShowWidget: status === 'show-widget',
    stripePricingTableId: currentUser?.tenant?.stripe_pricing_table_id,
    // ... outros dados
  };
};
```

### Desafio 5: Sidebar Responsiva com Conversas

**Problema**: Sidebar com lista de conversas que funciona em mobile.

**Solução**:
- shadcn sidebar com CSS variables
- Drawer em mobile
- Lista scrollável
- Footer fixo com perfil

```typescript
// AppSidebar.tsx
<Sidebar
  collapsible="icon"
  style={{ '--sidebar-width': '17rem' } as CSSProperties}
>
  <SidebarHeader>
    <Logo />
    <NewConversationButton onClick={refetchWidget} />
  </SidebarHeader>

  <SidebarContent>
    <ConversationList
      conversations={conversations}
      activeId={activeConversationId}
      onSelect={handleSelectConversation}
    />
  </SidebarContent>

  <SidebarFooter>
    <UserProfileDropdown user={currentUser} onLogout={logout} />
  </SidebarFooter>
</Sidebar>
```

### Desafio 6: Página de Apresentação Dinâmica

**Problema**: Páginas de demo com dados diferentes por URL.

**Solução**:
- Route param para nome da apresentação
- Query para buscar dados
- Widget com token específico

```typescript
// PresentationPage.tsx
const PresentationPage = () => {
  const { presentationName } = useParams<{ presentationName: string }>();

  const { data: presentation, isLoading } = useQuery({
    queryKey: ['presentation', presentationName],
    queryFn: () => WidgetService.getPresentation(presentationName!),
    enabled: !!presentationName
  });

  const { containerRef } = useWidgetScript({
    siteToken: presentation?.data?.token,
    autoLoad: !!presentation?.data?.token
  });

  useEffect(() => {
    if (presentation?.data?.title) {
      document.title = presentation.data.title;
    }
  }, [presentation]);

  if (isLoading) return <Spinner />;

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b">
        {presentation?.data?.logo_url && (
          <img src={presentation.data.logo_url} alt="" className="h-12" />
        )}
      </header>
      <main ref={containerRef} className="flex-1" />
    </div>
  );
};
```

---

## Tecnologias Utilizadas

### Core Framework

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 18.3.1 | Concurrent features |
| **TypeScript** | 5.5.2 | Tipagem estática |
| **Vite** | 6.2.3 | Build tool rápido |

### Styling & UI

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Tailwind CSS** | 4.0.17 | Utility-first CSS |
| **Radix UI** | Latest | Primitives acessíveis |
| **shadcn/ui** | Latest | Componentes estilizados |
| **Lucide React** | 0.485.0 | Ícones |
| **next-themes** | 0.4.6 | Dark/light mode |

### Forms & Validation

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Hook Form** | 7.55.0 | Gestão de forms |
| **Zod** | 3.24.2 | Validação schemas |
| **@hookform/resolvers** | 4.1.3 | Integração |

### Data Management

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **TanStack React Query** | 5.71.1 | Server state |

### Authentication

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **js-cookie** | 3.0.5 | Cookies |
| **jwt-decode** | 4.0.0 | JWT parsing |

### Routing

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Router** | 6.27.0 | Navegação |

### i18n

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **react-i18next** | 15.4.1 | Internacionalização |
| **i18next** | 23.7.6 | Core i18n |
| **date-fns** | 4.1.0 | Formatação datas |

### Notifications

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Sonner** | 2.0.2 | Toast notifications |

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
│  │  Styling   │        │   State    │          │    Auth    │  │
│  │            │        │            │          │            │  │
│  │ Tailwind 4 │        │ React Query│          │ JWT Cookie │  │
│  │ Radix UI   │        │ Context    │          │ Auto Refre │  │
│  │ shadcn/ui  │        │            │          │ sh         │  │
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
| Linhas de código TypeScript/TSX | ~6.300 |
| Arquivos TypeScript/TSX | 75 |
| Páginas | 7 |
| Componentes UI (shadcn) | 19 |
| Hooks customizados | 5 |
| Serviços API | 3 |
| Layouts | 2 |

---

## Competências Demonstradas

### Design UI/UX
- **Criação completa do design** do portal
- Interface responsiva e intuitiva
- Sidebar com gestão de conversas
- Feedback visual em todas as ações

### Autenticação Avançada
- JWT com refresh automático
- Token scheduling antes da expiração
- Logout global ao falhar
- Protected routes por layout

### Integração de Widget
- Iframe com sandbox isolado
- Comunicação via postMessage
- Parâmetros dinâmicos
- Recarregamento sob demanda

### Integração Stripe
- Pricing table embarcada
- Verificação de status
- Billing portal redirect
- Suporte B2B e B2C

### State Management
- React Query para server state
- Context para estado global
- Hooks customizados isolados

### TypeScript
- Tipagem estrita
- Schemas Zod com inferência
- DTOs bem definidos

---

## Conclusão

O projeto LBR-Portal demonstra capacidade de:

1. **Criar portais** de usuário com UX refinada
2. **Implementar autenticação** robusta com refresh automático
3. **Integrar widgets** em iframe isolado
4. **Gerenciar pagamentos** com Stripe
5. **Desenvolver** interfaces responsivas
6. **Aplicar patterns** de arquitetura frontend

A aplicação está em produção, utilizada diariamente por usuários finais para interagir com o chat IA.

---

**Tecnologias**: React, TypeScript, Vite, Tailwind CSS, Radix UI, React Query, Stripe, JWT

**Período**: Desenvolvimento contínuo 2024-2025
