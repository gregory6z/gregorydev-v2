# IoT Router - Camada de Abstração para Dispositivos IoT

**Desenvolvedor**: Gregory Praxedes
**Período**: Agosto - Dezembro 2025
**Papel**: Desenvolvedor Backend Principal (desenvolvimento solo)

---

## Sumário Executivo

Projeto de desenvolvimento completo de uma **camada de abstração IoT** para substituir um serviço terceirizado de gerenciamento de dispositivos. A solução permite à empresa eliminar custos recorrentes de licenciamento e ganhar controle total sobre integrações com múltiplos fabricantes de dispositivos IoT.

### Impacto
- Eliminação de custos mensais de serviço terceirizado
- Independência tecnológica total
- Arquitetura extensível para novos parceiros
- Integração bem-sucedida com aplicativo mobile legado

---

## Descrição do Projeto

### Contexto de Negócio
A Airwell é uma empresa de climatização que oferece dispositivos IoT (ar-condicionado, termostatos, sensores) controlados via aplicativo mobile. Para conectar esses dispositivos de múltiplos fabricantes, a empresa utilizava um serviço terceirizado que atuava como intermediário entre o app e as APIs dos fabricantes.

### O Problema

A dependência desse serviço terceirizado causava:

- **Custos recorrentes** - Taxas mensais de licenciamento por dispositivo conectado
- **Vendor lock-in** - Impossibilidade de customizar ou evoluir sem depender do fornecedor
- **Latência adicional** - Cada requisição passava por um servidor externo
- **Caixa preta** - Sem visibilidade de erros ou comportamento interno
- **Limitações técnicas** - Novos fabricantes dependiam do roadmap do terceiro

### Desafio Adicional
O aplicativo mobile (React Native) foi desenvolvido esperando respostas no formato específico do serviço terceirizado. Substituir esse serviço exigiria:
- Manter compatibilidade com o formato de resposta existente, OU
- Refatorar massivamente o frontend (custoso e arriscado)

---

## Solução Proposta

### Visão Geral
Desenvolver um **IoT Router** próprio - uma camada de abstração que:

1. **Conecta diretamente** às APIs dos fabricantes de dispositivos
2. **Normaliza** os diferentes formatos para uma API unificada
3. **Mantém compatibilidade** com o formato esperado pelo mobile
4. **Escala** para suportar novos fabricantes via sistema de plugins

### Arquitetura da Solução

```
┌─────────────────────────────────────────────────────────────────┐
│                        ANTES (Terceirizado)                      │
│  Mobile App → Serviço Terceiro → APIs Fabricantes               │
│      $$$         (caixa preta)                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        DEPOIS (IoT Router)                       │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────────┐  │
│  │  Mobile  │───▶│   Main   │───▶│       IoT Router         │  │
│  │   App    │    │   API    │    │  ┌────────┐ ┌────────┐   │  │
│  └──────────┘    └──────────┘    │  │Plugin A│ │Plugin B│   │  │
│                                   │  └───┬────┘ └───┬────┘   │  │
│                                   └──────┼──────────┼────────┘  │
│                                          ▼          ▼           │
│                                   ┌──────────┐ ┌──────────┐     │
│                                   │Fabricante│ │Fabricante│     │
│                                   │   API    │ │   API    │     │
│                                   └──────────┘ └──────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| **Plugin Registry** | Registro central de plugins de fabricantes |
| **Partner Plugins** | Integração específica com cada fabricante |
| **Auth Module** | OAuth 2.0 e autenticação proprietária |
| **Device Module** | CRUD e operações de dispositivos |
| **Rate Limiting** | Controle de requisições às APIs externas |
| **Scheduled Commands** | Fila de comandos agendados |

### Funcionalidades Implementadas

**Descoberta de Dispositivos**
- Listar dispositivos do usuário em cada fabricante
- Extrair metadados (modelo, firmware, localização)
- Registrar no sistema interno

**Leitura de Dados**
- Obter status atual dos dispositivos
- Ler medições (temperatura, humidade, CO2, etc.)
- Normalizar unidades e formatos

**Execução de Comandos**
- Ligar/desligar dispositivos
- Ajustar temperatura, modo, velocidade
- Comandos agendados com retry automático

**Gerenciamento de Autenticação**
- Fluxo OAuth 2.0 completo
- Refresh automático de tokens
- Criptografia de credenciais

---

## Design Patterns Implementados

### 1. Plugin Architecture Pattern

**Problema**: Cada fabricante de IoT tem APIs completamente diferentes - autenticação, endpoints, formatos de dados, comandos.

**Solução**: Sistema de plugins onde cada fabricante é um módulo isolado que implementa uma interface comum.

```
┌─────────────────────────────────────────────────────────┐
│                    Plugin Registry                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Plugin A   │  │  Plugin B   │  │  Plugin C   │     │
│  │ (Fabricante)│  │ (Fabricante)│  │ (Fabricante)│     │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│         │                │                │             │
│         └────────────────┼────────────────┘             │
│                          ▼                              │
│              ┌─────────────────────┐                   │
│              │  IPartnerPlugin     │                   │
│              │  (Interface Comum)  │                   │
│              └─────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Open/Closed Principle**: Adicionar fabricantes sem modificar código existente
- **Isolamento**: Bugs em um plugin não afetam outros
- **Testabilidade**: Cada plugin pode ser testado independentemente
- **Deploy independente**: Possibilidade de ativar/desativar plugins

