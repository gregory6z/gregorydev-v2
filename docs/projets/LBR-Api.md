# LBR-Api - API REST Multi-Tenant para Widgets de Chat IA

**Desenvolvedor**: Gregory Praxedes (colaboração com equipe House of Coding)
**Período**: 2024 - 2025
**Papel**: Desenvolvedor Backend (desenvolvimento em equipe)

---

## Sumário Executivo

API REST robusta e multi-tenant construída com NestJS, especializada em gerenciamento de widgets de chat com IA integrados a websites externos. Sistema completo com autenticação dupla (usuários e widgets), integrações enterprise (Stripe, AWS S3, Brevo), controle de qualidade automatizado e documentação Swagger completa.

### Impacto
- Gestão centralizada de múltiplos tenants isolados
- Autenticação dupla (usuários corporativos + widgets embarcados)
- Integrações com Chatbase/Ragflow para IA conversacional
- Sistema de controle de qualidade para validação de respostas
- Processamento de pagamentos Stripe com webhooks

---

## Descrição do Projeto

### Contexto de Negócio
La Bonne Réponse (LBR) oferece widgets de chat com IA que podem ser embarcados em qualquer website. Empresas (tenants) precisam gerenciar seus widgets, bases de conhecimento, e monitorar a qualidade das respostas da IA.

### O Problema

O mercado apresentava:

- **Falta de isolamento** - Soluções existentes não separavam dados entre clientes
- **Autenticação complexa** - Widgets precisam de tokens diferentes de usuários
- **Sem controle de qualidade** - Respostas da IA não eram validadas
- **Integrações fragmentadas** - Pagamentos, emails, storage em sistemas diferentes
- **Escalabilidade limitada** - APIs não suportavam crescimento de clientes

### Desafio Técnico
Criar uma API que:
- Suporte multi-tenancy com isolamento completo de dados
- Implemente autenticação dupla (JWT para usuários e widgets)
- Integre com múltiplos serviços externos (Stripe, AWS, Brevo, Chatbase)
- Valide qualidade de respostas automaticamente
- Mantenha documentação Swagger atualizada automaticamente

---

## Solução Implementada

### Visão Geral
Desenvolvimento de uma **API REST modular** que:

1. **Isola** dados por tenant com validação em cada requisição
2. **Autentica** usuários e widgets com JWT secrets diferentes
3. **Integra** serviços externos de forma padronizada
4. **Valida** qualidade de respostas da IA automaticamente

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                         LBR-API                                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   NestJS 10 + TypeScript                    │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │  Controllers │  │   Services   │  │     Guards       │  │ │
│  │  │              │  │              │  │                  │  │ │
│  │  │ • Users      │  │ • UserSvc    │  │ • AuthGuard      │  │ │
│  │  │ • Widgets    │  │ • WidgetSvc  │  │ • RoleGuard      │  │ │
│  │  │ • Chat       │  │ • ChatSvc    │  │ • ThrottleGuard  │  │ │
│  │  │ • QC         │  │ • QCSvc      │  │ • WidgetGuard    │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │   TypeORM    │    │    Stripe    │    │   AWS S3     │      │
│  │   (MySQL)    │    │  (Payments)  │    │  (Storage)   │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│                              │                                   │
│          ┌───────────────────┼───────────────────┐              │
│          ▼                   ▼                   ▼              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │    Brevo     │    │  Chatbase/   │    │   Winston    │      │
│  │   (Email)    │    │   Ragflow    │    │   (Logs)     │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

### Módulos Principais

| Módulo | Responsabilidade |
|--------|------------------|
| **Users** | Autenticação, CRUD, ativação, reset de senha |
| **Widgets** | Configuração de widgets, cores, mensagens |
| **Widget Integrations** | Instâncias de widgets em sites específicos |
| **Chat** | Mensagens, arquivos, integração com IA |
| **Referentials** | Base de conhecimento, documentos, URLs |
| **Quality Control** | Pontos de validação, status, testes |
| **Payments** | Webhooks Stripe, produtos por tenant |
| **Files** | Upload/download S3, presigned URLs |

