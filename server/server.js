import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { enviarEventoMeta } from './meta-conversions-api.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS - permite requisições do frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    metaPixelId: '2020158598758649'
  });
});

// ====================================
// EVENTO PAGEVIEW (AUTOMÁTICO)
// ====================================

/**
 * Evento de PageView - enviado automaticamente em cada carregamento de página
 * POST /api/events/pageview
 * Body: { url, referrer, eventId }
 */
app.post('/api/events/pageview', async (req, res) => {
  try {
    const { url, referrer, eventId } = req.body;

    const result = await enviarEventoMeta(req, 'PageView', {
      customData: {
        content_name: url || 'Página Visitada',
        content_category: 'page',
      },
      eventId: eventId // Importante para deduplicação com o Pixel
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar pageview:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar pageview'
    });
  }
});

// ====================================
// EXEMPLOS DE ROTAS DE CONVERSÃO
// ====================================

/**
 * Exemplo 1: Evento de Lead (formulário de contato/newsletter)
 * POST /api/events/lead
 * Body: { email, firstName, phone }
 */
app.post('/api/events/lead', async (req, res) => {
  try {
    const { email, firstName, phone, eventId } = req.body;

    const result = await enviarEventoMeta(req, 'Lead', {
      email,
      firstName,
      phone,
      customData: {
        content_name: 'Botão WhatsApp - Agendamento',
        content_category: 'lead'
      },
      eventId: eventId // Importante para deduplicação com o Pixel
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar lead:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar lead'
    });
  }
});

/**
 * Exemplo 2: Evento de Purchase (compra concluída)
 * POST /api/events/purchase
 * Body: { email, value, currency, orderId, items }
 */
app.post('/api/events/purchase', async (req, res) => {
  try {
    const { email, phone, value, currency = 'BRL', orderId, items } = req.body;

    if (!email || !value) {
      return res.status(400).json({
        success: false,
        error: 'Email e valor são obrigatórios'
      });
    }

    const result = await enviarEventoMeta(req, 'Purchase', {
      email,
      phone,
      customData: {
        value: parseFloat(value),
        currency: currency,
        content_name: `Pedido #${orderId}`,
        content_type: 'product',
        content_ids: items?.map(item => item.id) || [],
        contents: items?.map(item => ({
          id: item.id,
          quantity: item.quantity,
          item_price: item.price
        })) || [],
        num_items: items?.reduce((sum, item) => sum + item.quantity, 0) || 1
      },
      eventId: orderId
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar purchase:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar compra'
    });
  }
});

/**
 * Exemplo 3: Evento de AddToCart (adicionar ao carrinho)
 * POST /api/events/add-to-cart
 * Body: { productId, productName, price, quantity }
 */
app.post('/api/events/add-to-cart', async (req, res) => {
  try {
    const { productId, productName, price, quantity = 1 } = req.body;

    if (!productId || !price) {
      return res.status(400).json({
        success: false,
        error: 'Product ID e preço são obrigatórios'
      });
    }

    const result = await enviarEventoMeta(req, 'AddToCart', {
      customData: {
        value: parseFloat(price) * quantity,
        currency: 'BRL',
        content_name: productName,
        content_type: 'product',
        content_ids: [productId],
        contents: [{
          id: productId,
          quantity: quantity,
          item_price: parseFloat(price)
        }]
      }
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar add to cart:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao adicionar ao carrinho'
    });
  }
});

/**
 * Exemplo 4: Evento de ViewContent (visualização de produto/página)
 * POST /api/events/view-content
 * Body: { contentName, contentCategory, contentId, value }
 */
app.post('/api/events/view-content', async (req, res) => {
  try {
    const { contentName, contentCategory, contentId, value } = req.body;

    const result = await enviarEventoMeta(req, 'ViewContent', {
      customData: {
        content_name: contentName,
        content_category: contentCategory,
        content_ids: contentId ? [contentId] : [],
        value: value ? parseFloat(value) : undefined,
        currency: 'BRL'
      }
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar view content:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar visualização'
    });
  }
});

/**
 * Exemplo 5: Evento de InitiateCheckout (início do checkout)
 * POST /api/events/initiate-checkout
 * Body: { email, value, items }
 */
app.post('/api/events/initiate-checkout', async (req, res) => {
  try {
    const { email, value, items } = req.body;

    const result = await enviarEventoMeta(req, 'InitiateCheckout', {
      email,
      customData: {
        value: parseFloat(value),
        currency: 'BRL',
        content_ids: items?.map(item => item.id) || [],
        contents: items?.map(item => ({
          id: item.id,
          quantity: item.quantity
        })) || [],
        num_items: items?.reduce((sum, item) => sum + item.quantity, 0) || 1
      }
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar initiate checkout:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao iniciar checkout'
    });
  }
});

/**
 * Exemplo 6: Evento de CompleteRegistration (cadastro completo)
 * POST /api/events/complete-registration
 * Body: { email, firstName, lastName, phone }
 */
app.post('/api/events/complete-registration', async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email é obrigatório'
      });
    }

    const result = await enviarEventoMeta(req, 'CompleteRegistration', {
      email,
      firstName,
      lastName,
      phone,
      customData: {
        content_name: 'Cadastro de Usuário',
        status: 'completed'
      }
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar registration:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar cadastro'
    });
  }
});

// Rota genérica para eventos customizados
app.post('/api/events/custom', async (req, res) => {
  try {
    const { eventName, email, phone, customData } = req.body;

    if (!eventName) {
      return res.status(400).json({
        success: false,
        error: 'Nome do evento é obrigatório'
      });
    }

    const result = await enviarEventoMeta(req, eventName, {
      email,
      phone,
      customData
    });

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar evento custom:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Erro ao processar evento'
    });
  }
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada'
  });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Servidor Meta Conversions API iniciado!');
  console.log('='.repeat(60));
  console.log(`📡 Porta: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🎯 Meta Pixel ID: 2020158598758649`);
  console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(60));
  console.log('\n📚 Rotas disponíveis:');
  console.log('  POST /api/events/lead');
  console.log('  POST /api/events/purchase');
  console.log('  POST /api/events/add-to-cart');
  console.log('  POST /api/events/view-content');
  console.log('  POST /api/events/initiate-checkout');
  console.log('  POST /api/events/complete-registration');
  console.log('  POST /api/events/custom');
  console.log('='.repeat(60));

  if (!process.env.META_ACCESS_TOKEN) {
    console.warn('\n⚠️  AVISO: META_ACCESS_TOKEN não configurado!');
    console.warn('   Configure no arquivo .env antes de usar.\n');
  }
});

