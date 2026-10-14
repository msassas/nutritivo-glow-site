import { memo } from "react";
import {
  ClipboardList,
  Sparkles,
  Sun,
  HeartPulse,
  Apple,
  HandHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const benefits = [
  {
    icon: ClipboardList,
    title: "Plano alimentar individualizado",
    description:
      "Nada de dietas genéricas. Tudo pensado para sua rotina, gostos e objetivos.",
  },
  {
    icon: Sparkles,
    title: "Resultados sustentáveis",
    description:
      "Mudanças reais que duram, sem efeito sanfona ou restrições impossíveis.",
  },
  {
    icon: Sun,
    title: "Mais energia no dia a dia",
    description:
      "Alimentação ajustada para você acordar disposta e produzir mais.",
  },
  {
    icon: HeartPulse,
    title: "Melhora da saúde clínica",
    description:
      "Acompanhamento de exames, colesterol, glicemia e prevenção de doenças.",
  },
  {
    icon: Apple,
    title: "Relação saudável com a comida",
    description:
      "Liberdade alimentar, sem culpa, sem terrorismo nutricional.",
  },
  {
    icon: HandHeart,
    title: "Acompanhamento próximo",
    description:
      "Suporte contínuo, ajustes e tira-dúvidas durante todo o processo.",
  },
];

const Benefits = memo(() => {
  return (
    <section
      id="beneficios"
      className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] rounded-full blur-[180px] -z-10 bg-accent/15" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Por que consultar
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            O que muda na sua vida
          </h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            Mais do que dietas — é qualidade de vida, autoestima e saúde de
            verdade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="group rounded-[10px] border border-accent/15 bg-[hsl(var(--card)/0.55)] backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[hsl(var(--card)/0.75)] hover:border-accent/35 hover:shadow-soft animate-fade-in-up"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-full border border-accent/40 bg-[hsl(var(--secondary)/0.4)] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-[0.95rem] text-foreground/75 leading-relaxed">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-accent/90 mb-4">
            Dê o primeiro passo hoje mesmo
          </p>
          <Button
            asChild
            variant="pill"
            size="xl"
            className="text-sm sm:text-base px-8 sm:px-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar consulta pelo WhatsApp"
            >
              Agendar minha consulta
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
});

Benefits.displayName = "Benefits";

export default Benefits;
