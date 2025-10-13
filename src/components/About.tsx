import { memo } from "react";
import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/nutritionist-about.webp";

const About = memo(() => {
  const handleConsulta = () => {
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };

  return (
    <section className="py-12 px-6 relative overflow-hidden bg-card">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[300px] -z-10 bg-primary/20" />

      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
            <div className="text-sm text-foreground/80 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Sou Luana Salvino, nutricionista
              </h2>
              <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary/30 mt-4 mx-auto lg:mx-0" />

              <p className="mt-8 text-base">
                Atendo na Clínica Virtus, em Cajazeiras – PB, e minha missão é mostrar que é possível mudar sua alimentação com leveza, prazer e resultados reais.
              </p>

              <p className="mt-4 text-base">
                Nada de fórmulas prontas. Aqui, a nutrição é construída junto com você, respeitando o seu tempo, sua história e o que funciona na sua rotina.
              </p>
            </div>

            {/* Button */}
            <Button
              variant="pill"
              size="xl"
              onClick={handleConsulta}
              className="flex items-center justify-center gap-2 hover:-translate-y-0.5 transition w-full sm:w-auto px-6 sm:px-8 mt-8"
            >
              <span className="whitespace-normal text-center">QUERO COMEÇAR MINHA JORNADA</span>
              <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z" fill="currentColor" />
              </svg>
            </Button>
          </div>

          {/* Right Column - Image */}
          <div className="relative shadow-2xl shadow-primary/40 rounded-2xl overflow-hidden w-full max-w-md lg:max-w-none flex-1">
            <img
              className="w-full object-cover object-top rounded-2xl aspect-square"
              src={aboutImage}
              alt="Luana Salvino - Nutricionista"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
