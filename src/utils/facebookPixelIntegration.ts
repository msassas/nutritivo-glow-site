/**
 * Integração Facebook Pixel com Conversions API
 *
 * Este arquivo garante que TODOS os eventos do Pixel também sejam enviados
 * para o servidor (Conversions API), aumentando a taxa de cobertura para 75%+
 */

import { metaEvents } from './metaEvents';

// Gera um ID único para cada evento (usado para deduplicação)
function generateEventId(eventName: string): string {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Armazena o último eventId para cada tipo de evento
const eventIdCache = new Map<string, string>();

/**
 * Envia evento tanto para o Pixel (frontend) quanto para CAPI (backend)
 * usando o MESMO eventId para evitar duplicação
 */
export async function trackEvent(
  eventName: string,
  eventData?: any,
  pixelData?: any
) {
  const eventId = generateEventId(eventName);
  eventIdCache.set(eventName, eventId);

  // 1. Envia para o Pixel do Facebook (frontend)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, pixelData || {}, { eventID: eventId });
      console.log(`[Facebook Pixel] ${eventName} enviado (eventId: ${eventId})`);
    } catch (error) {
      console.error(`[Facebook Pixel] Erro ao enviar ${eventName}:`, error);
    }
  }

  // 2. Envia para a Conversions API (backend via servidor)
  try {
    let response;

    switch (eventName) {
      case 'PageView':
        response = await metaEvents.pageView({
          url: window.location.href,
          referrer: document.referrer,
          eventId
        });
        break;

      case 'Lead':
        response = await metaEvents.lead({
          email: eventData?.email,
          firstName: eventData?.firstName,
          phone: eventData?.phone,
          eventId
        });
        break;

      case 'ViewContent':
        response = await metaEvents.viewContent({
          ...eventData,
          eventId
        } as any);
        break;

      case 'AddToCart':
        response = await metaEvents.addToCart({
          ...eventData,
          eventId
        } as any);
        break;

      case 'InitiateCheckout':
        response = await metaEvents.initiateCheckout({
          ...eventData,
          eventId
        } as any);
        break;

      case 'Purchase':
        response = await metaEvents.purchase({
          ...eventData,
          eventId
        } as any);
        break;

      case 'CompleteRegistration':
        response = await metaEvents.completeRegistration({
          ...eventData,
          eventId
        } as any);
        break;

      default:
        response = await metaEvents.custom({
          eventName,
          ...eventData,
          eventId
        } as any);
    }

    if (response?.success) {
      console.log(`[Conversions API] ${eventName} enviado com sucesso (eventId: ${eventId})`);
    }
  } catch (error) {
    console.error(`[Conversions API] Erro ao enviar ${eventName}:`, error);
    // Não lança erro - evento do Pixel já foi enviado
  }
}

/**
 * Hook para rastrear PageView automaticamente
 * Deve ser chamado no componente principal (App.tsx)
 */
export function initializePageViewTracking() {
  if (typeof window === 'undefined') return;

  // Rastreia PageView inicial
  trackEvent('PageView');

  // Rastreia PageView em mudanças de rota (SPA)
  let lastPath = window.location.pathname;

  const observer = new MutationObserver(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      trackEvent('PageView');
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => observer.disconnect();
}

/**
 * Funções auxiliares para eventos específicos
 */
export const trackPageView = () => trackEvent('PageView');

export const trackLead = (data: { email?: string; firstName?: string; phone?: string }) =>
  trackEvent('Lead', data);

export const trackViewContent = (data: {
  contentName?: string;
  contentCategory?: string;
  contentId?: string;
  value?: number;
}) => trackEvent('ViewContent', data, {
  content_name: data.contentName,
  content_category: data.contentCategory
});

export const trackAddToCart = (data: {
  productId: string;
  productName?: string;
  price: number;
  quantity?: number;
}) => trackEvent('AddToCart', data, {
  value: data.price * (data.quantity || 1),
  currency: 'BRL',
  content_ids: [data.productId],
  content_name: data.productName
});

export const trackInitiateCheckout = (data: {
  email?: string;
  value: number;
  items?: any[];
}) => trackEvent('InitiateCheckout', data, {
  value: data.value,
  currency: 'BRL'
});

export const trackPurchase = (data: {
  email?: string;
  phone?: string;
  value: number;
  currency?: string;
  orderId: string;
  items?: any[];
}) => trackEvent('Purchase', data, {
  value: data.value,
  currency: data.currency || 'BRL'
});

export const trackCompleteRegistration = (data: {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) => trackEvent('CompleteRegistration', data);

export const trackCustomEvent = (eventName: string, data?: any) =>
  trackEvent(eventName, data);
