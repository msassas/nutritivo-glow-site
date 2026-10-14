import { Moon, Heart, Waypoints, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const painPoints = [
  {
    icon: Moon,
    title: "Já tentou várias dietas mas sempre volta ao peso inicial",
    description: "Ou ganha mais ainda. O efeito sanfona está te deixando louca e você não aguenta mais recomeçar do zero.",
  },
  {
    icon: Heart,
    title: "Sente vergonha do próprio corpo",
    description: "Evita tirar fotos, usar certas roupas. Olha no espelho e não se reconhece mais.",
  },
  {
    icon: Waypoints,
    title: "Está sempre cansada, mesmo depois de dormir bem",
    description: "Parece que falta energia no corpo. Às vezes nem consegue ter disposição para brincar com os filhos.",
  },
  {
    icon: Leaf,
    title: "Come escondido ou sente culpa depois de comer",
    description: "Algo que é 'proibido'. A relação com a comida virou um ciclo de restrição e culpa.",
  },
];

const PainPoints = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14 max-w-3xl mx-auto px-4">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Reconhece esses sinais?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight animate-fade-in">
            Você se identifica com alguma dessas situações?
          </h2>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </div>

        <div className="grid sm:grid-cols-2 gap-0 mb-14 relative z-10 border border-accent/15 rounded-[10px] overflow-hidden bg-[hsl(var(--secondary)/0.4)]">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col py-10 relative group/feature animate-fade-in-up transition-colors duration-300",
                  "sm:border-r border-accent/15",
                  (index === 1 || index === 3) && "sm:border-r-0",
                  index < 2 && "sm:border-b",
                  "hover:bg-[hsl(var(--card)/0.4)]"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 relative z-10 px-6 sm:px-10">
                  <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-accent stroke-[1.5]" />
                </div>
                <div className="font-display text-lg sm:text-xl font-semibold mb-2 relative z-10 px-6 sm:px-10 leading-snug text-foreground">
                  {point.title}
                </div>
                <p className="text-sm sm:text-base text-foreground/75 relative z-10 px-6 sm:px-10 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center px-4">
          <Button
            asChild
            variant="pill"
            size="xl"
            className="w-full sm:w-auto animate-scale-in text-xs sm:text-sm px-6 py-3 whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Sim, quero mudar essa realidade
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
