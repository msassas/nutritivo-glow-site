import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    id: "1",
    name: "Mikaely Solano",
    text: "A sessão é muito didática! Você é bastante explicativa e atenciosa, presta um excelente acompanhamento e monta uma dieta com diversas opções, o que facilita muito seguir o plano. Depois do último ajuste, estou me sentindo ainda mais disposta para treinar. Estou adorando!",
  },
  {
    id: "2",
    name: "Mabel",
    text: "Estou correndo atrás dos meus objetivos e, se Deus quiser, vai dar tudo certo. Confesso que estou bem melhor depois que comecei o acompanhamento. Tenho bebido mais água, me alimentado melhor e até comecei na academia! Está sendo transformador.",
  },
  {
    id: "3",
    name: "Larissa",
    text: "Estou me sentindo muito bem, não sinto fome e está sendo fácil seguir. Estou gostando tanto do acompanhamento que já comecei a indicar e mandar mais pacientes! A experiência tem sido leve, prática e cheia de resultados.",
  },
  {
    id: "4",
    name: "Cliente Anônima",
    text: "Gostei demais da consulta! A profissional é didática, atenciosa e transmite segurança. O acompanhamento é completo, cheio de opções e feito com muito carinho. Dá pra sentir o cuidado em cada detalhe — me sinto motivada e acolhida em todo o processo.",
  },
];

const Testimonials = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollability();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
            O que dizem minhas pacientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de transformação e bem-estar
          </p>
        </div>

        <div className="relative w-full">
          <div
            className="flex overflow-x-auto scroll-smooth [scrollbar-width:none] [-webkit-overflow-scrolling:touch] py-6 gap-6 px-2"
            ref={carouselRef}
            onScroll={checkScrollability}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px]"
              >
                <div className="group relative h-full rounded-3xl bg-card/80 backdrop-blur-sm border border-primary/10 p-8 shadow-soft hover:shadow-glow transition-all duration-300 hover:border-primary/20 hover:scale-[1.02]">
                  <div className="absolute top-6 left-6 text-primary/20 group-hover:text-primary/30 transition-colors duration-300">
                    <Quote className="w-12 h-12" />
                  </div>

                  <div className="relative z-10 pt-8">
                    <p className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-6 italic">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-primary/10">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Paciente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              className="h-12 w-12 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center disabled:opacity-30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:cursor-not-allowed border border-primary/20"
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label="Depoimento anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              className="h-12 w-12 rounded-full bg-primary/10 backdrop-blur-sm flex items-center justify-center disabled:opacity-30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:cursor-not-allowed border border-primary/20"
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label="Próximo depoimento"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
