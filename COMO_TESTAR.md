# 🧪 Como Testar a API de Conversões do Meta

## ✅ Status Atual

- ✅ Servidor backend criado em `server/`
- ✅ Token do Meta configurado
- ✅ Utilitário frontend criado em `src/utils/metaEvents.ts`
- ⚠️  Correção necessária no código (veja abaixo)

## 🔧 Correção Necessária

O SDK do Meta mudou. Remova completamente as linhas do country code:

**Arquivo:** `server/meta-conversions-api.js` (linhas 126-130)

**Remover:**
```javascript
// Country code - usar setCountryCodes (plural) se disponível
const countryCode = options.country ? options.country.toLowerCase() : 'br';
if (typeof userData.setCountryCodes === 'function') {
  userData.setCountryCodes([hashSHA256(countryCode)]);
}
```

O country code não é obrigatório, então pode remover essa parte completamente.

## 🚀 Como Iniciar o Servidor

### 1. Parar qualquer servidor rodando

No PowerShell ou CMD:
```bash
taskkill /F /IM node.exe
```

### 2. Iniciar o servidor

```bash
cd server
npm start
```

Você verá:
```
============================================================
🚀 Servidor Meta Conversions API iniciado!
============================================================
📡 Porta: 3001
🌐 URL: http://localhost:3001
🎯 Meta Pixel ID: 2020158598758649
```

## 🧪 Testar a API

### Teste 1: Health Check

```bash
curl http://localhost:3001/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "timestamp": "2025-10-09T...",
  "metaPixelId": "2020158598758649"
}
```

### Teste 2: Enviar Evento de Lead

```bash
curl -X POST http://localhost:3001/api/events/lead \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"teste@exemplo.com\",\"firstName\":\"João\"}"
```

Resposta esperada (sucesso):
```json
{
  "success": true,
  "eventId": "Lead_1704795000_abc123",
  "eventName": "Lead"
}
```

## 📊 Verificar Eventos no Meta

1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Pixel (ID: **2020158598758649**)
3. Clique em "**Eventos de Teste**" (Test Events)
4. Veja os eventos chegando em tempo real

**Importante:** Em desenvolvimento, os eventos vão para "Test Events". Em produção, vão para eventos reais.

## 🔗 Integrar no Frontend

### Opção 1: Atualizar um botão existente (recomendado)

Edite `src/components/Hero.tsx`:

```tsx
import { metaEvents } from '@/utils/metaEvents';

const Hero = () => {
  const handleConsulta = async () => {
    try {
      // Envia evento para o Meta
      await metaEvents.lead({});
      console.log('Evento enviado ao Meta');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      // Abre WhatsApp
      window.open(
        'https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.',
        '_blank'
      );
    }
  };

  return (
    // ... resto do componente
  );
};
```

### Opção 2: Teste Simples no Console do Navegador

1. Abra o site: `http://localhost:5173`
2. Abra o Console do DevTools (F12)
3. Cole e execute:

```javascript
fetch('http://localhost:3001/api/events/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    email: 'teste@exemplo.com',
    firstName: 'Teste Browser'
  })
})
.then(r => r.json())
.then(data => console.log('Resultado:', data))
.catch(err => console.error('Erro:', err));
```

## ✅ Checklist de Teste

- [ ] Servidor rodando na porta 3001
- [ ] Health check retorna OK
- [ ] Evento de lead envia com sucesso
- [ ] Evento aparece no Meta Events Manager > Test Events
- [ ] Frontend consegue se conectar ao backend
- [ ] Cookies _fbp e _fbc são capturados (se disponíveis)

## 🐛 Problemas Comuns

### Erro: "address already in use"
**Solução:**
```bash
taskkill /F /IM node.exe
# Ou reinicie o terminal
```

### Erro: "META_ACCESS_TOKEN não configurado"
**Solução:** Verifique se o arquivo `server/.env` existe e tem o token correto.

### Erro: "CORS"
**Solução:** O servidor já está configurado para aceitar `http://localhost:5173`. Se usar outra porta, atualize `server/.env`:
```env
FRONTEND_URL=http://localhost:PORTA
```

### Eventos não aparecem no Meta
**Checklist:**
1. Token está correto?
2. Em Test Events do Meta?
3. Servidor está rodando?
4. Veja os logs do servidor para erros

## 📝 Próximos Passos

1. ✅ Teste o servidor standalone (curl)
2. ✅ Verifique eventos no Meta Events Manager
3. ✅ Integre em um botão do frontend
4. ✅ Teste no navegador
5. ✅ Deploy para produção (quando estiver funcionando)

## 🆘 Suporte

Consulte:
- `server/README.md` - Documentação completa do backend
- `INTEGRATION_EXAMPLE.md` - Exemplos de integração
- Meta Events Manager - Para ver eventos em tempo real

---

**Token configurado:** ✅
**Servidor criado:** ✅
**Frontend configurado:** ✅
**Pronto para testar!** 🚀