### 2. Handler Pattern (Command Pattern Variant)

**Problema**: Cada plugin precisa executar operações distintas (descobrir dispositivos, ler dados, enviar comandos), cada uma com lógica complexa.

**Solução**: Separar responsabilidades em handlers especializados.

```
┌─────────────────────────────────────────────────────────┐
│                      Plugin                              │
│                  (Thin Orchestrator)                     │
│                         │                                │
│         ┌───────────────┼───────────────┐               │
│         ▼               ▼               ▼               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │  Discovery  │ │    Data     │ │   Command   │       │
│  │   Handler   │ │   Handler   │ │   Handler   │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
```

**Responsabilidades**:
- **Discovery Handler**: Encontrar dispositivos disponíveis
- **Data Handler**: Ler status e medições
- **Command Handler**: Executar ações nos dispositivos

**Benefícios**:
- **Single Responsibility**: Cada handler faz uma coisa bem
- **Reutilização**: Handlers podem compartilhar utilitários
- **Manutenibilidade**: Alterações isoladas por tipo de operação

### 3. Strategy Pattern (Autenticação)

**Problema**: Fabricantes usam métodos de autenticação diferentes - OAuth 2.0, API Keys, autenticação proprietária com assinaturas.

**Solução**: Cada plugin implementa sua própria estratégia de autenticação.

```
┌─────────────────────────────────────────────────────────┐
│              Authentication Strategies                   │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   OAuth2    │  │   Custom    │  │   API Key   │     │
│  │  Strategy   │  │  Strategy   │  │  Strategy   │     │
│  │             │  │ (Signature) │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│         │                │                │             │
│         └────────────────┼────────────────┘             │
│                          ▼                              │
│              ┌─────────────────────┐                   │
│              │   IAuthentication   │                   │
│              └─────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
```

**Benefícios**:
- **Flexibilidade**: Suporte a qualquer método de auth
- **Encapsulamento**: Complexidade de auth isolada do resto

### 4. Adapter Pattern (Normalização de Dados)

**Problema**: Cada fabricante retorna dados em formatos diferentes. O mobile espera um formato específico (do serviço terceirizado antigo).

**Solução**: Adapters transformam dados do formato do fabricante para formato normalizado.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Fabricante  │────▶│   Adapter   │────▶│  Formato    │
│   Format    │     │ (Transform) │     │ Normalizado │
└─────────────┘     └─────────────┘     └─────────────┘

