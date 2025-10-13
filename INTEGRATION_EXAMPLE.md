# 🔌 Exemplo de Integração - Meta Conversions API

Este arquivo mostra como integrar os eventos do Meta nos componentes existentes do site.

## 📝 Configuração Inicial

### 1. Adicionar variável de ambiente no frontend

Crie/edite o arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001/api/events
```

### 2. Iniciar o servidor backend

```bash
cd server
npm run dev
```

O servidor rodará em `http://localhost:3001`

## 🎯 Exemplos de Integração nos Componentes

### Exemplo 1: Rastrear cliques nos botões de WhatsApp

Atualize os componentes que têm botões de WhatsApp para enviar eventos de Lead:

```tsx
// src/components/Hero.tsx (ou qualquer componente com botão WhatsApp)
import { metaEvents } from '@/utils/metaEvents';

const Hero = () => {
  const handleConsulta = async () => {
    try {
      // Envia evento de Lead para o Meta
      await metaEvents.lead({
        // Se você coletar email em algum formulário antes, passe aqui
        // email: userEmail,
      });

      console.log('Evento de Lead enviado ao Meta');
    } catch (error) {
      console.error('Erro ao enviar evento:', error);
    } finally {
      // Abre o WhatsApp independentemente do sucesso do evento
      window.open(
        'https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.',
        '_blank'
      );
    }
  };

  return (
    // ... resto do componente
    <Button onClick={handleConsulta}>
      Agende sua consulta
    </Button>
  );
};
```

### Exemplo 2: Rastrear visualização de seções importantes

```tsx
// src/components/Services.tsx
import { useEffect } from 'react';
import { metaEvents } from '@/utils/metaEvents';

const Services = () => {
  useEffect(() => {
    // Envia evento quando o usuário visualiza a seção de serviços
    metaEvents.viewContent({
      contentName: 'Serviços de Nutrição',
      contentCategory: 'services',
    });
  }, []);

  return (
    // ... componente
  );
};
```

### Exemplo 3: Criar componente de formulário com tracking

```tsx
// Exemplo: src/components/ContactForm.tsx (se você criar um)
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { metaEvents } from '@/utils/metaEvents';
import { useToast } from '@/hooks/use-toast';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envia evento de Lead para o Meta
      const result = await metaEvents.lead({
        email: formData.email,
        firstName: formData.name,
        phone: formData.phone,
      });

      if (result.success) {
        console.log('Evento enviado ao Meta:', result.eventId);
      }

      // Processa o formulário (ex: enviar para sua API)
      // await saveContact(formData);

      toast({
        title: 'Mensagem enviada!',
        description: 'Entraremos em contato em breve.',
      });

      // Abre WhatsApp
      window.open(
        `https://wa.me/5583986547947?text=Olá! Sou ${formData.name}`,
        '_blank'
      );
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar a mensagem.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nome"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        type="tel"
        placeholder="Telefone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};
```

### Exemplo 4: Evento customizado para ações específicas

```tsx
// Rastrear quando usuário clica em eventos/workshops
const Events = () => {
  const handleEventClick = async (eventName: string) => {
    await metaEvents.custom({
      eventName: 'EventInterest',
      customData: {
        event_name: eventName,
        category: 'workshops',
      },
    });
  };

  return (
    // ... componente com cards de eventos
    <Button onClick={() => handleEventClick('Workshop de Nutrição')}>
      Saiba mais
    </Button>
  );
};
```

## 🎨 Padrão Recomendado

### Criar um hook customizado (opcional)

```tsx
// src/hooks/useMetaTracking.ts
import { metaEvents } from '@/utils/metaEvents';
import { useCallback } from 'react';

