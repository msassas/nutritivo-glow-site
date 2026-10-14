# 🚀 Deploy Completo - Vercel + Hostinger

## Guia passo a passo para colocar tudo em produção

---

## 📋 O QUE VOCÊ VAI FAZER

1. **Deploy do SERVIDOR (API de Conversões)** → Vercel (Grátis)
2. **Deploy do FRONTEND (Site)** → Hostinger (Você já tem)
3. **Conectar tudo** → Configurar variáveis de ambiente

---

## PARTE 1: Deploy do Servidor no Vercel (5 minutos)

### Passo 1: Criar conta no Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Faça login no GitHub e autorize o Vercel

### Passo 2: Preparar o repositório

Você precisa ter seu código no GitHub. Se ainda não tem:

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Add Facebook Conversions API"

# Criar repositório no GitHub e fazer push
# (Siga as instruções que aparecem quando você cria um novo repositório no GitHub)
```

### Passo 3: Deploy no Vercel

1. No Vercel, clique em **"Add New..."** → **"Project"**
2. Selecione **"Import Git Repository"**
3. Conecte sua conta do GitHub
4. Selecione seu repositório
5. **IMPORTANTE:** Configure assim:

```
Framework Preset: Other
Root Directory: server/
Build Command: (deixe vazio)
Output Directory: (deixe vazio)
Install Command: npm install
```

6. Clique em **"Deploy"**

### Passo 4: Adicionar Variáveis de Ambiente no Vercel

1. No dashboard do Vercel, vá no seu projeto
2. Clique em **"Settings"** → **"Environment Variables"**
3. Adicione as seguintes variáveis:

```env
META_ACCESS_TOKEN = META_ACCESS_TOKEN

PORT = 3001

FRONTEND_URL = https://luanasalvino.com.br

NODE_ENV = production
```

**IMPORTANTE:** Substitua `https://luanasalvino.com.br` pela URL real do seu site na Hostinger!

4. Clique em **"Save"**
5. Volte em **"Deployments"** → Clique nos 3 pontinhos do último deploy → **"Redeploy"**

### Passo 5: Copiar URL do Servidor

Depois do deploy, você verá uma URL tipo:
```
https://seu-projeto.vercel.app
```

**COPIE ESSA URL!** Você vai precisar dela no próximo passo.

---

## PARTE 2: Atualizar Frontend para Produção

### Passo 1: Atualizar .env do Frontend

Edite o arquivo `.env` na raiz do projeto:

```env
# Substitua pela URL do Vercel que você copiou acima
VITE_API_URL=https://seu-projeto.vercel.app/api/events
```

### Passo 2: Build do Frontend

```bash
npm run build
```

Isso vai gerar uma pasta `dist/` com todos os arquivos otimizados.

---

## PARTE 3: Upload para Hostinger

### Opção A: Via FTP (Recomendado)