### Funcionalidades Implementadas

**Sistema de Multi-Tenancy**
- Isolamento completo de dados por tenant
- JWT validado com tenant_id
- CORS dinâmico baseado em widget integrations
- Produtos Stripe separados por tenant

**Autenticação Dupla**
- JWT para usuários (admin, portal user)
- JWT para widgets (integrations)
- Refresh tokens automático
- Tokens de ativação e reset de senha

**Gestão de Widgets**
- Configurações visuais (4 cores customizáveis)
- Logo e ícone do botão
- Mensagens de saudação e disclaimer
- Integração Google Analytics
- API de Learning (Chatbase/Ragflow)

**Sistema de Referências**
- Upload de documentos (PDF, etc)
- URLs permitidas e bloqueadas
- Crawling automático configurável
- Associação widget-referência M2M

**Controle de Qualidade**
- Pontos de verificação com perguntas/respostas esperadas
- Status com lifecycle (Draft → In Progress → Success/Error)
- Validação automática via ChatService
- Associações QC-Widget M2M

**Integração Stripe**
- Webhook handling com validação de assinatura
- Eventos: charge.succeeded, subscription.updated
- Customer management por usuário
- Produtos configurados por tenant

---

## Design Patterns Implementados

### 1. Multi-Layer Authentication Pattern

**Problema**: Dois tipos de usuários (humanos e widgets) com diferentes níveis de acesso.

**Solução**: Guards em cascata com verificação sequencial.

```
┌─────────────────────────────────────────────────────────────┐
│                  Authentication Flow                         │
│                                                              │
│  Request                                                     │
│     │                                                        │
│     ▼                                                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         CustomThrottlerGuard                         │    │
│  │         (Rate Limiting - 100 req/min)               │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │       CustomDefaultAuthenticationGuard              │    │
│  │    (Tenta JWT de usuário, depois de widget)         │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│         ┌─────────────────┴─────────────────┐               │
│         ▼                                   ▼               │
│  ┌─────────────┐                   ┌─────────────┐         │
│  │    User     │                   │   Widget    │         │
│  │   Routes    │                   │   Routes    │         │
│  │             │                   │             │         │
│  │ RoleGuard   │                   │ IntegGuard  │         │
│  └─────────────┘                   └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Flexibilidade**: Suporta dois tipos de autenticação
- **Segurança**: Guards específicos por tipo de recurso
- **Extensibilidade**: Fácil adicionar novos tipos

### 2. Modular Architecture Pattern

**Problema**: Código monolítico dificulta manutenção e testes.

**Solução**: 37 módulos independentes com injeção de dependência.

```
┌─────────────────────────────────────────────────────────────┐
│                   Module Structure                           │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   AppModule                          │    │
│  │              (Root - imports all)                    │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│     ┌─────────────────────┼─────────────────────┐           │
│     ▼                     ▼                     ▼           │
│  ┌────────┐         ┌────────┐           ┌────────┐        │
│  │ Users  │         │Widgets │           │  Chat  │        │
│  │ Module │         │ Module │           │ Module │        │
│  │        │         │        │           │        │        │
│  │ ├─DTO  │         │ ├─DTO  │           │ ├─DTO  │        │
│  │ ├─Entity│        │ ├─Entity│          │ ├─Svc  │        │
│  │ ├─Ctrl │         │ ├─Ctrl │           │ └─Ctrl │        │
│  │ └─Svc  │         │ └─Svc  │           │        │        │
│  └────────┘         └────────┘           └────────┘        │
│                                                              │
│  Cada módulo: DTO, Entity, Controller, Service, Spec        │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Isolamento**: Módulos independentes
- **Testabilidade**: Mocks fáceis via DI
- **Manutenção**: Alterações localizadas

### 3. Decorator Pattern (Cross-Cutting Concerns)

**Problema**: Lógica repetitiva em controllers (auth, validation, response).

**Solução**: Decoradores customizados para concerns transversais.

