# Decisões de Conteúdo - Portfólio Gregory Praxedes

---

## Objetivo do Projeto

Criar um portfólio profissional que funcione como um currículo online interativo, destacando projetos, habilidades e a jornada profissional de forma persuasiva.

**Público-alvo:**
- Recrutadores e empresas de tecnologia
- Potenciais clientes para projetos freelance
- Outros desenvolvedores e comunidade tech

**Diferencial:** Não apenas listar projetos, mas contar a história por trás de cada um - os desafios enfrentados, as decisões técnicas e os aprendizados obtidos.

---

## Estrutura de Páginas

```
/                    → Home (página principal)
/projetos            → Lista de todos os projetos
/projetos/[slug]     → Página individual do projeto
/sobre               → Sobre mim (completo)
/contato             → Página de contato
```

---

## HOME - Página Principal

### 1. Hero Section
**Propósito:** Causar impacto imediato e comunicar quem você é em segundos.

**Elementos:**
- Foto profissional ou avatar personalizado
- Nome completo
- Título profissional (ex: "Desenvolvedor Full Stack")
- Tagline impactante (uma frase que define seu diferencial)
- Botões CTA: "Ver Projetos" | "Fale Comigo"
- Links sociais: GitHub, LinkedIn, etc.
- Animação sutil de entrada

**Exemplo de Tagline:**
> "Transformando ideias complexas em soluções digitais elegantes"

---

### 2. Sobre Mim (Resumo)
**Propósito:** Criar conexão pessoal e apresentar sua proposta de valor.

**Elementos:**
- 2-3 parágrafos concisos
- Anos de experiência
- Área de especialização/foco
- O que te diferencia
- Link para página "Sobre" completa

**Tom:** Profissional mas humano, mostre personalidade.

---

### 3. Tecnologias & Skills
**Propósito:** Demonstrar competências técnicas de forma visual.

**Elementos:**
- Grid de ícones das tecnologias
- Categorização clara

**Categorias sugeridas:**
| Frontend | Backend | Banco de Dados | Ferramentas |
|----------|---------|----------------|-------------|
| React    | Node.js | PostgreSQL     | Git         |
| Next.js  | Express | MongoDB        | Docker      |
| TypeScript| Python | Redis          | Figma       |
| Tailwind | ...     | ...            | ...         |

---

### 4. Projetos em Destaque
**Propósito:** Mostrar os melhores trabalhos para gerar interesse.

**Elementos:**
- 3-4 projetos principais (cards)
- Imagem/screenshot preview
- Título do projeto
- Descrição breve (1-2 linhas)
- Tags de tecnologias usadas
- Hover effect interativo
- Link para página individual
- Botão "Ver todos os projetos"

---

### 5. Experiência/Jornada
**Propósito:** Contar sua história profissional e criar credibilidade.

**Elementos:**
- Timeline visual vertical
- Marcos importantes da carreira
- Desafios superados (storytelling)
- Transições e evoluções
- Conquistas relevantes

**Formato sugerido:**
```
[Ano] - Título do Marco
        Descrição breve do que aconteceu e o impacto
```

---

### 6. CTA Final + Contato
**Propósito:** Converter visitantes em contatos/oportunidades.

**Elementos:**
- Headline persuasiva (ex: "Vamos criar algo incrível juntos?")
- Texto breve sobre disponibilidade
- Formulário simples (nome, email, mensagem) OU
- Links diretos (email, WhatsApp, LinkedIn)
- Indicador de tempo de resposta

---

## PÁGINA INDIVIDUAL DE PROJETO

### 1. Header do Projeto
**Elementos:**
- Nome do projeto (h1)
- Tagline/descrição curta
- Botões: "Ver Demo" | "Ver Código"
- Data de conclusão
- Duração do projeto

---

### 2. Overview
**Propósito:** Visão geral rápida do projeto.

**Elementos:**
- Screenshot/mockup principal (hero image)
- Contexto do projeto (para quem, por quê)
- Problema que resolve
- Resultado em uma frase

---

### 3. O Desafio
**Propósito:** Mostrar complexidade e capacidade de resolver problemas.

**Perguntas a responder:**
- Qual era o problema principal?
- Quais eram os requisitos?
- Quais limitações existiam?
- Por que era difícil/interessante?

**Tom:** Seja honesto sobre as dificuldades.

---

### 4. Minha Solução
**Propósito:** Demonstrar pensamento técnico e tomada de decisão.

**Elementos:**
- Abordagem geral
- Arquitetura escolhida (diagrama opcional)
- Decisões técnicas importantes
- Trade-offs considerados
- Por que cada escolha foi feita

---

### 5. Stack Técnica
**Propósito:** Detalhar as tecnologias com justificativa.

**Formato:**
| Tecnologia | Uso | Por que escolhi |
|------------|-----|-----------------|
| Next.js    | Framework | SSR, performance |
| Tailwind   | Styling | Rapidez, consistência |
| ...        | ...     | ...                   |

---

### 6. Processo de Desenvolvimento
**Propósito:** Mostrar metodologia e evolução do projeto.

**Elementos:**
- Etapas do desenvolvimento
- Screenshots do progresso (antes/depois)
- Obstáculos encontrados
- Como foram superados
- Pivots ou mudanças de direção

---

### 7. Resultados & Aprendizados
**Propósito:** Demonstrar impacto e mentalidade de crescimento.

**Elementos:**
- O que funcionou bem
- O que poderia melhorar
- Métricas (se houver): performance, usuários, etc.
- Aprendizados técnicos
- Aprendizados não-técnicos

---

### 8. Galeria
**Propósito:** Mostrar o projeto em detalhes.

**Elementos:**
- Screenshots adicionais
- Diferentes telas/funcionalidades
- Versão mobile
- Vídeo demo (opcional)
- Lightbox para expandir imagens

---

### 9. Navegação
**Elementos:**
- Botão "Projeto Anterior"
- Botão "Próximo Projeto"
- Link "Ver Todos os Projetos"
- CTA para contato

---

## PÁGINA SOBRE (Completa)

**Seções:**
- História pessoal (origem, como começou na programação)
- Formação acadêmica e cursos
- Filosofia de trabalho
- Valores profissionais
- Interesses além do código
- Foto pessoal
- Download de CV (opcional)

---

## PÁGINA DE CONTATO

**Elementos:**
- Headline acolhedora
- Formulário completo:
  - Nome
  - Email
  - Tipo de projeto (dropdown)
  - Mensagem
  - Budget estimado (opcional)
- Informações alternativas:
  - Email direto
  - LinkedIn
  - GitHub
  - WhatsApp (opcional)
- Expectativa de tempo de resposta

---

## NAVEGAÇÃO GLOBAL

### Header
```
[Logo/Nome]  Home  Projetos  Sobre  Contato  [CTA: Vamos Conversar]
```

### Footer
```
[Logo]
Links Rápidos    Contato           Social
- Home           - email@...       - GitHub
- Projetos       - Localização     - LinkedIn
- Sobre                            - Twitter
- Contato

© 2024 Gregory Praxedes. Todos os direitos reservados.
```

---

## Próximos Passos

1. Definir design system (cores, tipografia, espaçamentos)
2. Criar wireframes das páginas
3. Listar projetos que serão incluídos
4. Escrever conteúdo de cada seção
5. Iniciar desenvolvimento

---

*Dezembro 2024*
