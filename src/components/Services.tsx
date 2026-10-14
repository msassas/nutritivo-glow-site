import { Utensils, MessageSquare, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackLead } from "@/utils/facebookPixelIntegration";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const services = [
  {
    icon: Utensils,
    title: "Consulta inicial completa · até 90 minutos",
    description:
      "Nada de consulta corrida ou atendimento superficial. Aqui, a gente conversa de verdade sobre sua rotina, seus hábitos, sua relação com a comida e os desafios que têm te impedido de alcançar resultados. Vou entender seu histórico, sua realidade e seus objetivos para construir um plano totalmente personalizado. Mais do que entregar uma dieta, meu objetivo é cuidar de você de forma completa e individualizada.",
  },
  {
    icon: MessageSquare,
    title: "Plano alimentar personalizado",
    description:
      "Esqueça dietas impossíveis e cheias de restrições. Seu plano será pensado de acordo com sua realidade, sua rotina e os alimentos que você gosta de comer. Não gosta de cozinhar? Tem rotina corrida? Come fora com frequência? Tudo isso é levado em consideração. A ideia é criar uma alimentação leve, prática e sustentável — sem sofrimento e sem radicalismo.",
  },
  {
    icon: Users,
    title: "Acompanhamento de perto",
    description:
      "Você não vai passar por esse processo sozinha. Durante o acompanhamento, ajustamos o plano sempre que necessário e acompanhamos sua evolução de forma próxima e humanizada. Teve viagem? Aniversário? Saiu da rotina? Tá tudo bem. A vida acontece — e eu vou te ajudar a encontrar equilíbrio sem culpa e sem desistir.",
  },
  {
    icon: Leaf,
    title: "Resultados que você sente (e vê)",
    description:
      "Muito além da balança, você começa a perceber mudanças reais na sua disposição, energia, autoestima e relação com a comida. Nas primeiras semanas, muitas pacientes já relatam menos inchaço, mais saciedade, mais energia no dia a dia, melhora na autoestima e mais leveza — física e emocional. E o melhor: resultados sustentáveis, sem efeito sanfona e sem precisar viver de dieta restritiva.",
  },
];

const Services = () => {
  const handleClick = () => {
    trackLead({}).catch((err) => {
      console.error("Erro ao rastrear lead:", err);
    });
  };

  return (
    <section className="py-20 sm:py-24 px-6 relative overflow-hidden bg-[hsl(var(--secondary))]">
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto px-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            O acompanhamento
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight animate-fade-in break-words">
            Como funciona o acompanhamento que já transformou 200+ vidas em Cajazeiras
          </h2>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 relative z-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="group flex flex-col rounded-[10px] border border-accent/15 bg-[hsl(var(--card)/0.5)] p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/35 hover:bg-[hsl(var(--card)/0.75)] hover:shadow-soft animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-full border border-accent/40 bg-[hsl(var(--secondary)/0.6)] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-3 leading-snug text-foreground">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center px-4">
          <Button
            asChild
            variant="pill"
            size="xl"
            onClick={handleClick}
            className="w-full sm:w-auto animate-scale-in text-xs sm:text-sm px-6 py-3 whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Quero meu plano feito pra mim
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
