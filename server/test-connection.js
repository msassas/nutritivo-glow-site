/**
 * Script de Teste - Facebook Conversions API
 *
 * Use este script para testar se seu Token de Acesso está funcionando
 * antes de iniciar o servidor completo.
 *
 * Como usar:
 * 1. Configure o META_ACCESS_TOKEN no arquivo .env
 * 2. Execute: node test-connection.js
 */

import 'dotenv/config';
import bizSdk from 'facebook-nodejs-business-sdk';

const ServerEvent = bizSdk.ServerEvent;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const CustomData = bizSdk.CustomData;

const PIXEL_ID = '2020158598758649';

async function testConnection() {
  console.log('='.repeat(60));
  console.log('🧪 TESTE DE CONEXÃO - Facebook Conversions API');
  console.log('='.repeat(60));
  console.log('');

  // Verificar variáveis de ambiente
  console.log('📋 Verificando configuração...');
  console.log('');

  const accessToken = process.env.META_ACCESS_TOKEN;
  const pixelId = PIXEL_ID;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!accessToken) {
    console.error('❌ ERRO: META_ACCESS_TOKEN não encontrado no .env');
    console.log('');
    console.log('💡 Solução:');
    console.log('   1. Copie o arquivo .env.example para .env');
    console.log('   2. Adicione seu token de acesso no .env');
    console.log('   3. Execute este script novamente');
    console.log('');
    process.exit(1);
  }

  console.log('✅ META_ACCESS_TOKEN: Configurado');
  console.log(`✅ PIXEL_ID: ${pixelId}`);

  if (testEventCode) {
    console.log(`✅ TEST_EVENT_CODE: ${testEventCode}`);
  } else {
    console.log('⚠️  TEST_EVENT_CODE: Não configurado (opcional)');
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('🚀 Enviando evento de teste...');
  console.log('='.repeat(60));
  console.log('');

  try {
    // Configurar API
    const api = bizSdk.FacebookAdsApi.init(accessToken);
    api.setDebug(true);

    // Criar dados do usuário
    const userData = new UserData();
    userData.setClientIpAddress('127.0.0.1');
    userData.setClientUserAgent('Mozilla/5.0 (Test Script)');

    // Criar dados customizados
    const customData = new CustomData();
    customData.setValue(0);
    customData.setCurrency('BRL');
    customData.setContentName('Teste de Conexão');
    customData.setContentCategory('test');

    // Criar evento
    const serverEvent = new ServerEvent();
    serverEvent.setEventName('PageView');
    serverEvent.setEventTime(Math.floor(Date.now() / 1000));
    serverEvent.setUserData(userData);
    serverEvent.setCustomData(customData);
    serverEvent.setEventSourceUrl('http://localhost:3001/test');
    serverEvent.setActionSource('website');
    serverEvent.setEventId(`test_${Date.now()}`);

    // Enviar evento
    const eventsData = [serverEvent];
    const eventRequest = new EventRequest(accessToken, pixelId);
    eventRequest.setEvents(eventsData);

    if (testEventCode) {
      eventRequest.setTestEventCode(testEventCode);
      console.log('📡 Enviando para Test Events (modo desenvolvimento)...');
    } else {
      console.log('📡 Enviando para eventos reais...');
    }

    const response = await eventRequest.execute();

    console.log('');
    console.log('='.repeat(60));
    console.log('✅ SUCESSO! Conexão estabelecida com sucesso!');
    console.log('='.repeat(60));
    console.log('');

    if (testEventCode) {
      console.log('📊 Verificar evento de teste:');
      console.log('   1. Acesse: https://business.facebook.com/events_manager2/list');
      console.log('   2. Selecione seu Pixel: 2020158598758649');
      console.log('   3. Clique em "Eventos de Teste" (Test Events)');
      console.log('   4. Você verá o evento PageView de teste');
    } else {
      console.log('📊 Verificar evento:');
      console.log('   1. Acesse: https://business.facebook.com/events_manager2/list');
      console.log('   2. Selecione seu Pixel: 2020158598758649');
      console.log('   3. Vá em "Visão Geral" para ver o evento');
    }

    console.log('');
    console.log('✅ Seu token de acesso está funcionando corretamente!');
    console.log('✅ Você pode iniciar o servidor com: npm run dev');
    console.log('');

    // Mostrar detalhes da resposta (se disponível)
    if (response) {
      console.log('📋 Detalhes da resposta:');
      console.log(JSON.stringify(response, null, 2));
      console.log('');
    }

  } catch (error) {
    console.log('');
    console.log('='.repeat(60));
    console.error('❌ ERRO ao conectar com Facebook Conversions API');
    console.log('='.repeat(60));
    console.log('');

    console.error('Mensagem de erro:', error.message);

    if (error.message.includes('Invalid OAuth access token')) {
      console.log('');
      console.log('💡 Token de acesso inválido ou expirado');
      console.log('');
      console.log('Soluções:');
      console.log('   1. Verifique se copiou o token completo (sem espaços)');
      console.log('   2. Gere um novo token em:');
      console.log('      https://business.facebook.com/events_manager2/list');
      console.log('   3. Selecione Pixel 2020158598758649');
      console.log('   4. Configurações → API de Conversões → Gerar Token');
      console.log('');
    } else if (error.message.includes('Pixel ID')) {
      console.log('');
      console.log('💡 Problema com o Pixel ID');
      console.log('');
      console.log('Verifique se o Pixel ID 2020158598758649 está correto');
      console.log('');
    } else {
      console.log('');
      console.log('💡 Erro desconhecido');
      console.log('');
      console.log('Stack trace:');
      console.error(error.stack);
      console.log('');
    }

    process.exit(1);
  }
}

// Executar teste
console.log('');
testConnection().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
