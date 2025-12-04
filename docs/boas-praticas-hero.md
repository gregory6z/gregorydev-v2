# Boas Práticas UI/UX - Hero Section Centralizada

## Tendências 2024/2025

### Tipografia como protagonista
> "Removing the typical hero-image background and replacing it with bold, striking typography" é uma das principais tendências de 2025.

- Hero com foco em texto > imagens pesadas
- Tipografia bold e impactante como elemento principal
- Páginas com text-only hero têm +20% conversão vs image-heavy designs

---

## Best Practices - Desktop

### 1. Layout e Espaçamento
- **Whitespace generoso** - criar sensação de calma e foco
- **Conteúdo centralizado** - focal point no centro da tela
- **Hierarquia clara** - headline > descrição > CTA
- **Evitar clutter visual** - menos é mais

### 2. Tipografia
- **Fontes legíveis** - clara, sem serifa para digital
- **Tamanhos proporcionais**:
  - Headline: 56-72px
  - Descrição: 18-20px
  - CTA: 16-18px
- **Contraste WCAG** - mínimo 4.5:1 para texto normal

### 3. Call to Action (CTA)
- **Um CTA principal** - não duplicar com mesmo estilo
- **Hierarquia visual** - primário vs secundário com pesos diferentes
- **Labels auto-explicativas** - usuário entende sem pensar
- **Keyboard-focusable** - acessibilidade

### 4. Imagens (se usar)
- **Alta resolução** - crisp e clara
- **Formato WebP** - melhor compressão
- **< 500KB** - performance
- **Focal point centrado** - evitar texto nas bordas

---

## Best Practices - Mobile

### 1. Mobile-First
> "58.99% do tráfego global é mobile" (2024)
> "74% dos usuários retornam a sites mobile-friendly"

- **Desenhar mobile primeiro** - depois escalar para desktop
- **Não apenas "encolher"** - redesenhar para mobile

### 2. Layout Responsivo
```
Desktop: elementos lado a lado
Mobile: elementos empilhados verticalmente
```

- **Stack vertical** - conteúdo empilhado
- **Safe zones** - texto longe das bordas
- **Testar landscape** - não esquecer orientação horizontal

### 3. Performance
- **Imagens adaptativas** - versões menores para mobile
- **Ou cores sólidas** - substituir imagem por background color
- **Carregar essencial primeiro**:
  1. Headline
  2. Descrição
  3. CTA
  4. (depois) animações e efeitos

### 4. CTAs no Mobile
- **Empilhar verticalmente** - não lado a lado
- **Tamanho de toque** - mínimo 44x44px
- **Espaçamento entre botões** - evitar cliques acidentais

### 5. Tipografia Mobile
```css
Desktop: 56-72px headline
Tablet:  48px headline
Mobile:  32-36px headline
```

---

## Breakpoints Recomendados

```css
/* Mobile first */
.hero { /* estilos base mobile */ }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

---

## Acessibilidade

### Obrigatório
- [ ] Contraste WCAG AA (4.5:1 texto, 3:1 elementos grandes)
- [ ] CTAs focáveis via teclado
- [ ] Alt text em imagens
- [ ] Respeitar `prefers-reduced-motion`

### Recomendado
- [ ] Captions em vídeos
- [ ] Evitar autoplay com som
- [ ] Evitar animações que pisquem
- [ ] Pausar animações sob demanda

---

## Checklist Hero Section

### Conteúdo
- [ ] Headline claro e impactante
- [ ] Descrição concisa (1-2 linhas)
- [ ] CTA com ação clara
- [ ] Hierarquia visual definida

### Desktop
- [ ] Whitespace adequado
- [ ] Tipografia legível
- [ ] Imagem otimizada (se usar)
- [ ] Navegação acessível

### Mobile
- [ ] Layout empilhado
- [ ] Fontes redimensionadas
- [ ] CTAs com tamanho de toque
- [ ] Performance < 3s load
- [ ] Testado em portrait e landscape

### Performance
- [ ] Imagens < 500KB
- [ ] Formato WebP
- [ ] Lazy load para secundários
- [ ] Core Web Vitals OK

---

## Aplicação no Nosso Projeto

### Hero Gregory Praxedes

**Layout:** Centralizado, texto como protagonista

**Desktop:**
```
┌─────────────────────────────────────────────┐
│            [Nav pill centralizado]           │
│                                              │
│         "Hey! Eu sou Gregory Praxedes"       │
│                                              │
│          "Código é minha arte.               │
│     Resolver problemas, minha obsessão."     │
│                                              │
│       "Anos aperfeiçoando a arte..."         │
│                                              │
│        [Ver Projetos] [Fale Comigo]          │
│                                              │
│                  [Foto]                      │
│                                              │
│    ← logos tecnologias (marquee) →           │
└─────────────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────┐
│     [☰ Menu]        │
│                     │
│   "Hey! Eu sou      │
│   Gregory Praxedes" │
│                     │
│   "Código é minha   │
│       arte.         │
│ Resolver problemas, │
│  minha obsessão."   │
│                     │
│   "Anos aperf..."   │
│                     │
│   [Ver Projetos]    │
│   [Fale Comigo]     │
│                     │
│      [Foto]         │
│                     │
│  ← logos tech →     │
└─────────────────────┘
```

---

## Fontes das Pesquisas

- LogRocket UX Design Blog
- Prismic Blog
- UX Knowledge Base
- HubSpot Marketing Blog
- UX Planet
- DesignerUp
- Magic UI Design

---

*Dezembro 2024*
