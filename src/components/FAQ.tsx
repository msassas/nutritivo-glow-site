import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
const faqs = [{
  question: "Qual é sua abordagem nutricional?",
  answer: "Baseada em ciência e focada na realidade de cada pessoa. Sem terrorismo alimentar ou dietas restritivas."
}, {
  question: "Você oferece planos personalizados?",
  answer: "Sim. Cada plano é único, elaborado a partir da sua rotina, preferências e exames."
}, {
  question: "Atende por convênio?",
  answer: "Atualmente, realizo apenas atendimentos particulares."
}, {
  question: "Qual o valor da consulta?",
  answer: "As informações completas são enviadas após o agendamento do contato."
}, {
  question: "Posso reagendar minha consulta?",
  answer: "Sim, com aviso prévio."
}, {
  question: "Você atende crianças?",
  answer: "Sim, à partir dos 10 anos de idade"
}];
const FAQ = () => {
  const handleConsulta = () => {
    window.open('https://wa.me/5583986547947?text=Ol%C3%A1%21%20Quero%20agendar%20uma%20consulta%20com%20Luana%20Salvino%20Nutricionista.', '_blank');
  };
  return <section className="pt-12 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 animate-fade-in">
          Perguntas frequentes
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4 mb-12">
          {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="glass-dark rounded-3xl shadow-card px-6 sm:px-8 py-2 hover:shadow-glow transition-all duration-500 animate-fade-in-up" style={{
          animationDelay: `${index * 0.05}s`
        }}>
              <AccordionTrigger className="text-left text-sm sm:text-base font-normal hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-foreground/70 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>)}
        </Accordion>
        
        <div className="flex justify-center">
          <Button variant="pill" size="xl" onClick={handleConsulta} className="w-full sm:w-auto animate-scale-in">AGENDAR MINHA CONSULTA</Button>
        </div>
      </div>
    </section>;
};
export default FAQ;