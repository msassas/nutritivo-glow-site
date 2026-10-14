import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    id: "1",
    name: "Mikaely Solano",
    text: "A sessão é muito didática! Você é bastante explicativa e atenciosa, presta um excelente acompanhamento e monta uma dieta com diversas opções, o que facilita muito seguir o plano. Depois do último ajuste, estou me sentindo ainda mais disposta para treinar. Estou adorando!",
    result: "Perdeu 7kg em 2 meses"
  },
  {
    id: "2",
    name: "Mabel",
    text: "Estou correndo atrás dos meus objetivos e, se Deus quiser, vai dar tudo certo. Confesso que estou bem melhor depois que comecei o acompanhamento. Tenho bebido mais água, me alimentado melhor e até comecei na academia! Está sendo transformador.",
    result: "Recuperou energia e autoestima"
  },
  {
    id: "3",
    name: "Larissa",
    text: "Estou me sentindo muito bem, não sinto fome e está sendo fácil seguir. Estou gostando tanto do acompanhamento que já comecei a indicar e mandar mais pacientes! A experiência tem sido leve, prática e cheia de resultados.",
    result: "Emagreceu 8kg • Já indicou 5 amigas"
  },
  {
    id: "4",
    name: "Ana Carolina",
    text: "Gostei demais da consulta! A profissional é didática, atenciosa e transmite segurança. O acompanhamento é completo, cheio de opções e feito com muito carinho. Dá pra sentir o cuidado em cada detalhe — me sinto motivada e acolhida em todo o processo.",
    result: "Emagreceu 5kg no primeiro mês"
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
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[hsl(var(--secondary))]">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Quem já confiou
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight animate-fade-in">
            O que minhas pacientes de Cajazeiras estão dizendo
          </h2>
          <div className="divider-gold w-24 mx-auto mb-5" />
          <p className="text-base sm:text-lg text-foreground/80">
            Resultados reais de mulheres reais da nossa região
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
                <div className="group relative h-full rounded-[10px] bg-[hsl(var(--card)/0.6)] backdrop-blur-sm border border-accent/20 p-8 shadow-card hover:shadow-soft transition-all duration-300 hover:border-accent/40 hover:-translate-y-1">
                  <div className="absolute top-6 left-6 text-accent/30 group-hover:text-accent/50 transition-colors duration-300">
                    <Quote className="w-10 h-10" />
                  </div>

                  <div className="relative z-10 pt-8">
                    <div className="flex gap-0.5 mb-4" aria-label="Avaliação: 5 de 5 estrelas">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-foreground/90 text-base sm:text-lg leading-relaxed mb-6 italic font-serif">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t border-accent/15">
                      <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-display font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-accent font-medium">
                          {(testimonial as any).result}
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
              className="h-11 w-11 rounded-full bg-transparent backdrop-blur-sm flex items-center justify-center disabled:opacity-30 hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:cursor-not-allowed border border-accent/40 text-accent"
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label="Depoimento anterior"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              className="h-11 w-11 rounded-full bg-transparent backdrop-blur-sm flex items-center justify-center disabled:opacity-30 hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:cursor-not-allowed border border-accent/40 text-accent"
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
