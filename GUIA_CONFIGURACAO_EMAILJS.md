# Guia de Configuração EmailJS

## 📧 Template Criado

**EMAIL_TEMPLATE.html** - Template para receber mensagens de contato

## 🚀 Configuração no EmailJS

### Passo 1: Template Principal (Receber Mensagens)

1. Acesse [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Vá em **Email Templates** → **Create New Template**
3. Configure:
   - **Template Name**: `Contact Form - gregorypraxedes.com`
   - **Subject**: `Nova mensagem de {{name}} - gregorypraxedes.com`
   - **Content**: Cole o conteúdo de `EMAIL_TEMPLATE.html`

4. **Variáveis necessárias**:
   - `{{name}}` - Nome do contato
   - `{{email}}` - Email do contato
   - `{{message}}` - Mensagem

5. **Email Settings**:
   - **From Name**: `Gregory Praxedes Website`
   - **From Email**: `noreply@emailjs.com` (ou seu domínio)
   - **To Email**: **SEU EMAIL** (onde você quer receber)
   - **Reply To**: `{{email}}` (para responder direto ao contato)

6. Salve e copie o **Template ID**

### Passo 2: Atualizar .env.local

Atualize o arquivo `.env.local` com o novo Template ID:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_7fhoans
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=dH-zw6UJ9OxhifJlA
EMAILJS_PRIVATE_KEY=u9WAc4D5ZXpqH035oAfMm
```

## 🧪 Testar

1. Reinicie o servidor:
   ```bash
   npm run dev
   ```

2. Acesse o site e teste o formulário
3. Verifique se recebeu o email formatado
4. Teste a resposta clicando no botão do email

## 📝 Customizações

### Cores do Template
- **Preto Principal**: `#000000`
- **Cinza Escuro**: `#1a1a1a`, `#333333`
- **Cinza Médio**: `#666666`
- **Cinza Claro**: `#999999`, `#cccccc`
- **Background**: `#f8f9fa`


## ⚠️ Importante

1. **Teste antes de publicar** - Envie alguns testes
2. **Verifique o spam** - Primeiros emails podem cair no spam
3. **Configure Reply-To** - Para poder responder direto
4. **Monitore o limite** - EmailJS tem limite gratuito de 200 emails/mês

## 💡 Dicas

- Use o botão "Test template" no EmailJS para visualizar
- Adicione seu email pessoal no campo "To Email"
- Configure notificações no dashboard para não perder mensagens
- Considere criar um template em inglês também se receber contatos internacionais
