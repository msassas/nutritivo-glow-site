/**
 * Utilitário para enviar eventos do Meta via Conversions API
 *
 * Este arquivo facilita o envio de eventos do frontend para o servidor backend,
 * que então os encaminha para a API de Conversões do Meta.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/events';

interface MetaEventResponse {
  success: boolean;
  eventId?: string;
  eventName?: string;
  error?: string;
}

interface LeadData {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  eventId?: string;
}

interface PurchaseData {
  email?: string;
  phone?: string;
  value: number;
  currency?: string;
  orderId: string;
  items?: Array<{
    id: string;
    quantity: number;
    price: number;
  }>;
}

interface AddToCartData {
  productId: string;
  productName?: string;
  price: number;
  quantity?: number;
}

interface ViewContentData {
  contentName?: string;
  contentCategory?: string;
  contentId?: string;
  value?: number;
  eventId?: string;
}

interface CustomEventData {
  eventName: string;
  email?: string;
  phone?: string;
  customData?: Record<string, any>;
}

/**
 * Função auxiliar para fazer requisições à API
 */
async function sendEvent<T>(endpoint: string, data: T): Promise<MetaEventResponse> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Importante para enviar cookies _fbp e _fbc
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao enviar evento');
    }

    return await response.json();
  } catch (error) {
    console.error('[Meta Events] Erro:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Eventos do Meta
 */
export const metaEvents = {
  /**
   * Envia evento de Lead (formulário de contato, newsletter, etc.)
   *
   * @example
   * await metaEvents.lead({
   *   email: 'usuario@exemplo.com',
   *   firstName: 'João',
   *   phone: '83994173887'
   * });
   */
  lead: (data: LeadData): Promise<MetaEventResponse> => {
    return sendEvent('/lead', data);
  },

  /**
   * Envia evento de Purchase (compra concluída)
   *
   * @example
   * await metaEvents.purchase({
   *   email: 'usuario@exemplo.com',
   *   value: 299.90,
   *   currency: 'BRL',
   *   orderId: 'PED12345',
   *   items: [{ id: 'PROD1', quantity: 1, price: 299.90 }]
   * });
   */
  purchase: (data: PurchaseData): Promise<MetaEventResponse> => {
    return sendEvent('/purchase', data);
  },

  /**
   * Envia evento de AddToCart (adicionar ao carrinho)
   *
   * @example
   * await metaEvents.addToCart({
   *   productId: 'PROD123',
   *   productName: 'Plano de Nutrição',
   *   price: 199.90,
   *   quantity: 1
   * });
   */
  addToCart: (data: AddToCartData): Promise<MetaEventResponse> => {
    return sendEvent('/add-to-cart', data);
  },

  /**
   * Envia evento de ViewContent (visualização de página/produto)
   *
   * @example
   * await metaEvents.viewContent({
   *   contentName: 'Página de Serviços',
   *   contentCategory: 'servicos',
   *   contentId: 'SERV001'
   * });
   */
  viewContent: (data: ViewContentData): Promise<MetaEventResponse> => {
    return sendEvent('/view-content', data);
  },

  /**
   * Envia evento de InitiateCheckout (início do checkout)
   *
   * @example
   * await metaEvents.initiateCheckout({
   *   email: 'usuario@exemplo.com',
   *   value: 299.90,
   *   items: [{ id: 'PROD1', quantity: 1 }]
   * });
   */
  initiateCheckout: (data: { email?: string; value: number; items?: any[] }): Promise<MetaEventResponse> => {
    return sendEvent('/initiate-checkout', data);
  },

  /**
   * Envia evento de CompleteRegistration (cadastro completo)
   *
   * @example
   * await metaEvents.completeRegistration({
   *   email: 'usuario@exemplo.com',
   *   firstName: 'Maria',
   *   lastName: 'Silva',
   *   phone: '83994173887'
   * });
   */
  completeRegistration: (data: LeadData): Promise<MetaEventResponse> => {
    return sendEvent('/complete-registration', data);
  },

  /**
   * Envia evento customizado
   *
   * @example
   * await metaEvents.custom({
   *   eventName: 'WhatsAppClick',
   *   customData: {
   *     button_location: 'hero',
   *     page: 'home'
   *   }
   * });
   */
  custom: (data: CustomEventData): Promise<MetaEventResponse> => {
    return sendEvent('/custom', data);
  },

  /**
   * Envia evento de PageView
   *
   * @example
   * await metaEvents.pageView({
   *   url: window.location.href,
   *   eventId: 'pageview_' + Date.now()
   * });
   */
  pageView: (data: { url?: string; referrer?: string; eventId?: string }): Promise<MetaEventResponse> => {
    return sendEvent('/pageview', data);
  },
};

/**
 * Hook para uso em componentes React (opcional)
 */
export function useMetaEvents() {
  return metaEvents;
}
