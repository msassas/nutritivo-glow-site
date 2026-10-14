# Como Fazer Deploy na Hostinger

## Problema Resolvido
O erro "Cannot read properties of undefined (reading 'createContext')" acontecia porque:
1. Os chunks estavam sendo carregados na ordem errada
2. O base path não estava configurado corretamente para ambientes não-root

## Passo a Passo para Deploy

### 1. Fazer Build do Projeto
npm run build

### 2. Acessar File Manager da Hostinger
1. Acesse o painel da Hostinger
2. Vá em "File Manager"
3. Navegue até "public_html"

### 3. Limpar Pasta (IMPORTANTE)
Delete TODOS os arquivos antigos de dentro de public_html

### 4. Upload dos Arquivos
Faça upload de TODOS os arquivos da pasta "dist/" para "public_html/":
- index.html
- .htaccess
- favicon-32x32.png
- nutritionist-about.webp
- robots.txt
- sitemap.xml
- _headers
- Pasta "assets/" COMPLETA (css, js, images)

### 5. Verificar Estrutura
A pasta public_html deve ficar assim:
public_html/
  ├── index.html
  ├── .htaccess
  └── assets/
      ├── css/
      ├── js/
      └── images/

### 6. Testar
Acesse seu site e teste:
- Site carrega sem tela branca
- Sem erros no console (F12)
- Imagens carregando
- Navegação funcionando

## Correções Aplicadas

1. vite.config.ts: Adicionado "base: './'" para suportar qualquer diretório
2. Simplificado code splitting: React agora carrega primeiro
3. Criado .htaccess com compressão, cache e SPA routing

## Se Continuar com Tela Branca

1. Verifique se o .htaccess foi enviado (ele pode estar oculto)
2. Limpe o cache do navegador (Ctrl+Shift+Delete)
3. Abra em modo anônimo
4. Verifique o console (F12) para ver qual arquivo não está carregando
