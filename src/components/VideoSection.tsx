import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const VideoSection = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
          Sobre a consulta
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mb-6 leading-tight animate-fade-in">
          Uma consulta que vai muito além da balança
        </h2>
        <div className="divider-gold w-24 mx-auto mb-12" />

        <div className="relative max-w-md mx-auto animate-scale-in overflow-hidden rounded-[8px] border border-accent/20" style={{ height: "650px" }}>
          <iframe
            src="https://www.instagram.com/reel/DNl1faooYdx/embed"
            className="w-full shadow-card hover:shadow-glow transition-all duration-500"
            style={{
              height: "700px",
              border: "none",
              overflow: "hidden",
              marginTop: "-10px",
            }}
            scrolling="no"
            allowTransparency={true}
            allow="encrypted-media"
            title="Vídeo da nutricionista"
          />
        </div>

        <p className="text-foreground/80 text-base sm:text-lg mt-10 mb-8 max-w-3xl mx-auto leading-relaxed">
          Aqui você não é só um número. Você será acolhida, ouvida de verdade e orientada com base em ciência, empatia e respeito. Esqueça aquela consulta de 15 minutos. Aqui a gente CONVERSA.
        </p>

        <div className="px-4">
          <Button
            asChild
            variant="pill"
            size="xl"
            className="w-full sm:w-auto text-xs sm:text-sm px-6 py-3 whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Quero agendar minha consulta
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
