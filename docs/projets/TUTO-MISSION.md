# Tuto-Mission - Plataforma de Acompanhamento Pedagógico

**Desenvolvedor**: Gregory Praxedes
**Período**: Março - Outubro 2025
**Papel**: Desenvolvedor Frontend (desenvolvimento em equipe)
**Design UI/UX**: House of Coding (Figma fornecido)

---

## Sumário Executivo

Aplicação mobile-first para acompanhamento pedagógico de aprendizes em formação profissional. Sistema de tutoria onde tutores monitoram o progresso de aprendizes através de missões e etapas, com comunicação em tempo real via chat com suporte a mídia.

### Impacto
- Acompanhamento pedagógico digitalizado e em tempo real
- Comunicação direta tutor-apprenant com histórico persistente
- Validação de etapas com feedback visual imediato
- Suporte a conteúdo multimídia (vídeos pedagógicos, fotos, mensagens)

---

## Descrição do Projeto

### Contexto de Negócio
Les Performeurs é um organismo de formação profissional que acompanha aprendizes (apprenants) em seu percurso de desenvolvimento. Cada apprenant é acompanhado por um tuteur que valida suas missões e etapas de aprendizagem.

### O Problema

O acompanhamento pedagógico tradicional apresentava:

- **Falta de rastreabilidade** - Progresso dos apprenants não era centralizado
- **Comunicação fragmentada** - Trocas via email/WhatsApp sem histórico organizado
- **Validações manuais** - Sem sistema formal de aprovação de etapas
- **Conteúdo disperso** - Vídeos e materiais pedagógicos em múltiplas plataformas

### Desafio Técnico
Criar uma aplicação mobile-first que:
- Funcione de forma fluida em dispositivos móveis
- Suporte upload de mídias (fotos/vídeos) pesadas
- Gerencie múltiplos apprenants por tuteur
- Mantenha sincronização em tempo real das mensagens

---

## Solução Implementada

### Visão Geral
Desenvolvimento de uma **PWA mobile-first** que:

1. **Centraliza** todo o percurso pedagógico do apprenant
2. **Permite comunicação** em tempo real com histórico persistente
3. **Valida etapas** com workflow de aprovação
4. **Integra vídeos** pedagógicos com timestamps específicos

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                      TUTO-MISSION                                │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    React 18 + TypeScript                  │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐         │   │
│  │  │   Pages    │  │ Components │  │   Hooks    │         │   │
│  │  │            │  │            │  │            │         │   │
│  │  │ • Connexion│  │ • Message  │  │ • useAuth  │         │   │
│  │  │ • Missions │  │ • Video    │  │ • useMsg   │         │   │
│  │  │ • Messagerie│ │ • Cards    │  │ • useMission│        │   │
│  │  └────────────┘  └────────────┘  └────────────┘         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              TanStack React Query                         │   │
│  │         (Cache, Mutations, Optimistic Updates)            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│                    ┌────────────────┐                           │
│                    │   Tuto API     │                           │
│                    │   (Backend)    │                           │
│                    └────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| **useAuth** | Autenticação JWT com refresh automático |
| **useMessages** | Gestão de mensagens e upload de mídia |
| **useMissions** | Estado das missões e etapas |
| **MessageText/File** | Renderização de mensagens texto e mídia |
| **VideoEtape** | Player de vídeo com timestamp por etapa |
| **EtapeValidation** | Workflow de validação pelo tuteur |

### Funcionalidades Implementadas

**Sistema de Autenticação**
- Login com JWT e refresh automático
- Gestão de múltiplos apprenants por tuteur
- Reset de senha via email
- Persistência de sessão

**Percurso Pedagógico**
- Lista de missões com status visual
- Etapas dentro de cada missão
- Indicadores de validação (pendente, validado, à refaire)
- Vídeos pedagógicos com timestamps

**Sistema de Mensageria**
- Chat em tempo real tutor ↔ apprenant
- Upload de fotos e vídeos
- Mensagens de pedagogia automáticas
- Marcação de leitura
- Auto-scroll para novas mensagens

**Validação de Etapas**
- Tuteur pode validar ou solicitar refação
- Feedback visual imediato
- Histórico de validações

---

## Design Patterns Implementados

### 1. Provider Pattern (Autenticação)

**Problema**: Estado de autenticação precisa ser acessível em toda a aplicação, com lógica complexa de refresh de token.