export function useMetaTracking() {
  const trackWhatsAppClick = useCallback(async (location: string) => {
    try {
      await metaEvents.custom({
        eventName: 'WhatsAppClick',
        customData: {
          button_location: location,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  }, []);

  const trackPageView = useCallback(async (pageName: string) => {
    try {
      await metaEvents.viewContent({
        contentName: pageName,
        contentCategory: 'page_view',
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  }, []);

  return {
    trackWhatsAppClick,
    trackPageView,
  };
}

// Uso:
const MyComponent = () => {
  const { trackWhatsAppClick } = useMetaTracking();

  const handleClick = async () => {
    await trackWhatsAppClick('hero');
    window.open('https://wa.me/...', '_blank');
  };

  return <Button onClick={handleClick}>Contato</Button>;
};
```

## 🔄 Fluxo Completo de Conversão

### Jornada do Usuário:

1. **Visualização** → `ViewContent`
2. **Interesse** → Evento customizado
3. **Contato/Lead** → `Lead`
4. **Agendamento** → Evento customizado
5. **Compra** (se aplicável) → `Purchase`

### Implementação:

```tsx
// 1. Usuário entra no site
useEffect(() => {
  metaEvents.viewContent({
    contentName: 'Home',
    contentCategory: 'landing_page',
  });
}, []);

// 2. Usuário clica em "Saiba Mais" sobre serviços
const handleLearnMore = async () => {
  await metaEvents.custom({
    eventName: 'ServiceInterest',
    customData: {
      service_type: 'consultoria_nutricional',
    },
  });
};

// 3. Usuário clica para agendar consulta (Lead)
const handleSchedule = async () => {
  await metaEvents.lead({
    email: userEmail, // se disponível
  });

  window.open('https://wa.me/5583986547947...', '_blank');
};

// 4. Usuário agenda (pode ser rastreado via webhook do calendário)
const handleConfirmAppointment = async () => {
  await metaEvents.custom({
    eventName: 'AppointmentBooked',
    customData: {
      appointment_date: selectedDate,
      service_type: selectedService,
    },
  });
};

// 5. Se houver pagamento
const handlePaymentSuccess = async (orderData) => {
  await metaEvents.purchase({
    email: orderData.email,
    value: orderData.amount,
    orderId: orderData.id,
    currency: 'BRL',
  });
};
```

## ⚡ Dicas de Otimização

### 1. Não bloquear a UI

```tsx
// ❌ Ruim - espera o evento antes de abrir WhatsApp
const handleClick = async () => {
  await metaEvents.lead({});
  window.open('https://wa.me/...', '_blank');
};

// ✅ Bom - envia evento mas não espera resposta
const handleClick = () => {
  metaEvents.lead({}); // Fire and forget
  window.open('https://wa.me/...', '_blank');
};

// ✅ Melhor - trata erros mas não bloqueia
const handleClick = async () => {
  try {
    await metaEvents.lead({});
  } catch (error) {
    console.error('Tracking failed:', error);
  } finally {
    window.open('https://wa.me/...', '_blank');
  }
};
```

### 2. Usar event IDs consistentes

```tsx
// Para deduplicação entre Pixel e Conversions API
const eventId = `lead_${Date.now()}_${Math.random().toString(36)}`;

// No frontend (Pixel)
fbq('track', 'Lead', { email: '...' }, { eventID: eventId });

// No backend (via API)
await metaEvents.lead({ email: '...', eventId });
```

### 3. Condicionar tracking baseado em consentimento (LGPD)

```tsx
const handleClick = async () => {
  // Só rastreia se usuário deu consentimento
  if (userConsent.analytics) {
    await metaEvents.lead({});
  }

  window.open('https://wa.me/...', '_blank');
};
```

## 📊 Verificar Eventos

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager)
2. Selecione o Pixel (ID: 2020158598758649)
3. Vá em **Eventos de Teste** (em desenvolvimento)
4. Realize ações no site
5. Veja os eventos chegando em tempo real

## 🚀 Próximos Passos

1. ✅ Configure o servidor backend (veja `server/README.md`)
2. ✅ Adicione tracking nos componentes principais
3. ✅ Teste em desenvolvimento
4. ✅ Verifique eventos no Meta Events Manager
5. ✅ Deploy para produção

---

**Precisa de ajuda?** Consulte o `server/README.md` para mais detalhes sobre o backend.
