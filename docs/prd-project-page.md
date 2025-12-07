# PRD - Página Individual de Projeto

## Objetivo
Criar uma página detalhada para cada projeto que apresente de forma clara e profissional o trabalho realizado, as tecnologias utilizadas, os desafios superados e os resultados alcançados.

---

## Estrutura da Página

### 1. Hero Section
- **Título do projeto** (nome)
- **Tagline/Subtítulo** (descrição curta do que é o projeto)
- **Role/Função** (ex: Full Stack Developer, Front End, etc.)
- **Período** (ex: Jan 2023 - Atual, ou 6 meses)
- **Status** (Em produção, Concluído, Em desenvolvimento)
- **Link externo** (botão para visitar o site/app se disponível)

### 2. Visão Geral (Overview)
- **Contexto** - Qual era o problema/necessidade do cliente?
- **Solução** - Como o projeto resolve esse problema?
- **Meu papel** - O que exatamente eu fiz no projeto?

### 3. Stack Técnica
- **Frontend** (React, Next.js, Tailwind, etc.)
- **Backend** (Node, Nest, Fastify, etc.)
- **Database** (PostgreSQL, Redis, etc.)
- **Infra/DevOps** (Docker, AWS, Railway, etc.)
- **Integrações** (Stripe, APIs externas, etc.)

### 4. Funcionalidades Principais (Features)
Lista das principais features desenvolvidas:
- Feature 1: Descrição breve
- Feature 2: Descrição breve
- Feature 3: Descrição breve
- ...

### 5. Desafios & Soluções
Seção para mostrar capacidade de resolver problemas:
- **Desafio 1**: Descrição do problema
  - **Solução**: Como resolvi
- **Desafio 2**: Descrição do problema
  - **Solução**: Como resolvi

### 6. Resultados/Impacto (Opcional)
Métricas e resultados quando disponíveis:
- Performance melhorada em X%
- X usuários ativos
- Tempo de carregamento reduzido
- etc.

### 7. Screenshots/Galeria
- Imagens do projeto (desktop e mobile)
- Vídeos demonstrativos (opcional)

### 8. Navegação
- Botão "Voltar aos projetos"
- Links para projeto anterior/próximo

---

## Dados por Projeto

### 1. IA Factory - Back Office Admin
- **Cliente**: La Bonne Réponse (via House of Coding / Amiltone)
- **URL Cliente**: https://www.la-bonne-reponse.pro/
- **Role**: Full Stack Developer | Lead Front End | UI/UX Designer
- **Tipo**: Back Office Admin - Plataforma de gestão de chatbots IA
- **Período**: Julho 2024 - Atual
- **Status**: Em produção

#### Contexto
Back Office Admin desenvolvido para a empresa La Bonne Réponse gerenciar seus clientes e criar chatbots de IA de forma simplificada. A plataforma permite criar, configurar e gerar widgets de chatbot que podem ser embedados em sites de clientes. La Bonne Réponse é uma startup que oferece IA Generativa para profissionais do setor de construção e renovação energética na França, ajudando a verificar conformidade com +300 regulamentações.

#### Meu Papel
- **Lead Front End**: Responsável por toda a arquitetura e desenvolvimento do front-end
- **UI/UX Design**: Criação completa do design de interface e experiência do usuário
- **Decisões Técnicas**: Escolha de ferramentas, bibliotecas e padrões arquiteturais
- **Colaboração Backend**: Trabalho em equipe com House of Coding no desenvolvimento da API

#### Stack Técnica
**Frontend:**
- React
- TypeScript
- React Query (TanStack Query)
- React Router DOM
- Shadcn UI
- Lucide Icons

**Backend (colaboração):**
- NestJS
- TypeORM
- AWS S3 (Bucket para arquivos)

#### Features Desenvolvidas

**Front End:**
1. **Dashboard Administrativo**: Interface completa para gestão da plataforma
2. **Chatbot Builder UI**: Interface de criação simplificada de chatbots
3. **Widget Configurator**: Interface para configuração e preview de widgets embedáveis
4. **Knowledge Base UI**: Interface de upload e gestão de documentos
5. **Customização Visual**: Editor de aparência e comportamento do chatbot
6. **Sistema de Filtros**: Busca avançada com filtros dinâmicos
7. **Click Prompts Editor**: Interface para criar prompts pré-configurados
8. **Gestão de Usuários/Empresas**: Interfaces de administração multi-tenant
9. **Sistema de Referentials**: Interface de monitoramento de crawler dinâmico - exibe última execução, detecta mudanças e dispara novas buscas

**Back End (colaboração):**
1. **API REST**: Endpoints para todas as operações do dashboard
2. **Widget Generator**: Geração de código/configuração de widgets embedáveis
3. **File Upload**: Integração com AWS S3 para upload de documentos
4. **Multi-tenant Architecture**: Estrutura de dados para múltiplas empresas/usuários