**Solução**: Hook `useAuth` centraliza toda lógica de autenticação com variáveis globais para acesso externo.

```
┌─────────────────────────────────────────────────────────────┐
│                      useAuth Hook                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Login     │  │   Logout    │  │  Token Refresh      │  │
│  │  Mutation   │  │   Action    │  │  (Scheduled)        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Global Functions                        │    │
│  │   handleTokenExpiration() - Acessível externamente   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Centralização**: Toda lógica de auth em um lugar
- **Interoperabilidade**: `interceptFetch` pode chamar refresh
- **Reatividade**: Componentes reagem a mudanças de estado

### 2. Custom Hook Pattern (Separação de Concerns)

**Problema**: Lógica de negócio misturada com componentes de UI.

**Solução**: Hooks customizados encapsulam toda lógica de dados.

```
┌─────────────────────────────────────────────────────────────┐
│                    Custom Hooks                              │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  useAuth    │  │ useMessages │  │ useMissions │         │
│  │             │  │             │  │             │         │
│  │ • login()   │  │ • messages  │  │ • missions  │         │
│  │ • logout()  │  │ • sendMsg() │  │ • etapes    │         │
│  │ • user      │  │ • markRead()│  │ • status    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          ▼                                  │
│              ┌─────────────────────┐                       │
│              │    UI Components    │                       │
│              │   (Presentation)    │                       │
│              └─────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Testabilidade**: Hooks podem ser testados isoladamente
- **Reusabilidade**: Mesma lógica em múltiplos componentes
- **Manutenibilidade**: Mudanças de API isoladas nos hooks

### 3. Compound Component Pattern (Mensagens)

**Problema**: Mensagens podem ser texto, foto, ou vídeo, cada uma com renderização diferente.

**Solução**: Componentes separados para cada tipo de mensagem.

```
┌─────────────────────────────────────────────────────────────┐
│                    Message Components                        │
│                                                              │
│       ┌─────────────────────────────────────────┐           │
│       │              Message                     │           │
│       │         (Discriminator)                  │           │
│       └────────────────┬────────────────────────┘           │
│                        │                                     │
│         ┌──────────────┼──────────────┐                     │
│         ▼              ▼              ▼                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ MessageText │ │MessagePhoto │ │MessageVideo │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Single Responsibility**: Cada componente renderiza um tipo
- **Extensibilidade**: Novos tipos de mensagem fáceis de adicionar
- **Clareza**: Código de renderização isolado

### 4. Observer Pattern (Auto-Scroll)

**Problema**: Chat precisa rolar automaticamente quando novas mensagens chegam.

**Solução**: Hook `useScrollToBottom` observa mudanças e executa scroll.

```typescript
const messagesContainerRef = useScrollToBottom<HTMLDivElement>([
  messages,
  isLoading,
  isFetching
]);
```

**Benefícios**:
- **Reatividade**: Scroll automático em qualquer mudança
- **Reutilização**: Hook pode ser usado em qualquer lista
- **UX**: Usuário sempre vê mensagens mais recentes

### 5. Interceptor Pattern (API Calls)

**Problema**: Todas as chamadas API precisam de autenticação, tratamento de erros 401, e retry de token.

**Solução**: `interceptFetch` wrapa todas as requisições.

```
┌─────────────────────────────────────────────────────────────┐
│                    interceptFetch                            │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Request   │───▶│  Add JWT    │───▶│   Fetch     │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                              │              │
│                                              ▼              │
│                                        ┌──────────┐        │
│                     ┌──────────────────│ Response │        │
│                     │                  └──────────┘        │
│                     ▼                                       │
│              ┌─────────────┐                               │
│              │  401 Error? │──Yes──▶ handleTokenExpiration │
│              └─────────────┘                               │
│                     │ No                                    │
│                     ▼                                       │
│              ┌─────────────┐                               │
│              │   Return    │                               │
│              └─────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **DRY**: Lógica de auth centralizada
- **Consistência**: Todas as requisições tratadas igualmente
- **Resiliência**: Retry automático de token

### 6. Optimistic Updates Pattern (Mensageria)

**Problema**: Ao enviar uma mensagem, o usuário precisa esperar a resposta do servidor para ver sua mensagem na tela. Em conexões lentas, isso gera uma experiência ruim.

