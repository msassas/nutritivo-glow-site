import { Moon, Heart, Waypoints, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const painPoints = [
  {
    icon: Moon,
    title: "Sente cansaço o tempo todo",
    description: "Falta de energia, mente confusa, corpo pesado — e nenhuma dieta resolve.",
  },
  {
    icon: Heart,
    title: "Tem uma relação difícil com a comida",
    description: "Entre dietas, culpa e recomeços, você sente que nunca consegue manter o equilíbrio.",
  },
  {
    icon: Waypoints,
    title: "Não sabe por onde começar",
    description: "São tantas informações e modismos que tudo parece confuso demais.",
  },
  {
    icon: Leaf,
    title: "Quer emagrecer de forma sustentável",
    description: "Você está cansada de soluções temporárias. O que busca é mudança duradoura, com saúde.",
  },
];

const PainPoints = () => {
  const handleConsulta = () => {
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };
  
  return (
    <section className="py-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 animate-fade-in">
          Se você...
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
        </p>
        
        <div className="grid sm:grid-cols-2 gap-0 mb-12 relative z-10">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col border-border py-10 relative group/feature animate-fade-in-up",
                  "sm:border-r",
                  (index === 0 || index === 2) && "sm:border-l",
                  index < 2 && "sm:border-b"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < 2 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                )}
                {index >= 2 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                )}
                <div className="mb-4 relative z-10 px-6 sm:px-10">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary/70 group-hover/feature:text-primary transition-colors duration-200 stroke-[1.5]" />
                </div>
                <div className="text-lg font-bold mb-2 relative z-10 px-6 sm:px-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
                    {point.title}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground relative z-10 px-6 sm:px-10 leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="pill" 
            size="xl" 
            onClick={handleConsulta}
            className="w-full sm:w-auto animate-scale-in"
          >
            Sim, eu preciso disso
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
