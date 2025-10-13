# 📤 Passo a Passo SIMPLES - Upload na Hostinger

## ✅ TUDO PRONTO! Arquivos gerados com sucesso

Sua pasta `dist/` está pronta com:
- ✅ Site buildado
- ✅ Arquivo .htaccess configurado
- ✅ Todas as imagens otimizadas

---

## 🚀 PASSO A PASSO (5 minutos)

### 1️⃣ Acesse o hPanel da Hostinger

1. Vá em: https://hpanel.hostinger.com
2. Faça login
3. Clique no seu site/domínio

### 2️⃣ Abra o Gerenciador de Arquivos

1. No painel, procure "**Gerenciador de Arquivos**" ou "**File Manager**"
2. Clique para abrir

### 3️⃣ Navegue até a pasta do site

1. Abra a pasta `public_html` (ou a pasta do seu domínio)
2. **IMPORTANTE:** Delete tudo que está dentro (se houver arquivos antigos)
   - Selecione todos os arquivos
   - Clique em "Delete" ou ícone de lixeira
   - Confirme

### 4️⃣ Faça Upload dos Arquivos

**MÉTODO 1 - Arrastar e Soltar (Recomendado):**

1. Abra a pasta `dist/` no seu computador
   - Caminho: `C:\Users\msnin\nutritivo-glow-site\dist`

2. Selecione **TODOS** os arquivos dentro de `dist/`
   - **NÃO selecione a pasta dist, apenas o conteúdo**
   - Deve incluir:
     - index.html
     - .htaccess
     - pasta `assets/`
     - favicon.svg
     - etc.

3. Arraste os arquivos para o File Manager da Hostinger
   - Solte na área de `public_html`

4. Aguarde o upload completar (pode levar alguns minutos)

**MÉTODO 2 - Upload Manual:**

1. No File Manager, clique em "**Upload**" ou ícone de upload ⬆️
2. Selecione todos os arquivos da pasta `dist/`
3. Clique em "Upload"
4. Aguarde concluir

### 5️⃣ Verifique os Arquivos

Certifique-se de que você tem na pasta `public_html`:

```
public_html/
├── index.html          ✅
├── .htaccess          ✅
├── favicon.svg        ✅
└── assets/            ✅
    ├── index-CDng0Zrf.js
    ├── index-CN-EQSMZ.css
    ├── logo-black-Bc15E4zk.png
    └── (outras imagens...)
```

### 6️⃣ Teste o Site

1. Abra seu domínio no navegador
   - Exemplo: `https://seu-dominio.com`

2. O site deve carregar perfeitamente!

3. Teste:
   - ✅ Navegação entre páginas
   - ✅ Imagens carregando
   - ✅ Botões do WhatsApp funcionando
   - ✅ Responsividade (abra no celular)

---

## 🎯 RESUMO ULTRA-RÁPIDO

```
1. Hostinger → hPanel → File Manager
2. Abrir public_html
3. Deletar tudo que está lá dentro
4. Arrastar arquivos de dist/ para public_html
5. Pronto! Acesse seu domínio
```

---

## ⚠️ Problemas Comuns

### Site mostra "pasta vazia" ou lista de arquivos
**Causa:** Você enviou a pasta `dist/` inteira
**Solução:** Envie apenas o CONTEÚDO de dentro da pasta dist/

### Erro 404 ao navegar
**Causa:** Falta o arquivo .htaccess
**Solução:** Certifique-se de enviar o arquivo .htaccess também

### Imagens não carregam
**Causa:** Pasta assets/ não foi enviada
**Solução:** Envie a pasta assets/ junto com os outros arquivos

### SSL/HTTPS não funciona
**Solução:**
- Vá em hPanel > SSL
- Ative "Force HTTPS"
- Aguarde até 24h (geralmente instantâneo)

---

## 📱 Depois do Upload

### Configurações Recomendadas no hPanel:

1. **SSL/HTTPS:**
   - hPanel → SSL → Force HTTPS: ON

2. **Cache:**
   - hPanel → Speed → Cloudflare: ON (se disponível)

3. **Domínio:**
   - Verifique se está apontando corretamente

---

## 🔄 Atualizações Futuras

Quando precisar atualizar o site:

```bash
# 1. No seu computador
npm run build

# 2. Hostinger - File Manager
# Delete arquivos antigos em public_html

# 3. Upload nova pasta dist/

# Pronto!
```

---

## 📊 Checklist Final

- [ ] Build concluído
- [ ] Pasta dist/ tem todos os arquivos
- [ ] File Manager aberto
- [ ] public_html limpo (sem arquivos antigos)
- [ ] Todos arquivos da dist/ enviados
- [ ] Site carregando no domínio
- [ ] Teste no mobile
- [ ] Links do WhatsApp funcionando
- [ ] SSL ativo (HTTPS)

---

## 🎉 Pronto!

Seu site está no ar! 🚀

**Qualquer problema:**
- Verifique se TODOS os arquivos foram enviados
- Veja se o .htaccess está lá
- Limpe o cache do navegador (Ctrl+F5)

---

**Arquivos prontos em:** `C:\Users\msnin\nutritivo-glow-site\dist\`

**Próximo passo:** Arraste e solte no File Manager da Hostinger!
