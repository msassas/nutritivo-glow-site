# 🎯 Meta Conversions API - Servidor Backend

Servidor Node.js/Express para integração com a API de Conversões do Meta (Facebook), enviando eventos do lado do servidor para melhor rastreamento e atribuição.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Iniciar o Servidor](#iniciar-o-servidor)
- [Rotas Disponíveis](#rotas-disponíveis)
- [Exemplos de Uso](#exemplos-de-uso)
- [Integração com Frontend](#integração-com-frontend)
- [Testes](#testes)
- [Troubleshooting](#troubleshooting)

## 🔧 Pré-requisitos

- Node.js 18+ instalado
- Token de acesso da API de Conversões do Meta
- Meta Pixel instalado no frontend (já configurado: `2020158598758649`)

## 📦 Instalação

```bash
cd server
npm install
```

## ⚙️ Configuração

### 1. Obter o Token de Acesso do Meta

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecione seu Pixel (ID: 2020158598758649)
3. Vá em **Configurações** > **API de Conversões**
4. Clique em **Gerar Token de Acesso**
5. Copie o token gerado

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas configurações:

```env
META_ACCESS_TOKEN=seu_token_aqui
META_TEST_EVENT_CODE=TEST12345
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

**Importante:** Nunca commite o arquivo `.env` no Git!

## 🚀 Iniciar o Servidor

### Modo Desenvolvimento (com auto-reload)

```bash
npm run dev
```

### Modo Produção

```bash
npm start
```

O servidor estará rodando em `http://localhost:3001`

## 🛣️ Rotas Disponíveis

### Health Check

```http
GET /health
```

Retorna o status do servidor.

### 1. Lead (Formulário de Contato/Newsletter)

```http
POST /api/events/lead
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "firstName": "João",
  "phone": "83986547947"
}
```

### 2. Purchase (Compra Concluída)

```http
POST /api/events/purchase
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "phone": "83986547947",
  "value": 149.90,
  "currency": "BRL",
  "orderId": "PED12345",
  "items": [
    {
      "id": "PROD123",
      "quantity": 2,
      "price": 74.95
    }
  ]
}
```

### 3. AddToCart (Adicionar ao Carrinho)

```http
POST /api/events/add-to-cart
Content-Type: application/json

{
  "productId": "PROD123",
  "productName": "Plano de Nutrição Completo",
  "price": 199.90,
  "quantity": 1
}
```

### 4. ViewContent (Visualização de Página/Produto)

```http
POST /api/events/view-content
Content-Type: application/json

{
  "contentName": "Plano de Nutrição",
  "contentCategory": "servicos",
  "contentId": "SERV001",
  "value": 199.90
}
```

### 5. InitiateCheckout (Início do Checkout)

```http
POST /api/events/initiate-checkout
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "value": 299.90,
  "items": [
    {
      "id": "PROD123",
      "quantity": 1
    }
  ]
}
```

### 6. CompleteRegistration (Cadastro Completo)

```http
POST /api/events/complete-registration
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "firstName": "Maria",
  "lastName": "Silva",
  "phone": "83986547947"
}
```

### 7. Evento Customizado

```http
POST /api/events/custom
Content-Type: application/json

{
  "eventName": "ContactFormSubmit",
  "email": "usuario@exemplo.com",
  "phone": "83986547947",
  "customData": {
    "content_name": "Formulário de Agendamento",
    "value": 0,
    "currency": "BRL"
  }
}
```

## 💻 Exemplos de Uso

### Exemplo 1: Enviar Lead quando usuário clica no botão WhatsApp

```javascript
// No frontend (React)
const handleWhatsAppClick = async () => {
  try {
    // Envia evento para o servidor
    await fetch('http://localhost:3001/api/events/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Importante para enviar cookies
      body: JSON.stringify({
        email: userEmail, // Se você tiver o email
        firstName: userName
      })
    });

    // Abre o WhatsApp
    window.open('https://wa.me/5583986547947?text=...', '_blank');
  } catch (error) {
    console.error('Erro ao enviar evento:', error);
    // Abre o WhatsApp mesmo se o evento falhar
    window.open('https://wa.me/5583986547947?text=...', '_blank');
  }
};
```

### Exemplo 2: Enviar evento de Purchase após pagamento

```javascript
// Após confirmação de pagamento
const confirmPayment = async (orderData) => {
  try {
    const response = await fetch('http://localhost:3001/api/events/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: orderData.email,
        phone: orderData.phone,
        value: orderData.total,
        currency: 'BRL',
        orderId: orderData.id,
        items: orderData.items
      })
    });

    const result = await response.json();
    console.log('Evento enviado:', result);
  } catch (error) {
    console.error('Erro ao enviar evento de compra:', error);
  }
};
```

### Exemplo 3: Rastrear envio de formulário

```javascript
// Componente de formulário
const handleSubmit = async (formData) => {
  try {
    // Envia evento de lead
    await fetch('http://localhost:3001/api/events/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        firstName: formData.name,
        phone: formData.phone
      })
    });

    // Processa o formulário
    // ...
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

## 🔗 Integração com Frontend

### Criar função utilitária no frontend

Crie um arquivo `src/utils/metaEvents.js`:

```javascript
const API_URL = 'http://localhost:3001/api/events';

export const metaEvents = {
  lead: async (data) => {
    return fetch(`${API_URL}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
  },

  purchase: async (data) => {
    return fetch(`${API_URL}/purchase`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
  },

  addToCart: async (data) => {
    return fetch(`${API_URL}/add-to-cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
  },

  viewContent: async (data) => {
    return fetch(`${API_URL}/view-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
  }
};
```

### Usar nos componentes

```javascript
import { metaEvents } from '@/utils/metaEvents';

// Em qualquer componente
const handleAction = async () => {
  try {
    await metaEvents.lead({
      email: 'usuario@exemplo.com',
      firstName: 'João'
    });
  } catch (error) {
    console.error('Erro ao enviar evento:', error);
  }
};
```

## 🧪 Testes

### Testar com curl

```bash
# Health check
curl http://localhost:3001/health

# Enviar evento de lead
curl -X POST http://localhost:3001/api/events/lead \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@exemplo.com","firstName":"João"}'
```

### Verificar eventos no Meta

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecione seu Pixel
3. Vá em **Eventos de Teste** (se estiver em desenvolvimento)
4. Você verá os eventos chegando em tempo real

## 🐛 Troubleshooting

### Erro: "META_ACCESS_TOKEN não configurado"

**Solução:** Configure o token no arquivo `.env`

### Eventos não aparecem no Meta

**Checklist:**
- ✅ Token de acesso está correto?
- ✅ Pixel ID está correto? (2020158598758649)
- ✅ Servidor está rodando?
- ✅ Em desenvolvimento, está usando Test Event Code?
- ✅ Cookies estão sendo enviados? (credentials: 'include')

### CORS Error no frontend

**Solução:** Certifique-se de:
1. Usar `credentials: 'include'` nas requisições
2. FRONTEND_URL está configurado corretamente no .env
3. Backend está rodando

### Eventos duplicados

Os eventos têm `eventId` para deduplicação. Se o mesmo evento for enviado pelo frontend (Pixel) e backend (Conversions API) com o mesmo `eventId`, o Meta conta apenas uma vez.

## 📊 Monitoramento

### Logs do Servidor

O servidor loga todas as requisições e eventos:

```
[2025-01-09T10:30:00.000Z] POST /api/events/lead
[Meta Conversions API] Enviando evento: Lead
[Meta Conversions API] Cookie _fbp encontrado
[Meta Conversions API] Email adicionado (com hash)
[Meta Conversions API] Evento Lead enviado com sucesso
[Meta Conversions API] Event ID: Lead_1704795000000_xyz123
```

## 🔐 Segurança

- ✅ Token de acesso nunca é exposto no frontend
- ✅ Emails e telefones são hasheados com SHA256
- ✅ CORS configurado para aceitar apenas seu frontend
- ✅ `.env` no .gitignore

## 📝 Notas Importantes

1. **Deduplicação**: Use `eventId` consistente entre Pixel e Conversions API
2. **Cookies**: O servidor lê cookies `_fbp` e `_fbc` para melhor matching
3. **Hashing**: Dados pessoais são automaticamente hasheados antes do envio
4. **Teste**: Use `META_TEST_EVENT_CODE` em desenvolvimento

## 🚀 Produção

Para deploy em produção:

1. Configure `NODE_ENV=production` no .env
2. Remova ou desabilite `META_TEST_EVENT_CODE`
3. Use HTTPS
4. Configure FRONTEND_URL para seu domínio de produção

## 📚 Recursos

- [Meta Conversions API Docs](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Facebook Business SDK](https://github.com/facebook/facebook-nodejs-business-sdk)
- [Eventos Padrão do Meta](https://developers.facebook.com/docs/meta-pixel/reference#standard-events)

---

**Desenvolvido para:** Nutritivo Glow Site
**Meta Pixel ID:** 2020158598758649
