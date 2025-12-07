# LBR-BO - Back Office de Gestão de Widgets IA

**Desenvolvedor**: Gregory Praxedes
**Período**: 2024 - 2025
**Papel**: Desenvolvedor Frontend Principal
**Design UI/UX**: Gregory Praxedes (criação própria)

---

## Sumário Executivo

Aplicação React TypeScript de enterprise-grade para gerenciamento de widgets de chat com IA. Dashboard administrativo completo com formulários multi-step, tabelas avançadas, sistema de controle de qualidade, e gestão de referências (bases de conhecimento). Interface totalmente em francês com design system profissional.

### Impacto
- Gestão centralizada de todos os widgets de IA
- Sistema de controle de qualidade para validação de respostas
- Gerenciamento de bases de conhecimento (referentials)
- Interface administrativa para múltiplos tenants
- Formulários complexos com validação em tempo real

---

## Descrição do Projeto

### Contexto de Negócio
La Bonne Réponse (LBR) precisa de uma interface administrativa para que equipes internas e administradores de tenants possam configurar widgets de chat, gerenciar bases de conhecimento, e monitorar a qualidade das respostas da IA.

### O Problema

A gestão manual apresentava:

- **Configuração complexa** - Widgets têm dezenas de parâmetros configuráveis
- **Sem controle de qualidade** - Respostas da IA não eram validadas sistematicamente
- **Bases de conhecimento dispersas** - Documentos e URLs em diferentes locais
- **Falta de visibilidade** - Administradores não conseguiam monitorar conversas
- **Processo manual** - Criação de widgets demorava horas

### Desafio Técnico
Criar um back office que:
- Simplifique a criação de widgets com formulário guiado
- Permita validação de qualidade das respostas da IA
- Centralize gestão de bases de conhecimento
- Ofereça tabelas com filtros, paginação e ordenação
- Mantenha design system consistente e profissional

---

## Solução Implementada

### Visão Geral
Desenvolvimento de um **dashboard administrativo** que:

1. **Guia** criação de widgets com formulário de 7 passos
2. **Valida** qualidade de respostas com pontos de verificação
3. **Centraliza** gestão de documentos e URLs permitidas
4. **Oferece** tabelas avançadas para todas as entidades

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                         LBR-BO                                   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  React 18 + TypeScript                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │    Pages     │  │  Components  │  │      Hooks       │  │ │
│  │  │              │  │              │  │                  │  │ │
│  │  │ • Widgets    │  │ • DataTable  │  │ • useWidgets     │  │ │
│  │  │ • QC List    │  │ • Forms      │  │ • useQC          │  │ │
│  │  │ • Referent.  │  │ • Dialogs    │  │ • useReferent.   │  │ │
│  │  │ • Users      │  │ • Accordion  │  │ • useAuth        │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ React Query  │    │  React Hook  │    │  TanStack    │      │
│  │   (Cache)    │    │    Form      │    │    Table     │      │
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
| **WidgetListPage** | Lista e CRUD de widgets |
| **AddWidgetPage** | Formulário multi-step (7 passos) |
| **EditWidgetPage** | Editor com seções em accordion |
| **QualityControlListPage** | Lista de controles de qualidade |
| **QualityControlPage** | Detalhes e pontos de QC |
| **ReferentialListPage** | Lista de bases de conhecimento |
| **ReferentialPage** | Documentos e URLs |
| **UserListPage** | Gestão de usuários |
| **TenantListPage** | Gestão de tenants |

### Funcionalidades Implementadas

**Gestão de Widgets (CRUD Completo)**
- Formulário de criação com 7 passos guiados
- Editor com seções salváveis independentemente
- Upload de logo e ícone do botão
- Configuração de 4 cores customizáveis
- Mensagens de saudação e disclaimer
- Integração com Chatbase/Ragflow

**Sistema de Controle de Qualidade**
- Criar controles com múltiplos pontos
- Cada ponto: pergunta + resposta esperada
- Importar pontos via CSV/Excel
- Status lifecycle (Draft → In Progress → Success/Error)
- Associação QC-Widget (M2M)

**Gestão de Referências (Knowledge Base)**
- CRUD de bases de conhecimento
- Upload de documentos (PDF, etc)
- Gestão de URLs permitidas
- Gestão de URLs bloqueadas (blacklist)
- Associação Referential-Widget

