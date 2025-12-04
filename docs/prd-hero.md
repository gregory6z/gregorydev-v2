# PRD - Hero Section | Portfólio Gregory Praxedes

## Referência Visual
Site: https://portfoliosynt.framer.website/

---

## MENSAGEM PRINCIPAL

> **"Desenvolvedor Full Stack com expertise em UI/UX e Automações"**

Portfólio como **currículo online** - tom profissional com personalidade, não comercial.

---

## DECISÕES DE CONTEÚDO

| Aspecto | Escolha |
|---------|---------|
| **Tipo** | Currículo online (não landing page de vendas) |
| **Tom** | Confiança, autoridade, com emoção |
| **Social Proof** | Logos de tecnologias |

---

## CONTEÚDO FINAL DA HERO

### SAUDAÇÃO (Eyebrow Text)
```
"Hey! Eu sou Gregory Praxedes"
```

### HEADLINE PRINCIPAL
```
"Código é minha arte.
Resolver problemas, minha obsessão."
```

**Palavras para destacar (gradiente):**
- "minha arte"
- "minha obsessão"

### DESCRIÇÃO
```
"Anos aperfeiçoando a arte de criar experiências digitais.
Interfaces que fazem sentido. Sistemas que não quebram."
```

---

## ELEMENTOS DA HERO

### 1. NAVEGAÇÃO
- **Formato:** Pill/cápsula com bordas arredondadas
- **Fundo:** Semi-transparente com blur (glassmorphism)
- **Posição:** Topo, centralizada

**Conteúdo:**
```
Home | Projetos | Sobre | Contato | [Vamos Conversar]
```

---

### 2. BOTÕES CTA

**Primário:**
```
"Ver Projetos"
```

**Secundário:**
```
"Fale Comigo"
```

**Estilo:**
- Primário: Fundo sólido com gradiente
- Secundário: Transparente com borda

---

### 3. FOTO DO AUTOR
- **Formato:** Circular com borda glow
- **Tamanho:** ~120-150px
- **Efeito:** Ring brilhante (accent color)
- **Posição:** Abaixo dos CTAs, centralizada

---

### 4. LOGOS DE TECNOLOGIAS (Social Proof)
**Layout:** Carrossel horizontal infinito (marquee)
**Estilo:** Monocromático (cinza/branco)

**Tecnologias:**
```
Frontend:  React, Next.js, TypeScript, Tailwind CSS
Backend:   Node.js, Python, PostgreSQL, MongoDB
Automações: n8n, Zapier, Make
UI/UX:     Figma
DevOps:    Docker, Vercel, AWS
```

---

## LAYOUT VISUAL

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│        ┌─────────────────────────────────────┐              │
│        │ Home  Projetos  Sobre  Contato [CTA]│              │
│        └─────────────────────────────────────┘              │
│                                                             │
│              Hey! Eu sou Gregory Praxedes                   │
│                                                             │
│              Código é minha arte.                           │
│         Resolver problemas, minha obsessão.                 │
│                                                             │
│       Anos aperfeiçoando a arte de criar experiências       │
│       digitais. Interfaces que fazem sentido.               │
│              Sistemas que não quebram.                      │
│                                                             │
│          [Ver Projetos]  [Fale Comigo]                      │
│                                                             │
│                     ┌─────┐                                 │
│                     │ 📷  │                                 │
│                     └─────┘                                 │
│                                                             │
│  ← React  Next.js  Node  Python  Figma  Docker  n8n →      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## EFEITOS VISUAIS

### Background
- Cor: #0a0a0a (quase preto)
- Textura: Grid/dots sutil (opacity 5-10%)

### Texto com Gradiente
- Palavras: "minha arte" e "minha obsessão"
- Cores: roxo (#a855f7) → azul (#3b82f6)

### Glow Effects
- Foto com ring brilhante
- Botão primário com glow no hover

### Animações
- Fade-in suave no carregamento
- Marquee contínuo nos logos
- Hover states nos botões

---

## RESPONSIVIDADE

**Desktop (>1024px):** Layout completo

**Tablet (768-1024px):**
- Headline menor (~48px)
- Navegação hamburger

**Mobile (<768px):**
- Headline ~36px
- CTAs empilhados
- Foto menor (~100px)

---

## ESQUEMA DE CORES

```
Background:       #0a0a0a
Texto primário:   #ffffff
Texto secundário: #a1a1aa
Accent:           #a855f7 (roxo)
Gradiente:        #a855f7 → #3b82f6
Botão primário:   gradiente accent
Botão secundário: transparent + border #3f3f46
```

---

*Dezembro 2024*