Exemplo:
{ "Temperature": 22.5 }  →  { "temperatures.in": 22.5, "unit": "celsius" }
```

**Benefícios**:
- **Compatibilidade**: Mobile não precisa conhecer formatos dos fabricantes
- **Consistência**: API sempre retorna mesmo formato
- **Migração suave**: Formato compatível com sistema legado

### 5. Repository Pattern (Data Access)

**Problema**: Acesso a dados disperso, queries duplicadas, difícil de testar.

**Solução**: Entity Loaders encapsulam todo acesso a dados.

**Benefícios**:
- **Centralização**: Queries em um só lugar
- **Testabilidade**: Fácil de mockar
- **Otimização**: Queries podem ser otimizadas centralmente

### 6. Factory Pattern (Rate Limit Calculators)

**Problema**: Cada fabricante tem regras de rate limiting diferentes (por segundo, por hora, por operação, por usuário).

**Solução**: Factory cria calculadores específicos por parceiro.

**Benefícios**:
- **Flexibilidade**: Regras customizadas por fabricante
- **Extensibilidade**: Novos algoritmos sem modificar código existente

### 7. Decorator Pattern (Logging & Error Handling)

**Problema**: Logging e tratamento de erros repetidos em múltiplos lugares.

**Solução**: Interceptors e filters decoram operações automaticamente.

**Benefícios**:
- **DRY**: Lógica cross-cutting em um lugar só
- **Consistência**: Mesmo formato de log em toda aplicação

---

## Princípios Arquiteturais

### SOLID em Prática

| Princípio | Aplicação |
|-----------|-----------|
| **S**ingle Responsibility | Handlers fazem uma coisa só |
| **O**pen/Closed | Plugins adicionados sem modificar core |
| **L**iskov Substitution | Qualquer plugin pode substituir outro na interface |
| **I**nterface Segregation | Interface mínima para plugins |
| **D**ependency Inversion | Core depende de abstrações, não de plugins concretos |

### Thin Orchestrators

**Princípio**: Serviços devem ser finos (~100 linhas), delegando lógica para handlers especializados.

**Por quê**:
- Fácil de entender
- Fácil de testar
- Menos bugs
- Mais reutilização

### Configuration as Code

**Princípio**: Configuração de parceiros e dispositivos via YAML, não hardcoded.

**Implementação**:
- Schemas JSON validam YAML antes de aplicar
- Seeders idempotentes aplicam configuração
- Versionamento junto com código

**Benefícios**:
- Rastreabilidade de mudanças
- Rollback fácil
- Ambiente consistente

---

## Decisões Técnicas e Trade-offs

### 1. NestJS vs Express Puro

**Decisão**: NestJS

**Motivos**:
- Dependency Injection nativo
- Módulos organizados
- Decorators para rotas, guards, interceptors
- TypeScript first-class
- Ecosystem maduro (TypeORM, Bull, etc.)

**Trade-off**: Curva de aprendizado maior, mais "magic"

### 2. MySQL vs PostgreSQL vs MongoDB

**Decisão**: MySQL

**Motivos**:
- Compatibilidade com infraestrutura existente
- Relacionamentos fortes entre entidades
- Transações ACID para operações críticas
- Familiaridade da equipe

**Trade-off**: JSON columns menos poderosas que PostgreSQL

### 3. Redis para Rate Limiting vs In-Memory

**Decisão**: Redis

**Motivos**:
- Distribuído (múltiplas instâncias)
- Persistente (sobrevive a restarts)
- Sliding window algorithm preciso
- Reutilizado para filas (Bull)

**Trade-off**: Dependência adicional de infraestrutura

### 4. Bull Queue vs AWS SQS

**Decisão**: Bull (Redis)

**Motivos**:
- Já temos Redis
- UI de monitoramento (Bull Board)
- Retry com backoff configurável
- Menos latência que SQS

**Trade-off**: Menos escalável que SQS para volumes extremos

### 5. Criptografia de Tokens no Banco vs Vault

**Decisão**: AES-256 no banco com IV separado

**Motivos**:
- Simplicidade operacional
- Sem dependência externa
- Suficiente para o caso de uso

**Trade-off**: Menos seguro que um Vault dedicado

---

## Desafios e Soluções

### Desafio 1: APIs Heterogêneas

**Problema**: Cada fabricante tem API completamente diferente - REST vs SOAP-like, JSON vs form-data, OAuth vs tokens proprietários.

**Solução**:
- Plugin pattern isola complexidade
- Cada plugin fala a "língua" do fabricante
- Interface comum expõe operações padronizadas

### Desafio 2: Rate Limiting Complexo

**Problema**: Fabricantes têm regras elaboradas - X req/segundo por app, Y req/hora por usuário, operações com pesos diferentes.

**Solução**:
- Configuração por fabricante no banco
- Sliding window algorithm no Redis
- Métricas para ajuste fino

### Desafio 3: Compatibilidade com Frontend Legado

**Problema**: App mobile esperava formato do serviço terceirizado. Reescrever seria muito custoso.

**Solução**:
- Adapter pattern normaliza respostas
- Backend retorna formato esperado pelo mobile
- Refatoração incremental no frontend

### Desafio 4: Comandos Assíncronos

**Problema**: Comandos agendados precisam executar em horários específicos, com retry em caso de falha.

**Solução**:
- AWS EventBridge dispara no horário
- Bull Queue processa com retry exponencial
- Persistência de estado para auditoria

### Desafio 5: Debug de Integração

**Problema**: Frontend não funcionava com nova API - erros silenciosos, tipos incompatíveis.

**Solução**:
- Logging estruturado em toda cadeia
- Correção de tipos TypeScript no mobile
- Testes de integração

---

## Tecnologias Utilizadas

### Runtime & Framework

| Tecnologia | Versão | Justificativa |
|------------|--------|---------------|
| **Node.js** | 22+ | Runtime assíncrono ideal para I/O intensivo (chamadas a APIs externas) |
| **NestJS** | 10.x | Framework enterprise com DI nativo, módulos, decorators, TypeScript first-class |
| **TypeScript** | 5.x | Tipagem estática para maior segurança e manutenibilidade |

**Por que NestJS?**
- Dependency Injection facilita testes e modularização
- Estrutura opinada acelera desenvolvimento
- Ecosystem rico (TypeORM, Bull, Swagger integrados)
- Patterns enterprise (Guards, Interceptors, Pipes)

### Banco de Dados & Cache

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **MySQL** | 8.4+ | Persistência principal - relacionamentos fortes, ACID |
| **TypeORM** | 0.3.x | ORM com migrações versionadas, query builder |
| **Redis** | 7+ | Cache distribuído, rate limiting, filas |
| **ioredis** | 5.7+ | Cliente Redis robusto com reconnect automático |

**Por que MySQL sobre MongoDB?**
- Dados altamente relacionais (User → Tokens → Devices)
- Transações ACID necessárias para operações críticas
- Compatibilidade com infraestrutura existente

### Autenticação & Segurança

| Tecnologia | Uso |
|------------|-----|
| **OAuth 2.0** | Autenticação com APIs de fabricantes |
| **JWT** | Tokens de sessão interna |
| **AES-256-GCM** | Criptografia de tokens OAuth no banco |
| **CSRF State** | Proteção em fluxos OAuth |
| **class-validator** | Validação de inputs |

**Implementação de Segurança**:
- Tokens OAuth criptografados com IV único por registro
- Rate limiting por usuário e por aplicação
- Validação de todos os inputs via DTOs
- Secrets em variáveis de ambiente (nunca no código)

### Filas & Processamento Assíncrono

| Tecnologia | Uso |
|------------|-----|
| **Bull** | Filas de jobs com Redis backend |
| **BullMQ** | Processamento de comandos agendados |
| **AWS EventBridge** | Triggers de automação (cron) |

**Configuração de Retry**:
```
Tentativas: 3
Backoff: Exponencial (5s, 10s, 20s)
Persistência: Últimos 100 sucessos, 500 falhas
```

### Validação & Documentação

| Tecnologia | Uso |
|------------|-----|
| **class-validator** | Validação de DTOs |
| **class-transformer** | Transformação de dados |
| **Swagger/OpenAPI** | Documentação automática da API |
| **AJV** | Validação de schemas YAML |

### DevOps & Infraestrutura

| Tecnologia | Uso |
|------------|-----|
| **Docker** | Containerização da aplicação |
| **Docker Compose** | Orquestração local (MySQL, Redis, App) |
| **Jest** | Testes unitários e integração |
| **ESLint/Prettier** | Padronização de código |

### Bibliotecas Auxiliares

| Biblioteca | Uso |
|------------|-----|
| **@nestjs/axios** | Cliente HTTP para APIs externas |
| **js-yaml** | Parse de arquivos YAML |
| **jsonpath-plus** | Extração de dados de respostas JSON |
| **dotenv** | Variáveis de ambiente |

### Diagrama de Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      APLICAÇÃO                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    NestJS 10                         │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │    │
│  │  │Controllers│ │ Services │ │ Plugins  │            │    │
│  │  └──────────┘ └──────────┘ └──────────┘            │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │    │
│  │  │  Guards  │ │Interceptor│ │  Pipes   │            │    │
│  │  └──────────┘ └──────────┘ └──────────┘            │    │
│  └─────────────────────────────────────────────────────┘    │
│                           │                                  │
│           ┌───────────────┼───────────────┐                 │
│           ▼               ▼               ▼                 │
│     ┌──────────┐    ┌──────────┐    ┌──────────┐           │
│     │  MySQL   │    │  Redis   │    │  Bull    │           │
│     │ (TypeORM)│    │ (Cache)  │    │ (Filas)  │           │
│     └──────────┘    └──────────┘    └──────────┘           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌──────────────────────┐
              │   APIs Fabricantes   │
              │  (HTTP/REST + OAuth) │
              └──────────────────────┘
```

