import crypto from 'crypto';
import bizSdk from 'facebook-nodejs-business-sdk';

const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;

const PIXEL_ID = '2020158598758649';

/**
 * Gera hash SHA256 de um valor
 * @param {string} value - Valor para hash
 * @returns {string} Hash SHA256
 */
function hashSHA256(value) {
  if (!value) return null;
  return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

/**
 * Extrai o IP do cliente considerando proxies
 * @param {Object} req - Request do Express
 * @returns {string} IP do cliente
 */
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
         req.headers['x-real-ip'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.ip;
}

/**
 * Envia evento para a API de Conversões do Meta
 * @param {Object} req - Request do Express
 * @param {string} eventName - Nome do evento (Lead, Purchase, AddToCart, etc.)
 * @param {Object} options - Opções do evento
 * @param {Object} options.customData - Dados customizados do evento
 * @param {string} options.email - Email do usuário (opcional)
 * @param {string} options.phone - Telefone do usuário (opcional)
 * @param {string} options.firstName - Primeiro nome (opcional)
 * @param {string} options.lastName - Último nome (opcional)
 * @param {string} options.city - Cidade (opcional)
 * @param {string} options.state - Estado (opcional)
 * @param {string} options.zip - CEP (opcional)
 * @param {string} options.country - País (opcional, padrão: 'br')
 * @returns {Promise<Object>} Resposta da API
 */
export async function enviarEventoMeta(req, eventName, options = {}) {
  try {
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!accessToken) {
      throw new Error('META_ACCESS_TOKEN não configurado nas variáveis de ambiente');
    }

    console.log(`[Meta Conversions API] Enviando evento: ${eventName}`);

    // Configurar API
    const api = bizSdk.FacebookAdsApi.init(accessToken);
    api.setDebug(process.env.NODE_ENV === 'development');

    // Capturar dados do usuário
    const userData = new UserData();

    // IP do cliente
    const clientIP = getClientIP(req);
    if (clientIP) {
      userData.setClientIpAddress(clientIP);
    }

    // User Agent
    const userAgent = req.headers['user-agent'];
    if (userAgent) {
      userData.setClientUserAgent(userAgent);
    }

    // Cookies do Facebook Pixel (_fbp e _fbc)
    const fbp = req.cookies?._fbp;
    const fbc = req.cookies?._fbc || req.query?.fbclid ? `fb.1.${Date.now()}.${req.query.fbclid}` : null;

    if (fbp) {
      userData.setFbp(fbp);
      console.log('[Meta Conversions API] Cookie _fbp encontrado');
    }

    if (fbc) {
      userData.setFbc(fbc);
      console.log('[Meta Conversions API] Cookie _fbc ou fbclid encontrado');
    }

    // Dados pessoais com hash
    if (options.email) {
      userData.setEmail(hashSHA256(options.email));
      console.log('[Meta Conversions API] Email adicionado (com hash)');
    }

    if (options.phone) {
      // Remove caracteres especiais antes do hash
      const cleanPhone = options.phone.replace(/\D/g, '');
      userData.setPhone(hashSHA256(cleanPhone));
      console.log('[Meta Conversions API] Telefone adicionado (com hash)');
    }

    if (options.firstName) {
      userData.setFirstName(hashSHA256(options.firstName));
    }

    if (options.lastName) {
      userData.setLastName(hashSHA256(options.lastName));
    }

    if (options.city) {
      userData.setCity(hashSHA256(options.city));
    }

    if (options.state) {
      userData.setState(hashSHA256(options.state));
    }

    if (options.zip) {
      userData.setZipCode(hashSHA256(options.zip));
    }

    // Dados customizados do evento
    let customData = null;
    if (options.customData) {
      customData = new CustomData();

      if (options.customData.value) {
        customData.setValue(options.customData.value);
      }

      if (options.customData.currency) {
        customData.setCurrency(options.customData.currency);
      }

      if (options.customData.content_name) {
        customData.setContentName(options.customData.content_name);
      }

      if (options.customData.content_category) {
        customData.setContentCategory(options.customData.content_category);
      }

      if (options.customData.content_ids) {
        customData.setContentIds(options.customData.content_ids);
      }

      if (options.customData.contents) {
        customData.setContents(options.customData.contents);
      }

      if (options.customData.num_items) {
        customData.setNumItems(options.customData.num_items);
      }
    }

    // Criar evento do servidor
    const serverEvent = new ServerEvent();
    serverEvent.setEventName(eventName);
    serverEvent.setEventTime(Math.floor(Date.now() / 1000));
    serverEvent.setUserData(userData);
    serverEvent.setEventSourceUrl(req.headers.referer || req.headers.origin || '');
    serverEvent.setActionSource('website');

    if (customData) {
      serverEvent.setCustomData(customData);
    }

    // Event ID para deduplicação com o Pixel do frontend
    const eventId = options.eventId || `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    serverEvent.setEventId(eventId);

    // Enviar evento
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(accessToken, PIXEL_ID);
    eventRequest.setEvents(eventsData);

    if (process.env.NODE_ENV === 'development') {
      eventRequest.setTestEventCode(process.env.META_TEST_EVENT_CODE || 'TEST12345');
      console.log('[Meta Conversions API] Modo de teste ativado');
    }

    const response = await eventRequest.execute();

    console.log(`[Meta Conversions API] Evento ${eventName} enviado com sucesso`);
    console.log('[Meta Conversions API] Event ID:', eventId);

    return {
      success: true,
      eventId,
      eventName,
      response: response
    };

  } catch (error) {
    console.error('[Meta Conversions API] Erro ao enviar evento:', error.message);
    console.error('[Meta Conversions API] Stack:', error.stack);

    throw {
      success: false,
      error: error.message,
      eventName
    };
  }
}
