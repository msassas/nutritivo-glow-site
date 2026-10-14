import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const faqs = [
  {
    question: "Qual é sua abordagem? Vou ter que cortar carboidrato?",
    answer:
      "Não! Trabalho com nutrição comportamental e funcional. Aqui você come comida de verdade — arroz, feijão, tapioca, pão, massa. A diferença é que você vai aprender COMO, QUANDO e QUANTO comer para emagrecer. Nada de terrorismo.",
  },
  {
    question: "O plano é feito só pra mim ou é um PDF pronto?",
    answer:
      "Cada paciente recebe um plano 100% personalizado. Eu considero sua rotina, preferências, orçamento, se você gosta ou não de cozinhar, se trabalha fora ou em casa. TUDO. Nada de dieta copiada.",
  },
  {
    question: "Quanto tempo até eu ver resultado?",
    answer:
      "Nas primeiras 2 semanas: menos inchaço, mais energia, roupas mais folgadas. O emagrecimento real é gradual — e é o que se sustenta. Quem promete milagre em 1 mês tá te enganando. Aqui é resultado de verdade.",
  },
  {
    question: "Atende por convênio?",
    answer:
      "Atualmente atendo particular, mas forneço recibo detalhado para você solicitar reembolso no seu convênio (caso ele permita).",
  },
  {
    question: "Como funciona o investimento na consulta?",
    answer:
      "Entre em contato pelo WhatsApp para conhecer os formatos de acompanhamento, valores e condições atualizadas. Parcelo em até 2x no cartão. Pense assim: quanto você já gastou com dietas que não funcionaram? Aqui você investe de verdade na sua saúde.",
  },
  {
    question: "E se eu precisar remarcar?",
    answer:
      "Sem problema! Só precisa avisar com 24h de antecedência que a gente remarca sem custo nenhum.",
  },
  {
    question: "Atende criança e adolescente?",
    answer:
      "Sim! A partir dos 10 anos de idade, sempre com uma abordagem respeitosa, educativa e sem criar traumas com comida.",
  },
  {
    question: "Onde fica o consultório?",
    answer:
      "Atendo presencialmente na Clínica Virtus, aqui no centro de Cajazeiras-PB. Endereço completo: Av. Dr. Aldo Matos de Sá, 1030 – Centro.",
  },
];

const FAQ = () => {
  return (
    <section className="pt-16 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-4">
            Dúvidas frequentes
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold animate-fade-in leading-tight">
            Perguntas que você pode estar se fazendo agora
          </h2>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </div>

        <Accordion type="single" collapsible className="space-y-3 mb-14">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-[8px] border border-accent/20 bg-[hsl(var(--secondary)/0.55)] backdrop-blur-sm px-6 sm:px-7 py-1 hover:border-accent/40 transition-all duration-300 animate-fade-in-up data-[state=open]:border-accent/40 data-[state=open]:bg-[hsl(var(--secondary)/0.75)]"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-5 text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-foreground/80 pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex justify-center px-4">
          <Button
            asChild
            variant="pill"
            size="xl"
            className="w-full sm:w-auto animate-scale-in text-xs sm:text-sm px-6 py-3 whitespace-normal h-auto min-h-[44px] touch-manipulation cursor-pointer"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Agendar minha consulta
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