**Tabelas Avançadas**
- Sorting multi-coluna
- Filtros por campo
- Paginação configurável (5, 10, 25, 50)
- Seleção múltipla de linhas
- Ações em batch (delete)
- Loading skeleton states

**Sistema de Autenticação**
- Login com JWT
- Refresh automático de token
- Roles: SUPER_ADMIN, TENANT_ADMIN
- Protected routes por role

---

## Design Patterns Implementados

### 1. Multi-Step Form Pattern (7 Passos)

**Problema**: Criar widget requer muitos campos. Um formulário único é intimidante.

**Solução**: Stepper com validação por etapa e Context para estado.

```
┌─────────────────────────────────────────────────────────────┐
│                  Widget Creation Flow                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              AddWidgetFormContext                    │    │
│  │         (Estado global do formulário)               │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│     ┌─────────┬─────────┬┴───────┬─────────┬─────────┐      │
│     ▼         ▼         ▼        ▼         ▼         ▼      │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐      │
│  │Step │  │Step │  │Step │  │Step │  │Step │  │Step │      │
│  │ 1   │  │ 2   │  │ 3   │  │ 4   │  │ 5   │  │ 6-7 │      │
│  │Info │  │Logo │  │Color│  │Disc │  │Welc │  │Integ│      │
│  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘      │
│                                                              │
│  Features:                                                   │
│  • Validação Zod por step                                   │
│  • hasStepErrors(stepIndex)                                 │
│  • nextStep() valida antes de avançar                       │
│  • Upload de logo com preview                               │
│  • Estado em memória até submit final                       │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **UX melhorada**: Processo guiado e menos intimidante
- **Validação progressiva**: Erros corrigidos antes de avançar
- **Preview**: Usuário vê resultado antes de submeter

### 2. Section-Based Editing Pattern

**Problema**: Editar widget completo de uma vez é arriscado e lento.

**Solução**: Accordion com seções salváveis independentemente.

```
┌─────────────────────────────────────────────────────────────┐
│                  Widget Edit Flow                            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │             EditWidgetFormContext                    │    │
│  │        (Estado por seção + track changes)           │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Accordion                         │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Section: Informations           [Save]      │    │    │
│  │  │   - Title                                   │    │    │
│  │  │   - Tenant                                  │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Section: Cores                  [Save]      │    │    │
│  │  │   - Primary, Secondary, Tertiary, Icon     │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │ Section: Disclaimer             [Save]      │    │    │
│  │  │   - Enabled toggle                          │    │    │
│  │  │   - Message (if enabled)                    │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  │                                                      │    │
│  │  ... mais seções                                    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Features:                                                   │
│  • updateSection('colors') salva apenas cores              │
│  • hasChanges(section) track modifications                 │
│  • Preview atualizado após cada save                        │
│  • Spinner de loading por seção                            │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Segurança**: Alterações isoladas
- **Performance**: Requisições menores
- **UX**: Feedback imediato por seção

### 3. DataTable Composition Pattern

**Problema**: Tabelas complexas com muitas funcionalidades misturadas.

**Solução**: Componentes compostos com TanStack Table.

```
┌─────────────────────────────────────────────────────────────┐
│                    DataTable Structure                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   <DataTable>                        │    │
│  │               (TanStack Table wrapper)               │    │
│  │                                                      │    │
│  │   <DataTableToolbar>                                │    │
│  │     ├── <DataTableSearch />                         │    │
│  │     ├── <DataTableFilters />                        │    │
│  │     ├── <DataTableAddButton />                      │    │
│  │     └── <DataTableDeleteButton />                   │    │
│  │                                                      │    │
│  │   <DataTableContent onRowClick={...} />             │    │
│  │     ├── Headers with sorting                        │    │
│  │     ├── Rows with selection                         │    │
│  │     └── Skeleton loading states                     │    │
│  │                                                      │    │
│  │   <DataTablePagination />                           │    │
│  │     ├── Page size selector (5, 10, 25, 50)         │    │
│  │     ├── Page navigation                             │    │
│  │     └── Row count display                           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Uso**:
```typescript
const columns = useWidgetColumns({ onDelete })

<DataTable columns={columns} data={widgets}>
  <DataTableToolbar>
    <DataTableSearch placeholder="Rechercher..." />
    <DataTableAddButton onClick={() => navigate('/add')} />
  </DataTableToolbar>
  <DataTableContent onRowClick={(row) => navigate(`/edit/${row.id}`)} />
