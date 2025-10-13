import { memo } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/nutritionist-hero-new.webp";
import logoBlack from "@/assets/logo-black.webp";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { trackLead } from "@/utils/facebookPixelIntegration";

const Hero = memo(() => {
  const handleConsulta = async () => {
    // Rastreia o evento Lead antes de abrir o WhatsApp
    await trackLead({});
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };

  return (
    <AuroraBackground className="min-h-screen bg-background">
      <section className="min-h-screen flex items-start lg:items-center relative overflow-hidden w-full">
        <div className="w-full relative z-10 h-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 items-stretch min-h-screen">
            {/* Content - Top on mobile, Left on desktop */}
            <div className="w-full px-6 sm:px-8 py-8 sm:py-12 lg:px-16 lg:py-20 flex items-center justify-center order-1 lg:order-1">
              <div className="max-w-xl w-full text-center lg:text-left animate-fade-in">
                <img
                  src={logoBlack}
                  alt="Logo Nutricionista Luana Salvino"
                  className="w-48 mx-auto lg:mx-0 mb-6"
                  loading="eager"
                  fetchpriority="high"
                />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  A nutrição que acolhe, ensina e transforma
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8">
                  Comer bem não precisa ser difícil, radical ou distante da sua realidade
                </p>
                <Button
                  variant="pill"
                  size="xl"
                  onClick={handleConsulta}
                  className="w-full sm:w-auto"
                >
                  Agende sua consulta
                </Button>
              </div>
            </div>

            {/* Image - Bottom on mobile, Right on desktop */}
            <div className="w-full flex-1 lg:h-screen relative flex items-end justify-center px-0 pb-0 lg:px-8 lg:pb-0 order-2 lg:order-2 animate-fade-in-up">
              <img
                src={heroImage}
                alt="Nutricionista profissional"
                className="w-full h-full object-cover object-bottom lg:w-auto lg:h-full lg:object-contain lg:object-bottom lg:rounded-lg"
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/20 lg:rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
});

Hero.displayName = "Hero";

export default Hero;