**Solução**: Implementação de **Optimistic Updates** com React Query - a mensagem aparece instantaneamente na UI antes da confirmação do servidor.

```
┌─────────────────────────────────────────────────────────────┐
│                  Optimistic Update Flow                      │
│                                                              │
│  ┌─────────────┐                                            │
│  │ User clicks │                                            │
│  │   "Send"    │                                            │
│  └──────┬──────┘                                            │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  1. onMutate: Adiciona mensagem ao cache local      │    │
│  │     → UI atualiza INSTANTANEAMENTE                  │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  2. mutationFn: Envia para o servidor (background)  │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                    │
│    ┌────┴────┐                                              │
│    ▼         ▼                                              │
│ ┌──────┐  ┌──────┐                                         │
│ │ OK ✓ │  │ Erro │                                         │
│ └──┬───┘  └──┬───┘                                         │
│    │         │                                              │
│    ▼         ▼                                              │
│ ┌──────────────────┐  ┌──────────────────────────────┐     │
│ │ onSuccess:       │  │ onError:                      │     │
│ │ Confirma no cache│  │ Rollback para estado anterior │     │
│ └──────────────────┘  └──────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

```typescript
const sendMessageMutation = useMutation({
  mutationFn: (message) => api.sendMessage(message),

  // Antes de enviar: atualiza UI imediatamente
  onMutate: async (newMessage) => {
    await queryClient.cancelQueries(['messages']);
    const previousMessages = queryClient.getQueryData(['messages']);

    // Adiciona mensagem otimista com ID temporário
    queryClient.setQueryData(['messages'], (old) => [
      ...old,
      { ...newMessage, id: 'temp-' + Date.now(), sending: true }
    ]);

    return { previousMessages };
  },

  // Se erro: rollback para estado anterior
  onError: (err, newMessage, context) => {
    queryClient.setQueryData(['messages'], context.previousMessages);
  },

  // Se sucesso: substitui mensagem temp pela real
  onSuccess: (serverMessage) => {
    queryClient.invalidateQueries(['messages']);
  },
});
```

**Benefícios**:
- **UX instantânea**: Mensagem aparece em < 50ms (vs 200-500ms esperando servidor)
- **Feedback visual**: Indicador de "enviando" enquanto aguarda confirmação
- **Resiliência**: Rollback automático em caso de falha
- **Transparência**: Usuário não percebe a latência da rede

---

## Decisões Técnicas e Trade-offs

### 1. React Query vs Redux/Context

**Decisão**: TanStack React Query

**Motivos**:
- Cache automático de dados do servidor
- Mutations com optimistic updates
- Refetch automático em foco
- Menos boilerplate que Redux

**Trade-off**: Menos controle granular sobre o estado

### 2. CSS Puro vs Tailwind/Styled-Components

**Decisão**: CSS Puro com arquivos separados

**Motivos**:
- Projeto mobile-first relativamente pequeno
- Performance (sem runtime CSS-in-JS)
- Controle total sobre estilos

**Trade-off**: Mais verboso, menos reutilizável

### 3. React Router v7 vs v6

**Decisão**: React Router v7

**Motivos**:
- Features mais recentes
- Melhor suporte a data loading
- Future flags para migração suave

**Trade-off**: Breaking changes em relação a v6

### 4. localStorage vs SessionStorage para Sessão

**Decisão**: localStorage + Cookies (JWT)

**Motivos**:
- Persistência entre sessões
- JWT em cookie para segurança
- Dados do usuário em localStorage para acesso rápido

**Trade-off**: Usuário fica logado indefinidamente se não fizer logout

### 5. Upload Direto vs Presigned URLs

**Decisão**: Upload direto via API

**Motivos**:
- Arquitetura mais simples
- Backend controla validações
- Menos configuração de infra

**Trade-off**: Mais carga no servidor para uploads grandes

---

## Desafios e Soluções

### Desafio 1: Múltiplos Apprenants por Tuteur

**Problema**: Um tuteur pode acompanhar vários apprenants. O sistema precisa saber qual apprenant está sendo visualizado.

**Solução**:
- ID do apprenant atual em localStorage
- Se tuteur tem 1 apprenant → seleção automática
- Se tuteur tem N apprenants → página de seleção
- Query `currentApprenant` depende de `tutorApprenants`

```typescript
// Lógica de seleção
if (apprenants.length === 1) {
  localStorage.setItem(CURRENT_APPRENANT_ID_KEY, apprenants[0].id);
  return apprenants[0];
}
return null; // Força seleção manual
```

### Desafio 2: Refresh de Token Transparente

**Problema**: Token JWT expira. Usuário não deve perceber o refresh.

**Solução**:
- Timer schedulado 10 minutos antes da expiração
- Função global `handleTokenExpiration` para erros 401
- Retry automático da requisição após refresh

```typescript
const scheduleTokenRefresh = () => {
  const timeUntilRefresh = expirationTime - Date.now() - REFRESH_BEFORE_EXPIRY;
  refreshTimerRef.current = window.setTimeout(refreshToken, timeUntilRefresh);
};
```

### Desafio 3: Upload de Mídia com Preview

**Problema**: Usuário precisa ver preview antes de enviar, e enviar junto com texto.

**Solução**:
- Estado local para arquivo selecionado
- `URL.createObjectURL()` para preview
- Envio separado de texto e mídia se ambos presentes

```typescript
if (messageText && file) {
  sendMessage({ contenu: messageText });
  sendMessage({ photo: file }); // ou video
}
```

### Desafio 4: Scroll Automático em Chat

**Problema**: Novas mensagens devem aparecer automaticamente, mas usuário pode estar lendo histórico.

**Solução**:
- Hook customizado observa dependências
- Scroll apenas em mudanças específicas
- Container ref para controle preciso

```typescript
const messagesContainerRef = useScrollToBottom([messages, isLoading]);
```

### Desafio 5: Mensagens de Pedagogia

**Problema**: Algumas mensagens são automáticas do sistema ("Pédagogie"), não de usuários reais.

**Solução**:
- ID negativo (-1) para mensagens de pedagogia
- Não marcar como lida
- Estilização diferenciada
- Autor exibido como "Pédagogie"

```typescript
if (messageId > 0) {
  markAsRead(messageId); // Ignora pedagogia
}
```

### Desafio 6: Cache Performático para API Legada

**Problema**: A API backend é um sistema legado que serve múltiplos frontends (web, mobile, admin). Não foi projetada para alta performance no frontend, e algumas respostas são lentas. Precisávamos criar uma experiência fluida sem modificar o backend.

**Solução**: Implementação de uma **estratégia de cache sofisticada** com React Query, fazendo a aplicação parecer instantânea mesmo com API lenta.

```
┌─────────────────────────────────────────────────────────────┐
│                    Cache Strategy                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   React Query                        │    │
│  │                                                      │    │
│  │  staleTime: 5-10 min   → Dados "frescos" por X min  │    │
│  │  gcTime: 30 min        → Mantém em memória          │    │
│  │  refetchOnMount: false → Não refetch desnecessário  │    │
│  │  placeholderData       → Mostra dados anteriores    │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │  Missions   │   │  Messages   │   │   Etapes    │       │
│  │ stale: 10m  │   │ stale: 30s  │   │ stale: 5m   │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Estratégias implementadas**:

```typescript
// Dados que mudam pouco (missões, etapes)
const missionsQuery = useQuery({
  queryKey: ['missions', userId],
  queryFn: () => fetchMissions(userId),
  staleTime: 10 * 60 * 1000,      // 10 minutos "fresh"
  gcTime: 30 * 60 * 1000,         // 30 min em memória
  refetchOnWindowFocus: false,    // Não refetch ao focar
  refetchOnMount: false,          // Usa cache se disponível
});

// Dados que mudam frequentemente (mensagens)
const messagesQuery = useQuery({
  queryKey: ['messages', etapeId],
  queryFn: () => fetchMessages(etapeId),
  staleTime: 30 * 1000,           // 30 segundos "fresh"
  refetchInterval: 60 * 1000,     // Polling a cada 1 min
  placeholderData: previousData,  // Mostra dados antigos enquanto carrega
});

// Prefetch inteligente
const prefetchNextEtape = (nextEtapeId) => {
  queryClient.prefetchQuery({
    queryKey: ['messages', nextEtapeId],
    queryFn: () => fetchMessages(nextEtapeId),
  });
};
```

**Técnicas avançadas**:

| Técnica | Implementação | Benefício |
|---------|---------------|-----------|
| **Stale-While-Revalidate** | `placeholderData` + background refetch | UI instantânea |
| **Cache Persistence** | Dados em memória por 30min | Navegação zero-latency |
| **Smart Invalidation** | Invalida apenas queries afetadas | Menos requisições |
| **Prefetching** | Carrega próxima etape antecipadamente | Transições suaves |
| **Optimistic Updates** | Atualiza UI antes do servidor | Sensação de tempo real |