</DataTable>
```

**Benefícios**:
- **Composição**: Monta tabela como Lego
- **Reutilização**: Mesmo pattern em todas as páginas
- **Flexibilidade**: Toolbar customizável por contexto

### 4. Query Cascade Invalidation Pattern

**Problema**: Criar widget invalida várias queries relacionadas.

**Solução**: Função central que invalida em cascata.

```
┌─────────────────────────────────────────────────────────────┐
│                  Cache Invalidation Flow                     │
│                                                              │
│  Mutation: createWidget()                                    │
│       │                                                      │
│       ▼                                                      │
│  onSuccess:                                                  │
│       │                                                      │
│       ▼                                                      │
│  refetchAllWidgetData(newWidgetId)                          │
│       │                                                      │
│       ├──▶ invalidate(['widgets'])                          │
│       ├──▶ invalidate(['widget', newWidgetId])              │
│       ├──▶ invalidate(['widget-integrations', newWidgetId]) │
│       ├──▶ invalidate(['conversations', newWidgetId])       │
│       ├──▶ invalidate(['tenants'])                          │
│       └──▶ invalidate(['referentials'])                     │
│                                                              │
│  Resultado: Toda a UI atualizada automaticamente            │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Consistência**: Dados sempre atualizados
- **Centralização**: Uma função para todas as invalidações
- **Performance**: Invalida apenas queries afetadas

### 5. Conditional Validation Pattern (Zod)

**Problema**: Campos condicionalmente obrigatórios (se X, então Y required).

**Solução**: Zod refinements dinâmicos.

```typescript
// widget.schema.ts
const createWidgetFormSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  disclaimer_enabled: z.boolean(),
  disclaimer_message: z.string().optional(),

  // Chatbase integration
  chatbase_chatbot_id: z.string().optional(),
  chatbase_token: z.string().optional(),

  // Ragflow integration
  ragflow_assistant_id: z.string().optional(),
  ragflow_pre_prompt: z.string().optional(),
})
.refine((data) => {
  // Se disclaimer ativo, mensagem obrigatória
  if (data.disclaimer_enabled && !data.disclaimer_message) {
    return false;
  }
  return true;
}, {
  message: t('validation.disclaimerRequired'),
  path: ['disclaimer_message']
})
.refine((data) => {
  // Se Chatbase, ambos campos obrigatórios
  if (data.chatbase_chatbot_id && !data.chatbase_token) {
    return false;
  }
  return true;
}, {
  message: t('validation.chatbaseTokenRequired'),
  path: ['chatbase_token']
});
```

**Benefícios**:
- **Validação dinâmica**: Regras complexas expressas claramente
- **Type-safe**: TypeScript infere tipos corretos
- **i18n**: Mensagens traduzidas

### 6. Context + Hooks Pattern

**Problema**: Estado de formulário complexo precisa ser compartilhado.

**Solução**: Context para estado global + hooks para lógica.

```
┌─────────────────────────────────────────────────────────────┐
│                  State Management Flow                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              AddWidgetFormProvider                   │    │
│  │                                                      │    │
│  │   • React Hook Form instance                        │    │
│  │   • currentStep state                               │    │
│  │   • validation functions                            │    │
│  │   • submit mutation                                 │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              useAddWidgetForm() hook                 │    │
│  │                                                      │    │
│  │   • register, watch, formState                      │    │
│  │   • nextStep, prevStep, goToStep                    │    │
│  │   • hasStepErrors, submitForm                       │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │   Step1     │   │   Step2     │   │   Step3     │       │
│  │  Component  │   │  Component  │   │  Component  │       │
│  │             │   │             │   │             │       │
│  │ Uses hook   │   │ Uses hook   │   │ Uses hook   │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Encapsulamento**: Lógica isolada no Context
- **Reusabilidade**: Hook usado em todos os steps
- **Testabilidade**: Context pode ser mockado

---

## Decisões Técnicas e Trade-offs

### 1. TanStack Table vs ag-Grid

**Decisão**: TanStack Table

**Motivos**:
- Headless (controle total sobre UI)
- Open source (sem licença)
- Bundle menor
- Integra bem com React Query

**Trade-off**: Mais trabalho de implementação inicial

### 2. React Hook Form vs Formik

**Decisão**: React Hook Form + Zod

**Motivos**:
- Performance (menos re-renders)
- Integração nativa com Zod
- API mais simples
- Melhor TypeScript support

**Trade-off**: Zod tem curva de aprendizado

### 3. Context API vs Zustand/Redux

**Decisão**: Context API para formulários

**Motivos**:
- Escopo limitado (só formulários)
- Não precisa de lib externa
- Suficiente para o caso de uso
- React Query já gerencia server state

**Trade-off**: Menos features que Zustand

### 4. Radix UI + shadcn vs Material UI

**Decisão**: Radix UI + shadcn/ui

**Motivos**:
- Primitives acessíveis sem styling imposto
- Controle total sobre aparência
- Bundle mais leve
- Design system customizável

**Trade-off**: Mais trabalho de styling inicial

### 5. Tailwind CSS v4 vs CSS Modules

**Decisão**: Tailwind CSS v4

**Motivos**:
- Produtividade aumentada
- Design system built-in
- Purge automático
- Ecossistema rico

**Trade-off**: Classes verbosas no JSX

---

## Desafios e Soluções

### Desafio 1: Formulário de 7 Passos com Validação

**Problema**: Widget tem 20+ campos. Formulário único é intimidante e propenso a erros.

**Solução**:
- Stepper visual com progresso
- Validação Zod por step
- Context mantém estado entre steps
- Preview antes de submit

```typescript
// AddWidgetFormContext
const nextStep = useCallback(async () => {
  // Valida campos do step atual
  const isValid = await trigger(getFieldsForStep(currentStep));

  if (isValid) {
    setCurrentStep(prev => prev + 1);
  }
}, [currentStep, trigger]);

