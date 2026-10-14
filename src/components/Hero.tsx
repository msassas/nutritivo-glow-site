import { memo } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/nutritionist-hero-new.webp";
import logoBlack from "@/assets/logo-black.webp";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { trackLead } from "@/utils/facebookPixelIntegration";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const Hero = memo(() => {
  const handleConsulta = () => {
    trackLead({}).catch((err) => {
      console.error("Erro ao rastrear lead:", err);
    });
  };

  return (
    <AuroraBackground className="min-h-screen bg-background">
      <section className="min-h-screen lg:flex lg:items-center relative overflow-hidden w-full">
        <div className="w-full relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-12 lg:items-center lg:min-h-screen pt-6 pb-8 sm:pt-8 sm:pb-10 lg:py-0">
            {/* Content - Top on mobile, Left on desktop */}
            <div className="w-full px-4 sm:px-6 lg:px-16 flex items-center justify-center order-1 lg:order-1">
              <div className="max-w-xl w-full text-center lg:text-left animate-fade-in space-y-5 lg:space-y-6">
                <div className="mb-4 w-full flex justify-center lg:justify-start">
                  <img
                    src={logoBlack}
                    alt="Logo Nutricionista Luana Salvino"
                    className="w-24 sm:w-32 lg:w-40 xl:w-48 max-w-full h-auto"
                    width="1646"
                    height="668"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>

                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-semibold leading-tight px-2 text-foreground">
                  Vamos construir juntos uma relação mais leve
                  <span className="block text-accent mt-2">com a comida e com você mesma.</span>
                </h1>

                <div className="divider-gold w-20 mx-auto lg:mx-0" />

                <div className="space-y-2 px-2">
                  <p className="text-sm sm:text-base lg:text-base text-foreground/85 leading-relaxed">
                    Atendimento presencial em Cajazeiras-PB
                  </p>
                </div>

                <div className="space-y-3 px-2">
                  <Button
                    asChild
                    variant="pill"
                    size="lg"
                    onClick={handleConsulta}
                    className="w-full sm:w-auto text-xs sm:text-sm px-6 py-3 whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Quero começar meu acompanhamento
                    </a>
                  </Button>
                  <p className="text-xs text-foreground/70 font-medium text-center lg:text-left px-2 tracking-wide">
                    Agenda de {(() => {
                      const now = new Date();
                      const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                      const i = now.getDate() >= 25 ? (now.getMonth() + 1) % 12 : now.getMonth();
                      return meses[i];
                    })()} aberta
                  </p>
                </div>
              </div>
            </div>

            {/* Image - Bottom on mobile, Right on desktop */}
            <div className="w-full max-w-sm mx-auto aspect-[753/1079] lg:max-w-none lg:mx-0 lg:aspect-auto lg:h-screen relative flex items-center justify-center order-2 lg:order-2 animate-fade-in-up overflow-hidden">
              <img
                src={heroImage}
                alt="Nutricionista profissional"
                className="w-full h-full object-cover object-center [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)] lg:[mask-image:none] lg:[-webkit-mask-image:none] lg:max-w-lg lg:max-h-[90vh] lg:object-contain lg:rounded-lg"
                width="753"
                height="1079"
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-background/30 lg:rounded-lg pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </AuroraBackground>
  );
});

Hero.displayName = "Hero";

export default Hero;
