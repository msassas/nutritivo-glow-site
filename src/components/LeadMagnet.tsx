import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download, CheckCircle, Check, Lock } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.webp";

interface EmailEntry {
  email: string;
  timestamp: string;
}

const EBOOK_URL = "https://drive.google.com/uc?export=download&id=1MR2Jx1vDFcScT9O4Q7hyZDY4LJMdo5AI";
const STORAGE_KEY = "nutritivo_ebook_emails";

const LeadMagnet = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const saveEmail = (email: string) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const emails: EmailEntry[] = stored ? JSON.parse(stored) : [];

      const newEntry: EmailEntry = {
        email,
        timestamp: new Date().toISOString(),
      };

      emails.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
    } catch (error) {
      console.error("Erro ao salvar email:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Atenção",
        description: "Por favor, preencha seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    // Administrative access requires server-side authentication.

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive",
      });
      return;
    }

    // Salvar email
    saveEmail(email);

    // Mostrar mensagem de sucesso
    setShowSuccess(true);

    toast({
      title: "Sucesso!",
      description: "Seu e-book está pronto para download.",
    });
  };

  const handleDownload = () => {
    window.open(EBOOK_URL, "_blank");
  };

  return (
    <section className="py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10 w-full px-4 sm:px-6">
        <div className="glass-dark rounded-2xl sm:rounded-[2rem] shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            {/* E-book image */}
            <div className="p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-secondary/30 to-background/50 backdrop-blur-sm">
              <div className="relative animate-float w-full max-w-[280px] sm:max-w-xs">
                <img
                  src={ebookCover}
                  alt="Guia de Nutrição Essencial"
                  className="w-full h-auto rounded-xl sm:rounded-2xl shadow-glow"
                  width="1024"
                  height="1536"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Form or Success Message */}
            <div className="px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight break-words">
                Guia gratuito:<br />
                Verão Saudável com a Nutri
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base">
               Enquanto você decide se vai agendar ou não, baixe esse guia gratuito e comece a fazer pequenas mudanças hoje mesmo.
              </p>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base">
               Dentro do guia você vai encontrar:
              </p>
              <ul className="text-muted-foreground mb-8 leading-relaxed text-xs sm:text-sm md:text-base space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary stroke-[2.5]" aria-hidden="true" />
                  <span>7 receitas práticas e refrescantes para os dias quentes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary stroke-[2.5]" aria-hidden="true" />
                  <span>O método de hidratação que elimina o inchaço</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary stroke-[2.5]" aria-hidden="true" />
                  <span>Lanches saudáveis para levar na bolsa (e não cair em tentação)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary stroke-[2.5]" aria-hidden="true" />
                  <span>O que comer antes e depois da praia/piscina</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary stroke-[2.5]" aria-hidden="true" />
                  <span>Lista de compras econômica para um verão mais saudável</span>
                </li>
              </ul>
              <p className="text-muted-foreground mb-8 text-sm sm:text-base font-semibold">
               É grátis, é prático e você recebe na hora no seu e-mail.
              </p>

              {!showSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Digite seu melhor e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-primary/30 focus-visible:ring-primary glass"
                  />

                  <Button
                    type="submit"
                    className="w-full h-auto min-h-[48px] sm:min-h-[56px] text-xs sm:text-sm px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl whitespace-normal"
                  >
                    QUERO MEU GUIA GRÁTIS AGORA
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>Seus dados estão seguros • Mais de 500 pessoas já baixaram</span>
                  </p>
                </form>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-3 p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        Tudo pronto!
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Seu e-book está disponível para download. Clique no botão abaixo para baixar.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleDownload}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Baixar E-book Agora
                  </Button>

                  <button
                    onClick={() => setShowSuccess(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    Voltar ao formulário
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Administrative UI disabled until server-side authentication is available. */}
      </div>
    </section>
  );
};

export default LeadMagnet;
