/*
 * Origem do visitante + mensagem do WhatsApp por origem.
 * Carregado no index.html (site todo) e em /agendar/index.html (quiz).
 * Se mudar este arquivo, suba o ?v= nos dois <script src="/origem.js?v=...">,
 * porque o _headers manda o navegador guardar .js por 1 ano.
 *
 * Origem (prioridade): google_ads > meta_ads > instagram > google_organico > direto.
 * First touch por 30 dias, mas uma visita vinda de anúncio sempre sobrescreve.
 */
(function () {
  var KEY = 'ls_origem';
  var TTL = 30 * 24 * 60 * 60 * 1000;

  var FRASES = {
    google_ads: 'Vi o anúncio no Google e gostaria de agendar uma consulta.',
    meta_ads: 'Vi o anúncio no Instagram e gostaria de agendar uma consulta.',
    instagram: 'Vim pelo Instagram e gostaria de agendar uma consulta.',
    google_organico: 'Encontrei vocês no Google e gostaria de agendar uma consulta.'
  };

  function detectar() {
    var p;
    try { p = new URLSearchParams(location.search); } catch (e) { return 'direto'; }
    var src = (p.get('utm_source') || '').toLowerCase();
    var med = (p.get('utm_medium') || '').toLowerCase();

    if (p.get('gclid') || p.get('gbraid') || p.get('wbraid') ||
        (src === 'google' && (med === 'cpc' || med === 'paid'))) return 'google_ads';

    var srcMeta = /^(facebook|instagram|fb|ig)$/.test(src);
    if (srcMeta && (med === 'cpc' || med === 'paid' || med === 'paid_social')) return 'meta_ads';
    // utm do Instagram/Facebook sem mídia paga (ex.: link da bio, utm_medium=bio).
    if (srcMeta) return 'instagram';

    var host = '';
    try { host = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : ''; } catch (e) {}

    if (p.get('fbclid') || /(^|\.)(instagram|facebook)\.com$/.test(host)) return 'instagram';
    if (/(^|\.)google\.[a-z.]+$/.test(host)) return 'google_organico';
    return 'direto';
  }

  function ler() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s && s.o && typeof s.t === 'number' && Date.now() - s.t < TTL) return s.o;
    } catch (e) {}
    return null;
  }

  function salvar(o) {
    try { localStorage.setItem(KEY, JSON.stringify({ o: o, t: Date.now() })); } catch (e) {}
  }

  var atual = detectar();
  var salva = ler();
  var anuncio = atual === 'google_ads' || atual === 'meta_ads';
  if (!salva || anuncio) {
    salvar(atual);
    salva = atual;
  }
  // Sem localStorage (aba anônima bloqueada etc.) vale pelo menos a visita atual.
  window.__origem = salva || atual;

  // Troca só a primeira linha (a saudação) do texto. Mantém "Meu nome é X."
  // e todo o resto (as respostas do quiz vêm nas linhas seguintes).
  function novaMensagem(texto, origem) {
    var frase = FRASES[origem];
    if (!frase) return null;
    var linhas = String(texto || '').split('\n');
    var m = linhas[0].match(/^Olá!\s*(Meu nome é [^.\n]+\.)?/);
    if (m) {
      linhas[0] = 'Olá! ' + (m[1] ? m[1] + ' ' : '') + frase;
      return linhas.join('\n');
    }
    return 'Olá! ' + frase + (texto ? '\n\n' + texto : '');
  }

  // Só links de conversa com número. Links de compartilhar (wa.me/?text=) ficam de fora.
  var RE_WA = /wa\.me\/\d|api\.whatsapp\.com\/send\?(.*&)?phone=\d/;

  function reescrever(href, origem) {
    var url;
    try { url = new URL(href, location.href); } catch (e) { return null; }
    var texto = novaMensagem(url.searchParams.get('text'), origem);
    if (texto === null) return null;
    url.searchParams.set('text', texto);
    // URLSearchParams codifica espaço como "+"; o WhatsApp prefere %20.
    return url.toString().replace(/\+/g, '%20');
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!RE_WA.test(href)) return;
    var novo = reescrever(href, window.__origem);
    if (novo) a.setAttribute('href', novo);
  }, true);

  window.__origemMensagem = novaMensagem; // usado nos testes
})();