#### Desafios Técnicos
**Front End:**
1. **UX Complexo Simplificado**: Tornar funcionalidades técnicas acessíveis para não-técnicos
2. **Estado Complexo**: Gerenciamento de estado com React Query para dados em tempo real
3. **Preview em Tempo Real**: Visualização instantânea das customizações do chatbot

**Back End:**
1. **Integração RAG**: Conexão com ferramenta de RAG para processamento de conhecimento
2. **Processamento de Arquivos**: Pipeline de processamento para knowledge base

---

### 1b. La bonne réponse - Portal Usuário
- **Role**: Full Stack Developer | Lead Front End | UI/UX Designer
- **Cliente**: House of Coding (via Amiltone - consultoria)
- **Tipo**: Portal Web - Interface de chat para usuários finais
- **Período**: Julho 2024 - Atual
- **Status**: Em produção
- **Backend**: Compartilhado com IA Factory (mesmo backend)

#### Contexto
Portal para usuários finais da plataforma La Bonne Réponse, similar à interface do ChatGPT. Permite aos profissionais da construção civil interagir com a IA através de conversas, com histórico persistente.

**Transformação completa**: Refatoração total de uma versão antiga em Webflow, transformando completamente a experiência e arquitetura da aplicação.

#### Stack Técnica
**Frontend:**
- React
- TypeScript
- React Query
- React Router DOM
- Shadcn UI
- Lucide Icons

*(Backend compartilhado com IA Factory)*

#### Features Desenvolvidas

**Front End:**
1. **Interface de Chat**: Experiência conversacional similar ao ChatGPT
2. **Histórico de Conversas**: Navegação e busca em conversas anteriores
3. **Streaming UI**: Exibição em tempo real das respostas da IA (typing effect)
4. **Gestão de Sessões**: Organização visual de conversas por tópico/projeto
5. **Markdown Renderer**: Renderização de respostas formatadas
6. **Sistema de Autenticação**: Login, registro, página de esqueci minha senha
7. **Gestão de Abonnement**: Interface de gerenciamento de assinaturas
8. **Refatoração Completa**: Transformação total da UI/UX de versão Webflow legada

#### Desafios Técnicos
**Front End:**
1. **Streaming UI**: Implementação de typing effect para respostas em tempo real
2. **Performance de Chat**: Virtualização para longas conversas
3. **UX Intuitivo**: Interface limpa e familiar (inspirada no ChatGPT)

### 2. Les Performeurs
- **Role**: Front End Developer
- **Stack**: React, ?
- **Tipo**: ?
- **Contexto**: ?
- **Features principais**: ?
- **Desafios**: ?

### 3. Airwell IOT
- **Role**: Back End Developer (Microservices)
- **Stack**: Node.js, Microservices, ?
- **Tipo**: Sistema IOT
- **Contexto**: ?
- **Features principais**: ?
- **Desafios**: ?

### 4. Ragboost
- **Role**: Full Stack Developer & Founder
- **Stack**: ?
- **Tipo**: SaaS
- **Contexto**: Projeto próprio
- **Features principais**: ?
- **Desafios**: ?

### 5. Va beauty
- **Role**: Full Stack Developer
- **Stack**: ?
- **Tipo**: ?
- **Contexto**: ?
- **Features principais**: ?
- **Desafios**: ?

### 6. Signature Agence
- **Role**: Landing Page Developer
- **Stack**: ?
- **Tipo**: Landing Page / Site institucional
- **Contexto**: ?
- **Features principais**: ?
- **Desafios**: ?

---

## Questões para Definir

1. **Idiomas**: As descrições dos projetos devem ser traduzidas nos 4 idiomas (PT, EN, FR, ES)?

2. **Screenshots**: Você tem imagens/screenshots dos projetos para adicionar?

3. **Links externos**: Quais projetos têm link público para mostrar?

4. **Nível de detalhe**: Quer descrições longas e detalhadas ou mais concisas?

5. **Métricas**: Tem dados de performance/resultados para mostrar?

6. **Confidencialidade**: Algum projeto tem restrições sobre o que pode ser mostrado?

---

## Próximos Passos

1. [ ] Preencher os dados de cada projeto
2. [ ] Definir estrutura de i18n para a página
3. [ ] Criar componentes da página
4. [ ] Implementar roteamento dinâmico `/projects/[slug]`
5. [ ] Adicionar imagens/screenshots
6. [ ] Testar responsividade

---

## Notas
- Manter consistência visual com o resto do site
- Design dark mode como padrão
- Animações sutis (Framer Motion)
- SEO otimizado para cada projeto
