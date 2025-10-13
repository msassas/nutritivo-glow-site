import { Utensils, MessageSquare, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackLead } from "@/utils/facebookPixelIntegration";

const services = [{
  icon: Utensils,
  title: "Planos alimentares personalizados",
  description: "Guias alimentares práticos e reais, feitos sob medida para seus objetivos e desafios."
}, {
  icon: MessageSquare,
  title: "Consultas individuais com acompanhamento constante",
  description: "Orientação de verdade, com escuta ativa, cuidado e presença em cada etapa."
}, {
  icon: Users,
  title: "Workshops de nutrição",
  description: "Encontros em grupo para troca de experiências, aprendizado e transformação coletiva."
}, {
  icon: Leaf,
  title: "Mudança de estilo de vida",
  description: "Mais do que comer bem, é sobre viver melhor. Vamos juntas cuidar de você por completo."
}];
const Services = () => {
  const handleConsulta = async () => {
    await trackLead({});
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };
  return <section className="py-20 px-6 relative overflow-hidden bg-card">
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 animate-fade-in">
          Como posso te ajudar
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Minha abordagem é personalizada e respeita seu ritmo de vida. Não existe receita padrão, existe um plano feito para você.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-12 relative z-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col border-border py-10 relative group/feature animate-fade-in-up",
                  "lg:border-r",
                  (index === 0) && "lg:border-l",
                  "sm:border-b lg:border-b-0"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
                
                <div className="mb-4 relative z-10 px-6 sm:px-10 flex justify-center">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary/70 group-hover/feature:text-primary transition-colors duration-200 stroke-[1.5]" />
                </div>
                <div className="text-sm sm:text-base font-bold mb-2 relative z-10 px-6 sm:px-10 text-center">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block leading-tight">
                    {service.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground relative z-10 px-6 sm:px-10 leading-relaxed text-center">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <Button variant="pill" size="xl" onClick={handleConsulta} className="w-full sm:w-auto animate-scale-in">QUERO ESSA MUDANÇA </Button>
        </div>
      </div>
    </section>;
};
export default Services;