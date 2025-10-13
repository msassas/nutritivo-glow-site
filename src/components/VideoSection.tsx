import { Button } from "@/components/ui/button";

const VideoSection = () => {
  const handleConsulta = () => {
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 leading-relaxed animate-fade-in">
          Uma consulta que vai além da balança
        </h2>
        
        <div className="relative max-w-md mx-auto animate-scale-in overflow-hidden rounded-3xl" style={{ height: '650px' }}>
          <iframe
            src="https://www.instagram.com/reel/DNl1faooYdx/embed"
            className="w-full shadow-card hover:shadow-glow transition-all duration-500"
            style={{
              height: '700px',
              border: 'none',
              overflow: 'hidden',
              marginTop: '-10px'
            }}
            scrolling="no"
            allowTransparency={true}
            allow="encrypted-media"
          />
        </div>
        
        <p className="text-muted-foreground text-base sm:text-lg mt-8 mb-8 max-w-3xl mx-auto">
          Você será acolhida, ouvida e orientada com base em evidências, empatia e respeito.
        </p>
        
        <Button variant="pill" size="xl" onClick={handleConsulta} className="w-full sm:w-auto">
          AGENDAR MINHA CONSULTA
        </Button>
      </div>
    </section>
  );
};

export default VideoSection;
