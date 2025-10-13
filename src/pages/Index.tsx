import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";

// Lazy load non-critical components
const PainPoints = lazy(() => import("@/components/PainPoints"));
const Services = lazy(() => import("@/components/Services"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Events = lazy(() => import("@/components/Events"));
const LeadMagnet = lazy(() => import("@/components/LeadMagnet"));
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
      <Hero />
      <About />
      <Suspense fallback={<SectionLoader />}>
        <PainPoints />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <VideoSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Events />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <LeadMagnet />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SpotifyPlaylist />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
