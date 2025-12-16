# Como usar o Contact Modal

## 1. Importar o componente

```tsx
import { ContactModal } from "@/components/ui/contact-modal"
```

## 2. Usar no botão de contato

### Exemplo na página principal (src/app/[locale]/page.tsx)

Substitua o link atual (linha 102-107):

```tsx
// ANTES:
<a
  href="#contact"
  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
>
  {t("cta.contact")}
</a>

// DEPOIS:
<ContactModal>
  <button
    className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30"
  >
    {t("cta.contact")}
  </button>
</ContactModal>
```

## 3. Template do EmailJS

Você precisa criar um template no EmailJS com as seguintes variáveis:

### Variáveis do template:
- `{{name}}` - Nome do contato
- `{{email}}` - Email do contato
- `{{message}}` - Mensagem

### Exemplo de template HTML no EmailJS:

```html
<h2>Nova mensagem de contato</h2>

<p><strong>Nome:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>

<h3>Mensagem:</h3>
<p>{{message}}</p>
```

### Exemplo de template de resposta automática (opcional):

```html
<h2>Olá {{name}},</h2>

<p>Obrigado por entrar em contato! Recebi sua mensagem e responderei em breve.</p>

<p>Atenciosamente,<br>Gregory Praxedes</p>
```

## 4. Atualizar credenciais no .env.local

Após criar o template no EmailJS, atualize o arquivo `.env.local` com:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_7fhoans
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

## 5. Reiniciar o servidor de desenvolvimento

```bash
npm run dev
```
