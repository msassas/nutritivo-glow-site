import { Button } from "@/components/ui/button";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import eventCongress from "@/assets/event-congress.webp";
import eventTransplant from "@/assets/event-transplant.webp";
import eventUpdate from "@/assets/event-update.webp";
import eventRioHealth from "@/assets/event-rio-health.jpg";
import eventWebdiet from "@/assets/event-webdiet.jpg";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const events = [
  {
    src: eventRioHealth,
    name: "Rio Health Medicine Nutrition",
    designation: "Rio de Janeiro",
    quote:
      "Um dos maiores encontros internacionais que une medicina, nutrição e longevidade — com as pesquisas mais recentes em saúde da mulher, metabolismo e prevenção de doenças. Aplico aqui o que há de mais atual e baseado em evidência.",
  },
  {
    src: eventWebdiet,
    name: "Webdiet Conference",
    designation: "Convenção nacional de Nutrição",
    quote:
      "Convenção nacional que reúne nutricionistas referência do Brasil para imersão em estratégias clínicas, nutrição comportamental e tecnologia aplicada ao atendimento — para entregar prescrições mais precisas, humanas e personalizadas.",
  },
  {
    src: eventCongress,
    name: "Congresso Saúde da Mulher",
    designation: "15 de setembro de 2025",
    quote:
      "Congresso focado em saúde da mulher em todas as fases da vida — hormônios, ciclo, fertilidade e emagrecimento feminino com leveza e respeito pela individualidade de cada paciente.",
  },
  {
    src: eventTransplant,
    name: "Encontro de Transplantados em João Pessoa",
    designation: "2 de outubro de 2025",
    quote:
      "Encontro científico sobre cuidado nutricional em pacientes transplantados — atuação clínica de alta complexidade que reforça a base técnica que trago para cada consulta.",
  },
  {
    src: eventUpdate,
    name: "Atualização em Nutrição Clínica e Comportamental",
    designation: "Evento de formação profissional",
    quote:
      "Imersão em atualização científica e estratégias práticas para resultados de excelência — porque nutrição que funciona é a que junta ciência, comportamento e a realidade de quem está do outro lado.",
  },
];

const Events = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Formação contínua
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 leading-tight animate-fade-in">
            Conhecimento atualizado para resultados reais
          </h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            Não confie em profissional que parou no tempo. Eu me atualizo constantemente participando de congressos, eventos científicos e formações para trazer o que há de mais moderno e eficaz na nutrição.
          </p>
        </div>

        <div className="flex items-center justify-center w-full my-12">
          <CircularTestimonials
            testimonials={events}
            autoplay={true}
            colors={{
              name: "hsl(var(--foreground))",
              designation: "hsl(var(--accent))",
              testimony: "hsl(var(--foreground) / 0.85)",
              arrowBackground: "hsl(var(--accent))",
              arrowForeground: "hsl(var(--accent-foreground))",
              arrowHoverBackground: "hsl(var(--primary))",
            }}
            fontSizes={{
              name: "24px",
              designation: "16px",
              quote: "18px",
            }}
          />
        </div>

        <div className="flex justify-center mt-12 px-4">
          <Button
            asChild
            variant="pill"
            size="xl"
            className="w-full sm:w-auto animate-scale-in text-xs sm:text-sm px-6 py-3 whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Quero ser atendida por quem estuda de verdade
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