```typescript
// Decoradores implementados
@PublicRoute()                          // Remove autenticação
@CustomAllowedUserGroups(TENANT_ADMIN)  // Restringe por role
@CustomResponseSuccessMessage('fr msg') // Mensagem de sucesso i18n
@CustomExistsIn('users', 'id')          // Valida FK existe
@CustomMatch('password', 'confirm')     // Valida campos iguais
```

**Uso em Controller**:
```typescript
@Controller('widgets')
@UseGuards(CustomUsersAuthenticationGuard, CustomUserGroupsAuthorizationGuard)
export class WidgetsController {
  @Post()
  @CustomAllowedUserGroups(UserGroupCode.tenantAdmin)
  @CustomResponseSuccessMessage('Widget créé avec succès')
  async create(@Body() dto: CreateWidgetDto) {
    return this.service.create(dto);
  }
}
```

**Benefícios**:
- **DRY**: Lógica comum centralizada
- **Legibilidade**: Intent clara no código
- **Manutenção**: Alteração em um lugar

### 4. Repository Pattern (TypeORM)

**Problema**: Queries SQL dispersas no código.

**Solução**: TypeORM com repositories injetados.

```
┌─────────────────────────────────────────────────────────────┐
│                   Data Access Layer                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    Service                           │    │
│  │   @Injectable()                                      │    │
│  │   export class UsersService {                        │    │
│  │     constructor(                                     │    │
│  │       @InjectRepository(User)                        │    │
│  │       private readonly userRepo: Repository<User>   │    │
│  │     ) {}                                             │    │
│  │   }                                                  │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │               TypeORM Repository                     │    │
│  │                                                      │    │
│  │   find(), findOne(), save(), update(), softDelete() │    │
│  └────────────────────────┬────────────────────────────┘    │
│                           │                                  │
│                           ▼                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    MySQL                             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 5. Soft Delete Pattern

**Problema**: Deletar dados perde histórico e quebra referências.

**Solução**: DeleteDateColumn com filtro automático.

```typescript
@Entity()
export class Widget {
  @DeleteDateColumn()
  deleted_at: Date;

  // Queries automaticamente filtram deleted_at IS NULL
}
```

**Benefícios**:
- **Histórico**: Dados preservados
- **Recuperação**: Possível restaurar
- **Referências**: Foreign keys intactas

---

## Decisões Técnicas e Trade-offs

### 1. NestJS vs Express Puro

**Decisão**: NestJS

**Motivos**:
- Arquitetura modular nativa
- Dependency Injection built-in
- TypeScript first-class
- Decoradores para concerns transversais
- Ecosystem rico (guards, interceptors, pipes)

**Trade-off**: Overhead inicial maior, curva de aprendizado

### 2. TypeORM vs Prisma

**Decisão**: TypeORM

**Motivos**:
- Migrations versionadas
- Suporte a soft delete nativo
- Decoradores em entities
- Mais maduro para MySQL

**Trade-off**: API mais verbosa que Prisma

### 3. JWT em Cookies vs Headers

**Decisão**: Headers (Bearer Token)

**Motivos**:
- Stateless (não precisa de session)
- Compatível com widgets cross-origin
- Dois tipos de tokens separados

**Trade-off**: Refresh token mais complexo

### 4. CORS Dinâmico vs Lista Estática

**Decisão**: CORS Dinâmico (query no banco)

**Motivos**:
- Widget integrations podem ser criadas a qualquer momento
- Hosts permitidos mudam frequentemente
- Env vars estáticas são muito limitantes

**Trade-off**: Query adicional em cada request

### 5. Soft Delete vs Hard Delete

**Decisão**: Soft Delete

**Motivos**:
- Histórico preservado
- Compliance (GDPR audit trail)
- Recuperação de dados
- Foreign keys intactas

**Trade-off**: Queries precisam filtrar, storage aumenta

---

## Desafios e Soluções

### Desafio 1: CORS Dinâmico para Widget Integrations

**Problema**: Cada widget integration tem um host diferente. Lista estática de CORS é impraticável.

**Solução**:
```typescript
// cors.config.ts
const corsOptionsDelegate = async (req, callback) => {
  const origin = req.header('Origin');

  // Verifica em widget_integrations se host é permitido
  const integration = await repository.findOne({
    where: { host: origin }
  });

  if (integration) {
    callback(null, { origin: true, credentials: true });
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};
```

### Desafio 2: Webhook Stripe com Raw Body

**Problema**: Stripe exige raw body para validar assinatura, mas NestJS parseia JSON automaticamente.

**Solução**:
```typescript
// main.ts
const app = await NestFactory.create(AppModule, { rawBody: true });

// payment.controller.ts
@Post('webhook')
@PublicRoute()
async handleWebhook(
  @RawBody() rawBody: Buffer,
  @Headers('stripe-signature') signature: string
) {
  const event = stripe.webhooks.constructEvent(
    rawBody, signature, webhookSecret
  );
  // Process event...
}
```

### Desafio 3: Rate Limiting Inteligente

**Problema**: Proteger API sem bloquear usuários legítimos.

**Solução**:
```typescript
// Custom throttler guard
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected getTracker(req: Request): string {
    // Rate limit por IP + user_id (se autenticado)
    const userId = req.user?.id || 'anonymous';
    return `${req.ip}-${userId}`;
  }
}

