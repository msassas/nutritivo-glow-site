# 🚀 Quick Start - Facebook CAPI

## Guia rápido para colocar funcionando em 5 minutos

---

## 1️⃣ Obter Token de Acesso

1. Acesse: https://business.facebook.com/events_manager2/list
2. Selecione Pixel **2020158598758649**
3. Configurações → API de Conversões → **Gerar Token**
4. Copie o token

---

## 2️⃣ Configurar Servidor

```bash
cd server
npm install
cp .env.example .env
```

Edite `server/.env` e cole seu token:

```env
META_ACCESS_TOKEN=cole_seu_token_aqui
META_TEST_EVENT_CODE=TEST12345
PORT=3001
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 3️⃣ Iniciar

**Terminal 1 (Servidor):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

---

## 4️⃣ Testar

1. Abra: http://localhost:5173
2. Clique no botão "Agende sua consulta"
3. Verifique no Console (F12):

```
✅ [Facebook Pixel] Lead enviado
✅ [Conversions API] Lead enviado com sucesso
```

---

## 5️⃣ Verificar no Meta

1. Acesse: https://business.facebook.com/events_manager2/list
2. Pixel **2020158598758649** → **Eventos de Teste**
3. Você verá os eventos chegando em tempo real:

```
✅ PageView - Deduplicated: Yes
✅ Lead - Deduplicated: Yes
```

---

## ✅ Pronto!

Se você vê "Deduplicated: Yes", está funcionando perfeitamente!

**Antes:** Taxa de cobertura 9%
**Depois:** Taxa de cobertura 75%+ ✅

---

## 📖 Documentação Completa

Veja `FACEBOOK_CAPI_SETUP.md` para:
- Deploy em produção
- Troubleshooting
- Configurações avançadas
- Monitoramento