1. **Baixe um cliente FTP:**
   - Windows: [FileZilla](https://filezilla-project.org/)
   - Alternativa: [WinSCP](https://winscp.net/)

2. **Conecte no FTP da Hostinger:**
   - Host: Encontre em "Hostinger Panel → FTP Accounts"
   - Usuário: Seu usuário FTP
   - Senha: Sua senha FTP
   - Porta: 21

3. **Faça upload:**
   - Navegue até a pasta `public_html/` (ou pasta raiz do seu domínio)
   - **DELETE todos os arquivos antigos primeiro!**
   - Arraste todos os arquivos de dentro da pasta `dist/` para `public_html/`
   - **IMPORTANTE:** Arraste o CONTEÚDO de `dist/`, não a pasta `dist/` em si!

### Opção B: Via File Manager da Hostinger

1. Acesse o painel da Hostinger
2. Vá em **"File Manager"**
3. Navegue até `public_html/`
4. Delete todos os arquivos antigos
5. Clique em **"Upload"**
6. Selecione todos os arquivos de dentro da pasta `dist/`
7. Aguarde o upload completar

---

## PARTE 4: Verificar se está funcionando

### 1. Testar o Servidor (Vercel)

Abra no navegador:
```
https://seu-projeto.vercel.app/health
```

Deve retornar:
```json
{
  "status": "OK",
  "timestamp": "...",
  "metaPixelId": "2020158598758649"
}
```

✅ Se retornar isso, o servidor está funcionando!

### 2. Testar o Site (Hostinger)

1. Acesse seu site: https://luanasalvino.com.br
2. Abra o Console (F12)
3. Navegue pelo site
4. Você deve ver:

```
[Facebook Pixel] PageView enviado (eventId: PageView_xxx)
[Conversions API] PageView enviado com sucesso (eventId: PageView_xxx)
```

5. Clique em "Agende sua consulta"
6. Você deve ver:

```
[Facebook Pixel] Lead enviado (eventId: Lead_xxx)
[Conversions API] Lead enviado com sucesso (eventId: Lead_xxx)
```

### 3. Verificar no Facebook

1. Acesse: https://business.facebook.com/events_manager2/list
2. Selecione Pixel: **2020158598758649**
3. Vá em **"Visão Geral"**
4. Você deve ver eventos chegando em tempo real!

---

## 🔧 TROUBLESHOOTING

### ❌ Erro: "Failed to fetch" no Console

**Causa:** URL da API está errada no `.env`

**Solução:**
1. Verifique se a URL no `.env` está correta (incluindo `/api/events`)
2. Faça `npm run build` novamente
3. Faça upload dos arquivos novos

### ❌ Erro: CORS no Console

**Causa:** `FRONTEND_URL` no Vercel está errado

**Solução:**
1. No Vercel, vá em Settings → Environment Variables
2. Atualize `FRONTEND_URL` com a URL correta do seu site
3. Faça Redeploy no Vercel

### ❌ Servidor Vercel retorna 404

**Causa:** Configuração do Vercel está errada

**Solução:**
1. No Vercel, vá em Settings → General
2. Verifique se "Root Directory" está como `server/`
3. Faça Redeploy

### ❌ Site não abre na Hostinger

**Causa:** Arquivos no lugar errado ou falta arquivo `index.html`

**Solução:**
1. Verifique se os arquivos estão em `public_html/`
2. Deve ter um arquivo `index.html` na raiz
3. Verifique se o arquivo `.htaccess` existe (se não, veja próxima seção)

---

## 📝 Arquivo .htaccess para Hostinger

Crie um arquivo `.htaccess` na pasta `public_html/` com o seguinte conteúdo:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access 1 year"
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/gif "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType image/webp "access 1 year"
  ExpiresByType image/svg+xml "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType application/javascript "access 1 month"
  ExpiresByType text/html "access 1 day"
</IfModule>
```

---

## 🎉 CHECKLIST FINAL

Antes de considerar concluído, verifique:

- [ ] Servidor no Vercel funcionando (`/health` retorna OK)
- [ ] Site na Hostinger abrindo
- [ ] Console do navegador mostra eventos Pixel + CAPI
- [ ] Eventos aparecem no Facebook Events Manager
- [ ] Botões WhatsApp rastreando Lead
- [ ] PageView sendo enviado automaticamente
- [ ] Taxa de cobertura começando a subir (espere alguns dias)

---

## 📊 MONITORAMENTO

### Logs do Vercel

1. No Vercel, vá em seu projeto
2. Clique em **"Functions"**
3. Clique em `server.js`
4. Você verá todos os logs em tempo real

### Taxa de Cobertura

1. Espere 24-48 horas após deploy
2. Acesse Facebook Events Manager
3. Vá em Visão Geral → API de Conversões
4. Você verá a taxa subir de 9% para 75%+

---

## 💰 CUSTOS

- **Vercel:** GRÁTIS (plano Hobby - 100GB bandwidth/mês)
- **Hostinger:** Você já tem
- **Facebook API:** GRÁTIS

**Total: R$ 0,00/mês** 🎉

---

## 🔐 SEGURANÇA

✅ Token de acesso fica APENAS no Vercel (variáveis de ambiente)
✅ Frontend não tem acesso ao token
✅ HTTPS automático no Vercel
✅ CORS configurado corretamente

---

## 📚 LINKS ÚTEIS

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Facebook Events Manager:** https://business.facebook.com/events_manager2/list
- **Hostinger File Manager:** [Seu painel da Hostinger]

---

## ⚡ ALTERNATIVA: Deploy Automático (GitHub Actions)

Se você quiser automatizar o deploy (toda vez que fizer commit, já faz deploy automaticamente):

1. No Vercel, vá em Settings → Git
2. Ative **"Production Branch"** para `main`
3. Pronto! Agora toda vez que você der push no GitHub, o Vercel faz deploy automaticamente

---

**Dúvidas? Veja o arquivo `QUICK_START_CAPI.md` para comandos rápidos de teste!**
