import { lazy, Suspense } from "react";
import { Head } from "vite-react-ssg";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";

// Lazy load non-critical components
const PainPoints = lazy(() => import("@/components/PainPoints"));
const Services = lazy(() => import("@/components/Services"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Events = lazy(() => import("@/components/Events"));
const FAQ = lazy(() => import("@/components/FAQ"));
const SpotifyPlaylist = lazy(() => import("@/components/SpotifyPlaylist"));
const Footer = lazy(() => import("@/components/Footer"));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <main className="min-h-screen">
      <Head>
        <title>Luana Salvino - Nutricionista em Cajazeiras PB | Consulta Nutricional Personalizada</title>
        <meta name="description" content="Nutricionista em Cajazeiras-PB. Consulta nutricional personalizada com foco em emagrecimento saudável, alimentação equilibrada e qualidade de vida. Atendimento presencial na Clínica Virtus. Agende sua consulta!" />
        <meta name="keywords" content="nutricionista Cajazeiras, nutricionista Paraíba, consulta nutricional Cajazeiras, emagrecimento saudável, nutrição clínica, dieta personalizada, reeducação alimentar, nutricionista PB, Clínica Virtus, alimentação saudável" />
        <meta name="author" content="Luana Salvino - Nutricionista CRN 48391" />
        <link rel="canonical" href="https://luanasalvino.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://luanasalvino.com.br" />
        <meta property="og:site_name" content="Luana Salvino Nutricionista" />
        <meta property="og:title" content="Luana Salvino - Nutricionista em Cajazeiras PB" />
        <meta property="og:description" content="Nutricionista em Cajazeiras-PB. Consulta nutricional personalizada com foco em emagrecimento saudável e qualidade de vida. Atendimento na Clínica Virtus." />
        <meta property="og:image" content="https://luanasalvino.com.br/nutritionist-about.webp" />
        <meta property="og:image:secure_url" content="https://luanasalvino.com.br/nutritionist-about.webp" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Luana Salvino - Nutricionista em Cajazeiras PB" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@luanasalvinonutri" />
        <meta name="twitter:creator" content="@luanasalvinonutri" />
        <meta name="twitter:title" content="Luana Salvino - Nutricionista em Cajazeiras PB" />
        <meta name="twitter:description" content="Nutricionista em Cajazeiras-PB. Consulta nutricional personalizada com foco em emagrecimento saudável e qualidade de vida." />
        <meta name="twitter:image" content="https://luanasalvino.com.br/nutritionist-about.webp" />
        <meta name="twitter:image:alt" content="Luana Salvino - Nutricionista" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://luanasalvino.com.br"}]}`}</script>
      </Head>

      {/* FASE 1 - ATENÇÃO */}
      <Hero />

      {/* FASE 2 - IDENTIFICAÇÃO */}
      <Suspense fallback={<SectionLoader />}>
        <PainPoints />
      </Suspense>

      {/* FASE 3 - SOLUÇÃO */}
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>

      {/* FASE 4 - AUTORIDADE */}
      <About />

      {/* DESEJO: Benefícios da consulta */}
      <Benefits />

      {/* FASE 5 - PROVA SOCIAL */}
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Events />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <VideoSection />
      </Suspense>

      {/* FASE 7 - OBJEÇÕES */}
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>

      {/* CONEXÃO EXTRA */}
      <Suspense fallback={<SectionLoader />}>
        <SpotifyPlaylist />
      </Suspense>

      {/* FOOTER */}
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
