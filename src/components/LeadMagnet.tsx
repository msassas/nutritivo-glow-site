import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Download, CheckCircle, Copy, Mail } from "lucide-react";
import ebookCover from "@/assets/ebook-cover.webp";

interface EmailEntry {
  email: string;
  timestamp: string;
}

const EBOOK_URL = "https://drive.google.com/uc?export=download&id=1MR2Jx1vDFcScT9O4Q7hyZDY4LJMdo5AI";
const STORAGE_KEY = "nutritivo_ebook_emails";
const ADMIN_PASSWORD = "nutri@admin2025"; // Senha secreta para acessar o painel

const LeadMagnet = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [collectedEmails, setCollectedEmails] = useState<EmailEntry[]>([]);

  // Carregar emails do localStorage ao montar o componente
  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCollectedEmails(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao carregar emails:", error);
    }
  };

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
      setCollectedEmails(emails);
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

    // Verificar se é a senha do admin
    if (email === ADMIN_PASSWORD) {
      setShowAdmin(true);
      setEmail("");
      toast({
        title: "Acesso administrativo",
        description: "Bem-vinda ao painel admin! 🔐",
      });
      return;
    }

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

  const copyAllEmails = () => {
    const emailList = collectedEmails.map(entry => entry.email).join("\n");
    navigator.clipboard.writeText(emailList);
    toast({
      title: "Copiado!",
      description: `${collectedEmails.length} emails copiados para a área de transferência.`,
    });
  };

  const closeAdmin = () => {
    setShowAdmin(false);
    toast({
      title: "Painel fechado",
      description: "Até a próxima!",
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10 w-full px-4 sm:px-6">
        <div className="glass-dark rounded-2xl sm:rounded-[2rem] shadow-card overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            {/* E-book image */}
            <div className="p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-secondary/30 to-background/50 backdrop-blur-sm">
              <div className="relative animate-float w-full max-w-[280px] sm:max-w-xs">
                <img
                  src={ebookCover}
                  alt="Guia de Nutrição Essencial"
                  className="w-full h-auto rounded-xl sm:rounded-2xl shadow-glow"
                />
              </div>
            </div>

            {/* Form or Success Message */}
            <div className="px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Guia gratuito:<br />
                Verão Saudável com a Nutri
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base">
               Descubra como manter-se leve, hidratada e cheia de energia durante o verão.
               Receba dicas práticas, receitas refrescantes e hábitos simples para cuidar do seu corpo com equilíbrio e prazer.
              </p>

              {!showSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-primary/30 focus-visible:ring-primary glass"
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                  >
                    Quero baixar agora
                  </Button>
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

        {/* Admin Section - Hidden by default */}
        {showAdmin && (
          <div className="mt-8">
            {collectedEmails.length > 0 && (
            <div className="mt-4 p-6 bg-yellow-50 border border-yellow-200 rounded-xl animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Emails Coletados ({collectedEmails.length})
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={copyAllEmails}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar todos
                  </Button>
                  <Button
                    onClick={closeAdmin}
                    variant="outline"
                    size="sm"
                  >
                    Fechar
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {collectedEmails.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-100"
                  >
                    <span className="text-sm font-mono text-foreground">
                      {entry.email}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            )}

            {collectedEmails.length === 0 && (
              <div className="mt-4 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">
                    Nenhum email coletado ainda.
                  </p>
                  <Button
                    onClick={closeAdmin}
                    variant="outline"
                    size="sm"
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadMagnet;