// Config: 100 req/min por padrão (env configurável)
```

### Desafio 4: Import em Lote de Usuários (CSV)

**Problema**: Importar centenas de usuários de uma vez com validação.

**Solução**:
```typescript
@Post('import')
@UseInterceptors(FileInterceptor('file', { limits: { fileSize: 20 * 1024 * 1024 } }))
async importUsers(@UploadedFile() file: Express.Multer.File) {
  const users = await this.parseCSV(file);

  // Validação em lote
  const errors = await this.validateBatch(users);
  if (errors.length) return { errors };

  // Insert com transaction
  return this.queryRunner.manager.transaction(async (manager) => {
    return Promise.all(users.map(u => manager.save(User, u)));
  });
}
```

### Desafio 5: Presigned URLs para S3

**Problema**: Gerar URLs temporárias para download sem expor credenciais.

**Solução**:
```typescript
// file.service.ts
async getPresignedUrl(fileId: number): Promise<string> {
  const file = await this.fileRepo.findOne(fileId);

  const command = new GetObjectCommand({
    Bucket: file.s3_bucket_title,
    Key: file.s3_path
  });

  return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
}
```

### Desafio 6: Controle de Qualidade Automatizado

**Problema**: Validar se respostas da IA estão corretas automaticamente.

**Solução**:
```typescript
// quality-control.service.ts
async runQualityCheck(qcId: number) {
  const qc = await this.qcRepo.findOne(qcId, {
    relations: ['points', 'widgetAssociations']
  });

  for (const point of qc.points) {
    // Envia pergunta para o chat
    const response = await this.chatService.sendMessage({
      widgetId: qc.widgetAssociations[0].widget_id,
      message: point.question
    });

    // Compara com resposta esperada
    const isCorrect = this.compareResponses(
      response.answer,
      point.expected_answer
    );

    await this.qcPointRepo.update(point.id, {
      status: isCorrect ? 'success' : 'error',
      actual_answer: response.answer
    });
  }
}
```

---

## Tecnologias Utilizadas

### Core Framework

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **NestJS** | 10.0.0 | Framework enterprise Node.js |
| **TypeScript** | 5.1.3 | Tipagem estática rigorosa |
| **Node.js** | 18+ | Runtime JavaScript |

### Banco de Dados

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **MySQL** | 8.0 | Banco relacional principal |
| **TypeORM** | 0.3.20 | ORM com migrations |
| **typeorm-extension** | 3.6.3 | Seeders e utilities |

### Autenticação & Segurança

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **@nestjs/jwt** | Latest | Geração/validação JWT |
| **Passport** | Latest | Framework de auth |
| **bcrypt** | 5.1.1 | Hash de senhas |
| **Helmet** | 7.1.0 | Headers de segurança |
| **@nestjs/throttler** | 6.2.1 | Rate limiting |

### Integrações Externas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Stripe** | 17.7.0 | Pagamentos e webhooks |
| **@aws-sdk/client-s3** | 3.734.0 | Storage de arquivos |
| **@aws-sdk/s3-request-presigner** | 3.738.0 | URLs assinadas |
| **@getbrevo/brevo** | 2.2.0 | Envio de emails |
| **Axios** | 1.7.7 | Cliente HTTP |

### Documentação

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **@nestjs/swagger** | 7.4.0 | OpenAPI automático |

### Logging

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Winston** | 3.14.2 | Logger profissional |
| **winston-cloudwatch** | 6.3.0 | Logs na AWS |
| **winston-daily-rotate-file** | 5.0.0 | Rotação de logs |

### Processamento de Arquivos

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **ExcelJS** | 4.4.0 | Leitura/escrita Excel |
| **fast-csv** | 5.0.2 | Parsing de CSV |

### Utilitários

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **class-validator** | 0.14.1 | Validação de DTOs |
| **class-transformer** | 0.5.1 | Transformação de dados |
| **uuid** | 11.1.0 | Geração de IDs únicos |
| **sitemap** | 8.0.0 | Geração de sitemaps |

### Diagrama de Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND STACK                               │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     NestJS 10.0                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│     ┌────────────────────────┼────────────────────────┐         │
│     ▼                        ▼                        ▼         │
│  ┌────────────┐        ┌────────────┐          ┌────────────┐  │
│  │  Security  │        │   Data     │          │   Ext.     │  │
│  │            │        │            │          │   APIs     │  │
│  │ JWT        │        │ TypeORM    │          │ Stripe     │  │
│  │ Passport   │        │ MySQL      │          │ AWS S3     │  │
│  │ Helmet     │        │ Migrations │          │ Brevo      │  │
│  │ Throttler  │        │            │          │ Chatbase   │  │
│  └────────────┘        └────────────┘          └────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    TypeScript 5.1                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     Node.js 18+                             │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Arquivos TypeScript | 373 |
| Módulos de negócio | 37 |
| Controllers | 19 |
| Services | 34 |
| Entities | 26 |
| DTOs | 101 |
| Migrações de BD | 58 |
| Métodos assíncronos | 228 |
| Decoradores customizados | 8 |
| Guards de segurança | 5 |
| Interceptadores | 2 |
| Linhas de código estimadas | ~15.000-20.000 |

---

## Competências Demonstradas

### Arquitetura Backend
- Design de APIs RESTful com NestJS
- Padrão modular com dependency injection
- Multi-tenancy com isolamento de dados
- Guards e interceptors para cross-cutting concerns

### Segurança
- Autenticação JWT dupla (usuários e widgets)
- Rate limiting configurável
- CORS dinâmico por tenant
- Headers de segurança com Helmet
- Hash de senhas com bcrypt

### Banco de Dados
- TypeORM com migrations versionadas
- Soft delete para histórico
- Relacionamentos complexos (M2M, cascade)
- Queries otimizadas

### Integrações
- Stripe webhooks com validação de assinatura
- AWS S3 com presigned URLs
- Brevo para emails transacionais
- Chatbase/Ragflow para IA

### DevOps
- Docker e docker-compose
- Winston logging com CloudWatch
- Variáveis de ambiente configuráveis

### Documentação
- Swagger/OpenAPI automático
- DTOs com decoradores de documentação
- Exemplos em todos os endpoints

---

## Conclusão

O projeto LBR-Api demonstra capacidade de:

1. **Projetar APIs** enterprise com multi-tenancy
2. **Implementar segurança** em múltiplas camadas
3. **Integrar serviços externos** de forma padronizada
4. **Manter código modular** e testável
5. **Documentar automaticamente** via Swagger
6. **Escalar horizontalmente** com arquitetura stateless

A API está em produção, servindo múltiplos tenants com widgets embarcados em diferentes websites.

---

**Tecnologias**: NestJS, TypeScript, TypeORM, MySQL, JWT, Stripe, AWS S3, Brevo, Winston

**Período**: Desenvolvimento contínuo 2024-2025