---

## Intervenções no Frontend

### Contexto
O aplicativo mobile (React Native) foi desenvolvido por outra equipe e herdado em estado problemático. O código apresentava sérios problemas de qualidade que dificultavam qualquer intervenção.

### Estado do Código Herdado

**Ausência de Boas Práticas**
- Código sem padrões definidos - cada arquivo seguia convenções diferentes
- Componentes monolíticos com centenas de linhas
- Mistura de lógica de negócio com UI
- Sem separação clara de responsabilidades

**Tipagem Deficiente**
- TypeScript usado de forma superficial
- Tipos `any` espalhados pelo código
- 113+ erros de compilação ignorados
- Interfaces incompletas ou inexistentes

**Código Confuso e Difícil de Manter**
- Funções com nomes genéricos (`handleData`, `processStuff`)
- Variáveis sem significado claro
- Fluxos de dados difíceis de rastrear
- Efeitos colaterais não documentados

**Debug Praticamente Impossível**
- `console.log` em produção (centenas deles)
- Erros silenciosos - falhas sem feedback
- Sem tratamento de exceções consistente
- Sem logging estruturado

**Acoplamento com Serviço Terceirizado**
- Lógica hardcoded para detectar fabricantes por strings
- OAuth flow específico para um único parceiro
- Formatos de resposta assumidos sem validação
- Nenhuma abstração - código direto contra API externa

