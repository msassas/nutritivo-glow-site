# 🚀 Deploy do Site na Hostinger - Guia Completo

## 📋 Você vai precisar de 2 coisas:

1. **Frontend** (site React) → Hospedagem Web da Hostinger
2. **Backend** (servidor Node.js da API) → VPS ou Node.js Hosting da Hostinger

---

## 🎯 OPÇÃO 1: Deploy Simples (RECOMENDADO para começar)

### Deploy apenas do Frontend (sem tracking de conversões por enquanto)

Se você só quer colocar o site no ar primeiro, faça isso:

### Passo 1: Build do Frontend

```bash
npm run build
```

Isso cria uma pasta `dist/` com os arquivos prontos para upload.

### Passo 2: Upload via FTP/cPanel

1. **Acesse o cPanel da Hostinger**
   - Vá em https://hpanel.hostinger.com
   - Entre com suas credenciais

2. **Vá no Gerenciador de Arquivos** (File Manager)
   - Navegue até a pasta `public_html` (ou a pasta do seu domínio)

3. **Limpe a pasta** (remova arquivos antigos se houver)

4. **Faça upload dos arquivos da pasta `dist/`**
   - Selecione TODOS os arquivos dentro de `dist/`
   - Arraste para o File Manager
   - OU use o botão "Upload"

5. **Pronto!** Acesse seu domínio e o site estará no ar.

### ⚠️ IMPORTANTE: Configurar redirecionamento

Crie um arquivo `.htaccess` na pasta `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Isso garante que as rotas do React funcionem corretamente.

---

## 🎯 OPÇÃO 2: Deploy Completo (Frontend + Backend)

Para ter o tracking de conversões funcionando, você precisa hospedar o backend também.

### A. Backend na Hostinger (Node.js)

A Hostinger oferece hospedagem Node.js em alguns planos. Verifique se você tem:

1. **Acesse o hPanel**
2. Procure por "**Node.js**" ou "**SSH Access**"
3. Se tiver, continue:

#### Via SSH:

```bash
# 1. Conecte via SSH (credenciais no hPanel)
ssh usuario@seu-dominio.com

# 2. Navegue para a pasta da aplicação
cd domains/seu-dominio.com/public_html

# 3. Crie pasta para o backend
mkdir api
cd api

# 4. Faça upload dos arquivos do servidor
# (use FTP ou scp para copiar a pasta server/)

# 5. Instale dependências
npm install

# 6. Configure as variáveis de ambiente
nano .env
# Cole as configurações:
META_ACCESS_TOKEN=seu_token_aqui
PORT=3001
FRONTEND_URL=https://seu-dominio.com
NODE_ENV=production

# 7. Inicie o servidor (use PM2 para manter rodando)
npm install -g pm2
pm2 start server.js --name meta-api
pm2 save
pm2 startup
```

### B. Backend em VPS Separada (Alternativa)

Se a Hostinger não tiver Node.js hosting, você pode usar:

**Serviços gratuitos para backend:**
- **Railway.app** (Recomendado)
- **Render.com**
- **Fly.io**

#### Deploy no Railway (FÁCIL):

1. Acesse https://railway.app
2. Conecte com GitHub
3. Crie novo projeto
4. Faça upload da pasta `server/`
5. Configure variáveis de ambiente:
   - `META_ACCESS_TOKEN`
   - `FRONTEND_URL` (seu domínio da Hostinger)
   - `NODE_ENV=production`
6. Deploy automático!
7. Copie a URL que o Railway gerar (ex: `https://sua-api.up.railway.app`)

### C. Atualizar Frontend para usar Backend em Produção

Edite o arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://sua-api.up.railway.app/api/events
```

Depois faça o build novamente:

```bash
npm run build
```

E faça upload da nova pasta `dist/` para a Hostinger.

---

## 📝 Checklist de Deploy

### Frontend:
- [ ] Build concluído (`npm run build`)
- [ ] Arquivos da pasta `dist/` enviados para `public_html`
- [ ] Arquivo `.htaccess` criado
- [ ] Site acessível pelo domínio
- [ ] Imagens carregando corretamente
- [ ] Rotas funcionando (testar navegação)

### Backend (se aplicável):
- [ ] Servidor Node.js rodando
- [ ] Variáveis de ambiente configuradas
- [ ] Token do Meta configurado corretamente
- [ ] CORS configurado para aceitar seu domínio
- [ ] Endpoints testados
- [ ] Eventos chegando no Meta

---

## 🔧 Comandos Úteis

### Build para produção
```bash
npm run build
```

### Preview local do build
```bash
npm run preview
```

### Testar se o build está OK
Abra `http://localhost:4173` e navegue pelo site.

---

## 🌐 Configurações DNS (se necessário)

Se você quiser um subdomínio para a API (ex: `api.seu-dominio.com`):

1. Vá em **DNS Zone Editor** no hPanel
2. Adicione um registro **A** ou **CNAME**:
   - Nome: `api`
   - Aponta para: IP do seu servidor backend

---

## 🐛 Troubleshooting

### Site mostra página em branco
**Solução:** Verifique se criou o `.htaccess` corretamente

### Erro 404 nas rotas
**Solução:** O `.htaccess` está configurado? Veja a seção acima.

### Imagens não carregam
**Solução:** Verifique se os arquivos estão na pasta correta e o caminho está relativo (começando com `./` ou `/`)

### CORS error no backend
**Solução:** Atualize `FRONTEND_URL` no `.env` do backend para seu domínio real:
```env
FRONTEND_URL=https://seu-dominio.com
```

### Eventos não chegam no Meta
**Checklist:**
- Backend está rodando?
- Token está correto?
- `.env` tem `NODE_ENV=production`?
- Remova `META_TEST_EVENT_CODE` em produção

---

## 📊 Monitorar Eventos em Produção

1. Acesse https://business.facebook.com/events_manager
2. Selecione seu Pixel (2020158598758649)
3. Vá em "**Overview**" (não Test Events)
4. Você verá eventos reais chegando!

---

## 🚀 Método Rápido (Apenas Frontend)

Se quiser colocar o site no ar AGORA sem complicação:

```bash
# 1. Build
npm run build

# 2. Zipar a pasta dist
# (Windows: clique direito > Enviar para > Pasta compactada)

# 3. Upload no hPanel
# - File Manager > public_html
# - Upload do zip
# - Extrair
# - Mover arquivos de dentro de dist/ para public_html/

# 4. Criar .htaccess

# 5. Pronto! Site no ar
```

**Depois** você configura o backend para ter tracking.

---

## 💡 Dica Final

**Comece simples:**
1. Suba apenas o frontend primeiro
2. Teste se o site está funcionando
3. Depois configure o backend para tracking

Não tente fazer tudo de uma vez!

---

## 📞 Próximos Passos

Depois do deploy:
1. Teste todas as páginas
2. Verifique responsividade mobile
3. Teste os links do WhatsApp
4. Configure Google Analytics (se quiser)
5. Configure SSL (HTTPS) - Hostinger faz automaticamente

**Domínio SSL:** A Hostinger ativa SSL automático, mas pode levar até 24h.

---

**Precisa de ajuda específica com algum passo?** Me avise qual parte você está fazendo!