const hasStepErrors = useCallback((stepIndex: number) => {
  const fields = getFieldsForStep(stepIndex);
  return fields.some(field => errors[field]);
}, [errors]);
```

### Desafio 2: Upload de Imagens com Preview

**Problema**: Usuário precisa ver logo antes de salvar.

**Solução**:
- react-dropzone para drag & drop
- FileReader para preview local
- Estado separado para preview vs saved
- Cleanup ao descartar

```typescript
// LogoUpload component
const onDrop = useCallback((acceptedFiles: File[]) => {
  const file = acceptedFiles[0];

  // Preview local imediato
  const reader = new FileReader();
  reader.onload = (e) => {
    setPreviewUrl(e.target?.result as string);
  };
  reader.readAsDataURL(file);

  // Salva file para upload posterior
  setLogoFile(file);
}, []);
```

### Desafio 3: Import de QC Points via Excel

**Problema**: Criar dezenas de pontos de qualidade manualmente é tedioso.

**Solução**:
- Suporte a CSV e Excel
- Parsing com fast-csv/ExcelJS (backend)
- Validação de formato
- Feedback de erros por linha

```typescript
// useQualityControlPoints hook
const importMutation = useMutation({
  mutationFn: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return QualityControlPointService.import(qcId, formData);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['qc-points', qcId]);
    toast.success(t('qc.importSuccess'));
  },
  onError: (error) => {
    toast.error(t('qc.importError'), {
      description: error.message
    });
  }
});
```

### Desafio 4: Edição de Widget por Seções

**Problema**: Salvar widget inteiro a cada pequena mudança é lento e arriscado.

**Solução**:
- Accordion com seções independentes
- Cada seção tem botão "Save"
- Track changes por seção
- API PATCH para updates parciais

```typescript
// EditWidgetFormContext
const updateSection = useCallback(async (section: string) => {
  setSectionLoading(section, true);

  const sectionFields = getSectionFields(section);
  const sectionData = watch(sectionFields);

  try {
    await WidgetService.updateWidget(widgetId, sectionData);
    toast.success(t('widget.sectionUpdated'));
    triggerPreviewReload();
  } finally {
    setSectionLoading(section, false);
  }
}, [widgetId, watch]);
```

### Desafio 5: Validação de Title Único

**Problema**: Title de widget deve ser único. Validar a cada keystroke é custoso.

**Solução**:
- Validação apenas em onBlur ou submit
- Query separada para verificar unicidade
- Debounce para evitar spam

```typescript
// widget.schema.ts
const validateTitleUniqueness = async (title: string, currentId?: string) => {
  const widgets = await WidgetService.getAllWidgets();
  const exists = widgets.some(w =>
    w.title === title && w.id !== currentId
  );

  if (exists) {
    throw new Error(t('validation.titleExists'));
  }
};

