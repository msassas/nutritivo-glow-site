import { Button } from "@/components/ui/button";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import eventCongress from "@/assets/event-congress.webp";
import eventTransplant from "@/assets/event-transplant.webp";
import eventUpdate from "@/assets/event-update.webp";

const events = [
  {
    src: eventCongress,
    name: "Congresso Saúde da Mulher",
    designation: "15 de setembro de 2025",
    quote: "Participo ativamente de congressos, formações e eventos para oferecer o que há de mais atual, ético e eficaz na nutrição clínica."
  },
  {
    src: eventTransplant,
    name: "Encontro de Transplantados em João Pessoa",
    designation: "2 de outubro de 2025",
    quote: "Participo ativamente de congressos, formações e eventos para oferecer o que há de mais atual, ético e eficaz na nutrição clínica."
  },
  {
    src: eventUpdate,
    name: "Atualização científica e estratégias práticas para resultados de excelência",
    designation: "Evento de formação profissional",
    quote: "Participo ativamente de congressos, formações e eventos para oferecer o que há de mais atual, ético e eficaz na nutrição clínica."
  }
];
const Events = () => {
  const handleConsulta = () => {
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center animate-fade-in">
          Congressos e eventos
        </h2>
        
        <div className="flex items-center justify-center w-full my-12">
          <CircularTestimonials
            testimonials={events}
            autoplay={true}
            colors={{
              name: "hsl(var(--foreground))",
              designation: "hsl(var(--muted-foreground))",
              testimony: "hsl(var(--foreground) / 0.8)",
              arrowBackground: "hsl(var(--primary))",
              arrowForeground: "hsl(var(--primary-foreground))",
              arrowHoverBackground: "hsl(var(--accent))",
            }}
            fontSizes={{
              name: "24px",
              designation: "16px",
              quote: "18px",
            }}
          />
        </div>
        
        <div className="flex justify-center mt-12">
          <Button 
            variant="pill" 
            size="xl" 
            onClick={handleConsulta} 
            className="w-full sm:w-auto animate-scale-in"
          >
            QUERO SER ACOMPANHADA
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Events;