**Resultados**:
- **Primeira carga**: ~500ms (API lenta)
- **Navegação subsequente**: < 50ms (cache hit)
- **Envio de mensagem**: Instantâneo (optimistic update)
- **Troca de etapa**: ~100ms (prefetch + cache)

**Benefícios**:
- **Zero modificações no backend** - Frontend resolve o problema de performance
- **UX premium** - Aplicação parece nativa/instantânea
- **Economia de bandwidth** - Menos requisições duplicadas
- **Resiliência** - App funciona bem mesmo com conexão instável

---

## Tecnologias Utilizadas

### Core Framework

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **React** | 18.3 | Biblioteca UI com concurrent features |
| **TypeScript** | 5.5 | Tipagem estática para maior segurança |
| **Vite** | 6.2 | Build tool rápido com HMR instantâneo |

### Roteamento & Estado

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Router** | 7.4 | Navegação SPA com rotas protegidas |
| **TanStack Query** | 5.67 | Cache de dados do servidor, mutations |

### Autenticação

| Tecnologia | Uso |
|------------|-----|
| **js-cookie** | Gestão de JWT em cookies |
| **jwt-decode** | Decodificação de tokens para expiração |

### Mídia & UI

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Player** | 2.16 | Player de vídeo com controles |
| **date-fns** | 4.1 | Formatação de datas |
| **uuid** | 11.0 | Geração de IDs únicos |

### Desenvolvimento & Testes

| Tecnologia | Uso |
|------------|-----|
| **Vitest** | Testes unitários e integração |
| **Testing Library** | Testes de componentes React |
| **Storybook** | Documentação visual de componentes |
| **ESLint (Airbnb)** | Linting rigoroso |
| **Prettier** | Formatação de código |
| **Stylelint** | Linting de CSS |

### Diagrama de Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND STACK                            │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    React 18.3                          │  │
│  │              (Concurrent Features)                     │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │   Router    │   │React Query  │   │   Vite      │       │
│  │    v7.4     │   │   v5.67     │   │   v6.2      │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   TypeScript 5.5                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Linhas de código TypeScript/TSX | ~4.161 |
| Componentes React | 13 |
| Hooks customizados | 5 |
| Páginas | 6 |
| Arquivos de serviço | 1 |
| Tipos/DTOs | 5+ |

---

## Competências Demonstradas

### Frontend Development
- React 18 com hooks avançados
- TypeScript com tipagem rigorosa
- Estado do servidor com React Query
- Roteamento com React Router v7

### Arquitetura Frontend
- Separação de concerns (hooks/components)
- Custom hooks reutilizáveis
- Interceptors para API calls
- Gestão de autenticação complexa

### Performance & Cache
- **Optimistic Updates** para UX instantânea
- **Stale-While-Revalidate** strategy
- Cache inteligente com React Query
- Prefetching para navegação zero-latency
- Otimização de API legada sem modificar backend

### UX/UI
- Design mobile-first
- Upload de mídia com preview
- Auto-scroll em chat
- Feedback visual de estados
- Sensação de aplicação nativa/instantânea

### Integração
- Consumo de API REST
- Autenticação JWT
- Upload de arquivos
- Adaptação a API legada multi-frontend

---

## Conclusão

O projeto Tuto-Mission demonstra capacidade de:

1. **Desenvolver aplicações mobile-first** com React e TypeScript
2. **Implementar sistemas de autenticação** com refresh automático
3. **Criar interfaces de chat** com suporte a mídia e envio instantâneo
4. **Otimizar performance** com cache inteligente e optimistic updates
5. **Adaptar-se a APIs legadas** criando experiência premium no frontend
6. **Aplicar patterns** de arquitetura frontend moderna

A aplicação está em produção, sendo utilizada por tuteurs e apprenants no acompanhamento pedagógico. A estratégia de cache faz a navegação parecer instantânea, mesmo consumindo uma API legada compartilhada com outros frontends.

---

**Tecnologias**: React, TypeScript, Vite, React Query, React Router, React Player

**Período**: 8 meses (Março - Outubro 2025)