### Problemas Específicos Encontrados

| Problema | Exemplo | Impacto |
|----------|---------|---------|
| Tipos incompatíveis | `deviceId: number` vs API retorna `string` | Erros silenciosos |
| Null vs Undefined | Campos `null` tratados como `undefined` | Crashes |
| Respostas aninhadas | `data.data.devices` não tratado | Dados perdidos |
| Detecção hardcoded | `if (name.includes('NETATMO'))` | Impossível escalar |
| Console.logs | Centenas em produção | Performance e segurança |

### Estratégia de Intervenção

Dado o estado do código, a estratégia foi **intervenção mínima e cirúrgica**:

1. **Não refatorar tudo** - Risco muito alto de quebrar funcionalidades
2. **Corrigir apenas o necessário** - Focar em erros que bloqueiam integração
3. **Normalizar no backend** - Transferir complexidade para o IoT Router
4. **Documentar problemas** - Para futura refatoração pela equipe frontend

### Correções Aplicadas

**Correção de Tipos (13 arquivos)**
```
- deviceId: number  →  deviceId: string | number
- null checks adicionados
- Extração de dados aninhados corrigida
- Interfaces atualizadas
```

**Generalização de Lógica**
```
- OAuth flow tornado genérico (não mais hardcoded)
- Remoção de detecções por string de fabricante
- Backend passou a normalizar formato de resposta
```

