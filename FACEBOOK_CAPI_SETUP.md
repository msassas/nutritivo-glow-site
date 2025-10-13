# 🎯 Configuração Facebook Conversions API (CAPI)

## Guia Completo para Aumentar a Taxa de Cobertura de 9% para 75%+

---

## 📋 Índice

1. [O que foi implementado](#o-que-foi-implementado)
2. [Como funciona](#como-funciona)
3. [Configuração passo a passo](#configuração-passo-a-passo)
4. [Como obter o Token de Acesso](#como-obter-o-token-de-acesso)
5. [Como testar](#como-testar)
6. [Deploy na Hostinger](#deploy-na-hostinger)
7. [Troubleshooting](#troubleshooting)

---

## ✅ O que foi implementado

### 1. Servidor Node.js com Express
- Servidor backend em `server/` com API de Conversões do Meta
- Todas as rotas necessárias já configuradas:
  - PageView (automático)
  - Lead (cliques em botões WhatsApp)
  - ViewContent
  - AddToCart
  - InitiateCheckout
  - Purchase
  - CompleteRegistration

### 2. Integração Automática Frontend + Backend
- Arquivo `src/utils/facebookPixelIntegration.ts` que envia TODOS os eventos
- Sistema de **deduplicação** usando `event_id` único
- Rastreamento automático de PageView em todas as páginas
- Rastreamento de Lead nos botões WhatsApp

### 3. Tratamento de Erros e Logs
- Logs detalhados no servidor
- Tratamento de erros em todas as rotas
- Sistema de fallback (se servidor falhar, Pixel continua funcionando)

---

## 🔍 Como funciona

### Fluxo de Eventos (com deduplicação)

```
Usuário clica em botão
         ↓
┌────────┴────────┐
│  event_id gerado │ (ex: "Lead_1234567890_abc123")
└────────┬────────┘
         ↓
    ┌────┴────┐
    ↓         ↓
[Pixel]   [CAPI Server]
Frontend   Backend
    ↓         ↓
    └────┬────┘
         ↓
   Facebook Meta
(recebe AMBOS com mesmo event_id)
         ↓
  Deduplica automaticamente
  (conta apenas 1 evento)
         ↓
   Taxa de cobertura: 75%+ ✅
```

**Resultado:** Mesmo que um dos canais falhe (bloqueador de ads no Pixel, por exemplo), o evento ainda é registrado pelo servidor.

---

## ⚙️ Configuração passo a passo

### Passo 1: Instalar dependências do servidor

```bash
cd server
npm install
```

### Passo 2: Configurar variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite `server/.env` e preencha:

```env
# Token de acesso da API (você vai obter no próximo passo)
META_ACCESS_TOKEN=seu_token_aqui

# Código de teste (para desenvolvimento)
META_TEST_EVENT_CODE=TEST12345

# Porta do servidor
PORT=3001

# URL do frontend
FRONTEND_URL=http://localhost:5173

# Ambiente
NODE_ENV=development
```

### Passo 3: Obter o Token de Acesso do Meta

Veja a próxima seção 👇

---

## 🔑 Como obter o Token de Acesso

### Opção 1: Via Events Manager (Recomendado)

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager2/list)
2. Selecione seu Pixel: **2020158598758649**
3. Clique em **Configurações** (Settings)
4. Role até **API de Conversões** (Conversions API)
5. Clique em **Gerar Token de Acesso** (Generate Access Token)
6. Copie o token gerado
7. Cole no arquivo `server/.env` na variável `META_ACCESS_TOKEN`

### Opção 2: Via Facebook Business Settings

1. Acesse [Business Settings](https://business.facebook.com/settings)
2. Vá em **Eventos de Dados** (Events Manager)
3. Selecione seu Pixel
4. Siga os mesmos passos da Opção 1

### Obter Test Event Code (para testes)

1. No Events Manager, clique em **Eventos de Teste** (Test Events)
2. Copie o código de teste (ex: TEST12345)
3. Cole no arquivo `server/.env` na variável `META_TEST_EVENT_CODE`

---

## 🚀 Iniciar o servidor

### Desenvolvimento (local)

```bash
cd server
npm run dev
```

Você verá:

```
=============================================================
🚀 Servidor Meta Conversions API iniciado!
=============================================================
📡 Porta: 3001
🌐 URL: http://localhost:3001
🎯 Meta Pixel ID: 2020158598758649
🔧 Ambiente: development
✅ Health Check: http://localhost:3001/health
=============================================================

📚 Rotas disponíveis:
  POST /api/events/pageview
  POST /api/events/lead
  POST /api/events/purchase
  POST /api/events/add-to-cart
  POST /api/events/view-content
  POST /api/events/initiate-checkout
  POST /api/events/complete-registration
  POST /api/events/custom
=============================================================
```

### Iniciar o frontend

Em outro terminal:

```bash
npm run dev
```

---

## 🧪 Como testar

### Teste 1: Health Check

Abra o navegador em: http://localhost:3001/health

Deve retornar:

```json
{
  "status": "OK",
  "timestamp": "2025-01-09T10:30:00.000Z",
  "metaPixelId": "2020158598758649"
}
```

### Teste 2: Testar PageView

1. Abra seu site: http://localhost:5173
2. Abra o Console do navegador (F12)
3. Você deve ver:

```
[Facebook Pixel] PageView enviado (eventId: PageView_1234567890_abc123)
[Conversions API] PageView enviado com sucesso (eventId: PageView_1234567890_abc123)
```

4. No terminal do servidor, você verá:

```
[2025-01-09T10:30:00.000Z] POST /api/events/pageview
[Meta Conversions API] Enviando evento: PageView
[Meta Conversions API] Cookie _fbp encontrado
[Meta Conversions API] Evento PageView enviado com sucesso
```

### Teste 3: Testar Lead (clique no botão WhatsApp)

1. Clique no botão "Agende sua consulta"
2. No Console do navegador:

```
[Facebook Pixel] Lead enviado (eventId: Lead_1234567890_xyz456)
[Conversions API] Lead enviado com sucesso (eventId: Lead_1234567890_xyz456)
```

### Teste 4: Verificar no Meta Events Manager

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager2/list)
2. Selecione seu Pixel: **2020158598758649**
3. Clique em **Eventos de Teste** (Test Events)
4. Você verá os eventos chegando em TEMPO REAL:

```
✅ PageView - event_id: PageView_1234567890_abc123
   Origem: Browser Pixel + Server
   Deduplicated: Yes ✅

✅ Lead - event_id: Lead_1234567890_xyz456
   Origem: Browser Pixel + Server
   Deduplicated: Yes ✅
```

**IMPORTANTE:** Se aparecer **"Deduplicated: Yes"**, significa que está funcionando perfeitamente! O Meta recebeu o evento DUAS vezes (Pixel + CAPI) mas contou apenas UMA vez.

### Teste 5: Verificar taxa de cobertura

1. No Events Manager, vá em **Visão Geral** (Overview)
2. Role até **API de Conversões**
3. Você verá:

```
Taxa de Cobertura de Eventos: 75%+ ✅
```

Se antes estava em 9% e agora está em 75%+, **SUCESSO!** 🎉

---

## 🌐 Deploy na Hostinger

### Opção 1: Node.js no Hostinger (se suportado)

1. Faça upload da pasta `server/` via FTP
2. No painel Hostinger, configure:
   - Tipo de aplicação: Node.js
   - Arquivo de entrada: `server.js`
   - Porta: 3001
3. Adicione as variáveis de ambiente no painel
4. Reinicie o servidor

### Opção 2: Usar serviço externo (Recomendado)

O servidor Node.js funciona melhor em serviços especializados:

**Railway.app (Grátis):**
1. Crie conta em [Railway.app](https://railway.app)
2. Clique em **New Project** > **Deploy from GitHub**
3. Conecte seu repositório
4. Railway detecta automaticamente Node.js
5. Adicione as variáveis de ambiente:
   - `META_ACCESS_TOKEN`
   - `META_TEST_EVENT_CODE` (remova em produção)
   - `PORT=3001`
   - `FRONTEND_URL=https://seu-dominio.com`
   - `NODE_ENV=production`
6. Deploy automático!

**Render.com (Grátis):**
1. Crie conta em [Render.com](https://render.com)
2. Clique em **New** > **Web Service**
3. Conecte seu repositório
4. Configure:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment Variables: (adicione as variáveis acima)
5. Deploy!

**Após deploy externo:**

1. Copie a URL do servidor (ex: `https://seu-app.railway.app`)
2. No frontend, edite `.env`:

```env
VITE_API_URL=https://seu-app.railway.app/api/events
```

3. Faça rebuild do frontend:

```bash
npm run build
```

4. Faça upload do `dist/` para Hostinger via FTP

---

## 🔒 Segurança - Variáveis de Ambiente em Produção

### NUNCA exponha o Token em produção!

**Frontend (.env na raiz do projeto):**
```env
# Apenas URL pública da API
VITE_API_URL=https://seu-servidor.railway.app/api/events
```

**Backend (server/.env - NÃO fazer upload!):**
```env
# Token NUNCA vai para o frontend
META_ACCESS_TOKEN=seu_token_secreto_aqui
NODE_ENV=production
FRONTEND_URL=https://seu-dominio.com.br
```

---

## 🐛 Troubleshooting

### ❌ Erro: "META_ACCESS_TOKEN não configurado"

**Solução:** Verifique se você configurou o token no arquivo `server/.env`

### ❌ Eventos não aparecem no Meta

**Checklist:**
- [ ] Token de acesso está correto?
- [ ] Pixel ID está correto? (2020158598758649)
- [ ] Servidor Node.js está rodando?
- [ ] Frontend consegue se conectar ao servidor? (verifique CORS)
- [ ] Cookies `_fbp` e `_fbc` estão sendo enviados?

**Verificar logs:**

No servidor:
```bash
cd server
npm run dev
# Observe os logs quando testar
```

No navegador (Console F12):
```javascript
// Verifique se os eventos estão sendo enviados
console.log('[Facebook Pixel]');
console.log('[Conversions API]');
```

### ❌ CORS Error

**Solução:** Certifique-se de que `FRONTEND_URL` no `server/.env` está correto:

```env
# Desenvolvimento
FRONTEND_URL=http://localhost:5173

# Produção
FRONTEND_URL=https://luanasalvino.com.br
```

### ❌ Eventos duplicados (contados duas vezes)

**Causa:** `event_id` não está sendo enviado corretamente.

**Solução:** Certifique-se de que está usando as funções do arquivo `facebookPixelIntegration.ts`, que já gerenciam o `event_id` automaticamente.

### ❌ Taxa de cobertura ainda baixa

**Possíveis causas:**
1. Servidor não está rodando em produção
2. Frontend não está enviando para o servidor (verifique URL da API)
3. Token de acesso inválido ou expirado

**Teste rápido:**
```bash
curl http://localhost:3001/health
```

Se não responder, o servidor não está rodando.

---

## 📊 Monitoramento

### Logs do Servidor

O servidor loga TUDO:

```
[2025-01-09T10:30:00.000Z] POST /api/events/pageview
[Meta Conversions API] Enviando evento: PageView
[Meta Conversions API] Cookie _fbp encontrado
[Meta Conversions API] Evento PageView enviado com sucesso
[Meta Conversions API] Event ID: PageView_1234567890_abc123
```

### Logs do Frontend

Abra o Console (F12) e veja:

```
[Facebook Pixel] PageView enviado (eventId: PageView_1234567890_abc123)
[Conversions API] PageView enviado com sucesso (eventId: PageView_1234567890_abc123)
```

---

## 📈 Resultados Esperados

Antes da implementação:
```
Taxa de Cobertura: 9%
Eventos rastreados: Apenas Pixel (bloqueado por adblockers)
```

Depois da implementação:
```
Taxa de Cobertura: 75%+ ✅
Eventos rastreados: Pixel + CAPI (backup redundante)
Deduplicação: Ativa ✅
```

---

## 📚 Recursos Úteis

- [Meta Events Manager](https://business.facebook.com/events_manager2/list)
- [Documentação Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Facebook Business SDK](https://github.com/facebook/facebook-nodejs-business-sdk)
- [Test Events Tool](https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api#test-events)

---

## ✅ Checklist Final

Antes de ir para produção:

- [ ] Token de acesso configurado
- [ ] Servidor testado localmente (health check)
- [ ] Eventos testados no Meta Test Events
- [ ] Taxa de cobertura verificada (75%+)
- [ ] Servidor em produção (Railway/Render)
- [ ] Frontend atualizado com URL de produção
- [ ] `NODE_ENV=production` no servidor
- [ ] `META_TEST_EVENT_CODE` removido em produção
- [ ] CORS configurado corretamente
- [ ] Logs monitorados

---

**Desenvolvido para:** Luana Salvino Nutricionista
**Meta Pixel ID:** 2020158598758649
**Objetivo:** Aumentar taxa de cobertura de 9% para 75%+
**Status:** ✅ Implementado