// No submit
const onSubmit = async (data: FormData) => {
  await validateTitleUniqueness(data.title, widgetId);
  // ... resto do submit
};
```

### Desafio 6: Cache Invalidation em Cascata

**Problema**: Criar widget afeta múltiplas queries (lista, tenant, referentials).

**Solução**:
- Função central de invalidation
- Invalida todas queries relacionadas
- Ordem correta (parent antes de child)

```typescript
// useWidgets hook
const refetchAllWidgetData = async (widgetId?: string) => {
  await queryClient.invalidateQueries({ queryKey: ['widgets'] });

  if (widgetId) {
    await queryClient.invalidateQueries({ queryKey: ['widget', widgetId] });
    await queryClient.invalidateQueries({ queryKey: ['integrations', widgetId] });
    await queryClient.invalidateQueries({ queryKey: ['conversations', widgetId] });
  }

  // Related entities
  await queryClient.invalidateQueries({ queryKey: ['tenants'] });
  await queryClient.invalidateQueries({ queryKey: ['referentials'] });
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
| **Radix UI** | Latest | 15+ primitives acessíveis |
| **shadcn/ui** | Latest | Componentes pré-estilizados |
| **Lucide React** | 0.485.0 | Ícones |
| **class-variance-authority** | 0.7.1 | Variants |
| **tailwind-merge** | 3.0.2 | Merge de classes |

### Forms & Validation

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Hook Form** | 7.55.0 | Gestão de forms |
| **Zod** | 3.24.2 | Validação de schemas |
| **@hookform/resolvers** | 4.1.3 | Integração |

### Data Management

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **TanStack React Query** | 5.71.1 | Server state |
| **TanStack React Table** | 8.21.2 | Tabelas avançadas |

### Routing & Auth

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React Router** | 6.27.0 | Navegação |
| **js-cookie** | 3.0.5 | Cookies |
| **jwt-decode** | 4.0.0 | JWT parsing |

### i18n

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **react-i18next** | 15.4.1 | Internacionalização |
| **i18next** | 23.7.6 | Core i18n |

### Notifications & Upload

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Sonner** | 2.0.2 | Toast notifications |
| **react-dropzone** | 14.3.8 | File upload |

### Markdown

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **react-markdown** | 10.1.0 | Render markdown |
| **remark-gfm** | 4.0.1 | GitHub markdown |
| **rehype-katex** | 7.0.1 | Math formulas |

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
│  │  Styling   │        │   State    │          │   Forms    │  │
│  │            │        │            │          │            │  │
│  │ Tailwind 4 │        │ React Query│          │ RHF + Zod  │  │
│  │ Radix UI   │        │ Context    │          │            │  │
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
| Linhas de código TypeScript/TSX | ~32.000 |
| Arquivos TypeScript/TSX | 293 |
| Componentes (features) | 46 |
| Páginas | 17 |
| Hooks customizados | 18 |
| Serviços API | 8 |
| Componentes UI (shadcn) | 34 |
| Contextos complexos | 2 |
| Schemas Zod | 1+ validações |

---

## Competências Demonstradas

### Design UI/UX
- **Criação completa do design** administrativo
- Formulários multi-step intuitivos
- Design system consistente
- Feedback visual em todas as ações

### Arquitetura Frontend
- Componentes compostos (DataTable)
- Context + Hooks pattern
- Cache invalidation em cascata
- Separação de concerns

### Forms Avançados
- React Hook Form + Zod
- Validação condicional
- Upload com preview
- Multi-step com validação por etapa

### Tabelas Complexas
- TanStack Table headless
- Sorting, filtering, pagination
- Seleção e ações em batch
- Loading states

### TypeScript Avançado
- Schemas Zod com inferência
- Generics em hooks
- Strict mode
- DTOs tipados

### Performance
- React Query caching
- Code splitting por rota
- Lazy loading
- Bundle optimization

---

## Conclusão

O projeto LBR-BO demonstra capacidade de:

1. **Criar dashboards** administrativos complexos
2. **Implementar formulários** multi-step com validação
3. **Construir tabelas** avançadas com TanStack Table
4. **Gerenciar estado** com React Query e Context
5. **Desenvolver design systems** consistentes
6. **Aplicar patterns** de arquitetura frontend moderna

A aplicação está em produção, utilizada diariamente por administradores e equipes internas.

---

**Tecnologias**: React, TypeScript, Vite, Tailwind CSS, Radix UI, React Query, React Hook Form, Zod, TanStack Table

**Período**: Desenvolvimento contínuo 2024-2025