**Cleanup de Debug**
```
- Remoção de console.logs de arquivos modificados
- Tratamento de erros explícito onde possível
```

### Resultado

| Métrica | Antes | Depois |
|---------|-------|--------|
| Erros TypeScript | 113 | 40 (cosméticos) |
| Integração IoT | Quebrada | Funcionando |
| Console.logs (arquivos tocados) | Dezenas | 0 |

### Lições Aprendidas

1. **Código legado mal escrito multiplica esforço** - Cada correção exigia entender código confuso
2. **Normalizar no backend é mais seguro** - Menos risco que modificar frontend frágil
3. **Intervenção mínima em código problemático** - Refatoração completa seria projeto separado
4. **TypeScript só ajuda se usado corretamente** - Tipos `any` anulam benefícios

---

## Integração AWS Lambda & Comandos Agendados

### Contexto
O sistema precisa executar comandos em dispositivos IoT em horários programados (ex: "ligar ar-condicionado às 18h", "desligar às 23h"). Isso requer integração entre múltiplos serviços AWS e o IoT Router.

### Arquitetura de Agendamento

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUXO DE COMANDO AGENDADO                     │
│                                                                  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Mobile  │───▶│  Main    │───▶│   AWS    │    │          │  │
│  │   App    │    │   API    │    │EventBridge    │          │  │
│  │(agendar) │    │ (salvar) │    │  (cron)  │    │          │  │
│  └──────────┘    └──────────┘    └────┬─────┘    │          │  │
│                                       │          │          │  │
│                                       ▼          │          │  │
│                                 ┌──────────┐     │          │  │
│                                 │  Lambda  │     │          │  │
│                                 │ Function │     │          │  │
│                                 └────┬─────┘     │          │  │
│                                      │           │          │  │
│                                      ▼           │          │  │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐   │          │  │
│  │  Device  │◀───│  Plugin  │◀───│   IoT    │◀──┘          │  │
│  │(executa) │    │(processa)│    │  Router  │              │  │
│  └──────────┘    └──────────┘    │(Bull Queue)             │  │
│                                  └──────────┘              │  │
└─────────────────────────────────────────────────────────────────┘
```

### Intervenção na Lambda

**Problema Original**
A função Lambda existente foi desenvolvida para o serviço terceirizado e não funcionava com o novo IoT Router:
- Formato de payload incompatível
- Autenticação diferente
- Endpoints incorretos
- Sem retry em caso de falha

**Modificações Realizadas**

1. **Adaptação do Payload**
```
ANTES (terceirizado):
{ "device": "123", "action": "ON" }

DEPOIS (IoT Router):
{
  "deviceId": "uuid-device",
  "commands": [{ "commandKey": "power", "value": true }],
  "userId": "uuid-user"
}
```

2. **Autenticação**
- Implementação de API Key para Lambda → IoT Router
- Guard de autenticação no endpoint de scheduled commands
- Validação de origem da requisição

3. **Tratamento de Erros**
- Retry automático na Lambda (3 tentativas)
- Logging estruturado para CloudWatch
- Alertas em caso de falha persistente

### Sistema de Filas (Bull Queue)

**Por que usar fila?**
- Lambda tem timeout (15 min max)
- Comandos IoT podem ser lentos
- Necessidade de retry com backoff
- Desacoplamento entre trigger e execução

**Implementação**

```
┌─────────────────────────────────────────────────────────────┐
│                      BULL QUEUE FLOW                         │
│                                                              │
│  Lambda POST     →    Queue     →    Processor    →  Plugin │
│  /execute             (Redis)        (Worker)        Execute│
│                                                              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐       │
│  │  Resposta   │   │   Job em    │   │  Retry se   │       │
│  │  Imediata   │   │   Fila      │   │  Falhar     │       │
│  │  (202)      │   │             │   │  (3x)       │       │
│  └─────────────┘   └─────────────┘   └─────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

