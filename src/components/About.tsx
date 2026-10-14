import { memo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/nutritionist-about.webp";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const About = memo(() => {
  return (
    <section className="py-20 sm:py-24 px-6 relative overflow-hidden bg-[hsl(var(--secondary))]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[260px] -z-10 bg-accent/15" />

      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
            <div className="text-sm text-foreground/85 w-full">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
                Quem te acompanha
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-tight">
                Quem vai te acompanhar nessa jornada?
              </h2>
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-medium text-accent mt-4 leading-snug">
                <span className="block sm:inline">Luana Salvino</span>
                <span className="hidden sm:inline"> · </span>
                <span className="block sm:inline whitespace-nowrap">Nutricionista Clínica · CRN&nbsp;48391</span>
              </h3>
              <div className="divider-gold w-24 mt-6 mx-auto lg:mx-0" />

              <p className="mt-8 text-sm sm:text-base leading-relaxed">
                Oi, eu sou a Luana, nutricionista aqui de Cajazeiras — e, nos últimos anos, já ajudei centenas de mulheres a emagrecerem de forma saudável, sem terrorismo nutricional, sem passar fome e sem viver presa em dieta.
              </p>

              <p className="mt-6 text-sm sm:text-base leading-relaxed">
                Esqueça tudo aquilo que te fizeram acreditar:
              </p>

              <ul className="mt-3 space-y-2.5 text-sm sm:text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 shrink-0 text-accent/70 stroke-[2]" aria-hidden="true" />
                  <span>Que emagrecer é viver de salada e frango</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 shrink-0 text-accent/70 stroke-[2]" aria-hidden="true" />
                  <span>Que você nunca mais vai poder comer pão</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-4 h-4 mt-1 shrink-0 text-accent/70 stroke-[2]" aria-hidden="true" />
                  <span>Que precisa fazer detox, shake milagroso ou passar vontade para ter resultado</span>
                </li>
              </ul>

              <p className="mt-6 text-sm sm:text-base leading-relaxed">
                A verdade é que você pode emagrecer aprendendo a comer <strong className="text-accent">comida de verdade</strong>, respeitando sua rotina, sua realidade e o seu corpo.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed">
                Meu objetivo não é te entregar uma dieta impossível.<br />
                É te ensinar a construir resultados que você consiga manter.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed">
                Aqui, você não será tratada como mais um número. Cada acompanhamento é pensado de forma individual, considerando sua rotina, seus hábitos, suas dificuldades e seus objetivos.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed">
                Ao longo da minha trajetória, me mantenho em constante atualização através de congressos, eventos científicos e estudos na área da nutrição, para oferecer estratégias que realmente funcionam — sem modinhas da internet e sem extremismos.
              </p>

              <p className="mt-6 text-sm sm:text-base leading-relaxed">
                <strong className="text-accent font-semibold">Meu compromisso é simples:</strong><br />
                te ajudar a conquistar saúde, autoestima e resultados reais de uma forma leve, possível e sustentável.
              </p>

              <p className="mt-4 text-sm sm:text-base leading-relaxed">
                Atendo presencialmente na <strong>Clínica Virtus</strong>, no centro de Cajazeiras.<br />
                Será um prazer caminhar com você rumo à sua melhor versão.
              </p>
            </div>

            <Button
              asChild
              variant="pill"
              size="xl"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 mt-10 text-xs sm:text-sm whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <span className="whitespace-normal text-center">Quero ser acompanhada pela Luana</span>
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z" fill="currentColor" />
                </svg>
              </a>
            </Button>
          </div>

          {/* Right Column - Image */}
          <div className="relative shadow-soft rounded-[8px] overflow-hidden w-full max-w-md lg:max-w-none flex-1 border border-accent/20">
            <img
              className="w-full object-cover object-top rounded-[8px] aspect-square"
              src={aboutImage}
              alt="Luana Salvino - Nutricionista"
              width="1279"
              height="1919"
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
