# 🚀 DEPLOY RÁPIDO - 3 Passos

## Resumo visual do que você precisa fazer

---

## ✅ PASSO 1: Deploy do Servidor (Vercel - 5 min)

### 1.1 - Criar conta no Vercel
👉 https://vercel.com → Sign Up → Continue with GitHub

### 1.2 - Fazer push para GitHub (se ainda não fez)

```bash
git init
git add .
git commit -m "Add Facebook CAPI"
git remote add origin SEU_REPOSITORIO_AQUI
git push -u origin main
```

### 1.3 - Deploy no Vercel

1. Vercel → **"Add New Project"**
2. Importar seu repositório
3. Configurar:
   - **Root Directory:** `server/`
   - **Install Command:** `npm install`
   - Deixar o resto vazio
4. **"Deploy"**

### 1.4 - Adicionar Variáveis de Ambiente

Settings → Environment Variables → Adicionar:

```
META_ACCESS_TOKEN = (seu token)
PORT = 3001
FRONTEND_URL = https://seu-dominio.com.br
NODE_ENV = production
```

**Salvar** → Ir em Deployments → **Redeploy**

### 1.5 - Copiar URL do Vercel

Você vai receber uma URL tipo:
```
https://seu-projeto.vercel.app
```

**COPIE ESSA URL!** ⬇️

---

## ✅ PASSO 2: Build do Frontend

### 2.1 - Atualizar .env

Edite `.env` na raiz do projeto:

```env
VITE_API_URL=https://seu-projeto.vercel.app/api/events
```

### 2.2 - Fazer build

```bash
npm run build
```

Isso cria a pasta `dist/` ⬇️

---

## ✅ PASSO 3: Upload na Hostinger

### Via FTP (Recomendado)

1. FileZilla ou WinSCP
2. Conectar no FTP da Hostinger
3. Ir em `public_html/`
4. **DELETAR TUDO**
5. Arrastar CONTEÚDO de `dist/` para `public_html/`

### Ou via File Manager

1. Painel Hostinger → File Manager
2. `public_html/` → Deletar tudo
3. Upload → Selecionar conteúdo de `dist/`

---

## 🧪 TESTAR

### 1. Servidor (Vercel):
```
https://seu-projeto.vercel.app/health
```
Deve retornar: `{"status":"OK",...}`

### 2. Site (Hostinger):
```
https://seu-dominio.com.br
```
- Abrir Console (F12)
- Deve ver: `[Conversions API] PageView enviado com sucesso`

### 3. Facebook:
https://business.facebook.com/events_manager2/list
- Selecionar Pixel 2020158598758649
- Ver eventos chegando em tempo real

---

## ❌ PROBLEMAS COMUNS

### "Failed to fetch"
→ URL da API errada no `.env` → Refazer build → Upload

### CORS Error
→ `FRONTEND_URL` errado no Vercel → Atualizar → Redeploy

### Site não abre
→ Arquivos no lugar errado → Verificar se tem `index.html` em `public_html/`

---

## 📁 ESTRUTURA FINAL

```
Vercel (Servidor Backend)
  └─ https://seu-projeto.vercel.app
      └─ /health
      └─ /api/events/pageview
      └─ /api/events/lead
      └─ ...

Hostinger (Frontend)
  └─ https://seu-dominio.com.br
      └─ index.html
      └─ assets/
      └─ ...
```

---

## 💰 CUSTO

**ZERO REAIS** (Vercel grátis + Hostinger que você já tem)

---

## 📚 DOCUMENTAÇÃO COMPLETA

Veja `DEPLOY_VERCEL_COMPLETO.md` para detalhes e troubleshooting completo!

---

**Pronto! Em 15 minutos seu site está no ar com Facebook CAPI funcionando! 🎉**