**Configuração do Processador**
- **Tentativas**: 3
- **Backoff**: Exponencial (5s, 10s, 20s)
- **Timeout**: 30 segundos por comando
- **Persistência**: Jobs mantidos para auditoria

### Fluxo Completo de Execução

1. **Usuário agenda comando** via app mobile
2. **Main API salva** schedule no banco + cria regra EventBridge
3. **EventBridge dispara** no horário programado
4. **Lambda recebe** trigger e chama IoT Router
5. **IoT Router enfileira** job no Bull Queue
6. **Processor pega** job da fila
7. **Plugin executa** comando no dispositivo
8. **Resultado persistido** para histórico

### Desafios Superados

| Desafio | Solução |
|---------|---------|
| Lambda timeout | Fila assíncrona com resposta imediata |
| Falhas de rede | Retry exponencial (3 tentativas) |
| Rastreabilidade | Job IDs persistidos, logs estruturados |
| Autenticação Lambda | API Key + Guard dedicado |
| Formato incompatível | Adapter no endpoint de scheduled |

### Monitoramento

**Bull Board UI**
- Visualização de jobs na fila
- Status: waiting, active, completed, failed
- Retry manual de jobs falhos
- Métricas de processamento

**CloudWatch (Lambda)**
- Logs de execução
- Métricas de invocação
- Alertas de erro

### Código do Processador

```typescript
@Processor('scheduled-commands')
export class ScheduledCommandsProcessor {

  @Process()
  async handleCommand(job: Job<ScheduledCommandData>) {
    const { deviceId, commands, userId } = job.data;

    // Delega para o serviço de comandos existente
    return await this.deviceCommandService.executeCommand(
      deviceId,
      commands,
      userId
    );
  }

  @OnQueueFailed()
  async handleFailure(job: Job, error: Error) {
    this.logger.error('Scheduled command failed', {
      jobId: job.id,
      deviceId: job.data.deviceId,
      error: error.message,
      attempts: job.attemptsMade
    });
  }
}
```

### Resultado

- **Comandos agendados funcionando** end-to-end
- **Retry automático** em caso de falha
- **Auditoria completa** de execuções
- **Desacoplamento** entre agendador e executor
- **Escalabilidade** via Redis/Bull

---

## Competências Demonstradas

### Arquitetura de Software
- Design de sistemas distribuídos
- Aplicação de design patterns
- Princípios SOLID
- Clean Architecture

### Backend Development
- NestJS/Node.js avançado
- TypeORM e migrações
- Redis e caching
- Filas e processamento assíncrono

### Segurança
- OAuth 2.0 implementation
- Criptografia de dados sensíveis
- Rate limiting
- Proteção CSRF

### Integração de Sistemas
- APIs REST
- Normalização de dados heterogêneos
- Compatibilidade com sistemas legados

### DevOps
- Docker containerização
- Configuração como código
- CI/CD ready

### Problem Solving
- Debug de sistemas distribuídos
- Refatoração de código legado
- Trade-off analysis

---

## Métricas

| Métrica | Valor |
|---------|-------|
| Arquivos TypeScript | 181 |
| Módulos NestJS | 12 |
| Entidades de banco | 14 |
| Migrações | 9 |
| Plugins de fabricantes | 2 |
| Erros TS corrigidos no mobile | 73 |

---

## Conclusão

O projeto IoT Router demonstra capacidade de:

1. **Projetar arquiteturas** extensíveis e manuteníveis
2. **Aplicar design patterns** apropriados para cada problema
3. **Tomar decisões técnicas** considerando trade-offs
4. **Integrar sistemas** heterogêneos
5. **Debugar e corrigir** código legado
6. **Entregar valor** - substituição bem-sucedida de serviço terceirizado

A solução está em produção, processando comandos de dispositivos IoT e eliminando custos recorrentes de licenciamento.

---

**Tecnologias**: Node.js, NestJS, TypeScript, MySQL, Redis, TypeORM, Bull, OAuth 2.0, Docker

**Período**: 4 meses (Agosto - Dezembro 2025)
