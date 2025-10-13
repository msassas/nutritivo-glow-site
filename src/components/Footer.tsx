import { Leaf, MapPin, Instagram, MessageCircle } from "lucide-react";
import logoFooter from "@/assets/logo-footer.webp";
import { trackLead } from "@/utils/facebookPixelIntegration";

const Footer = () => {
  const handleWhatsAppClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackLead({});
    window.open('https://api.whatsapp.com/send/?phone=5583986547947&text=Ol%C3%A1%21+Quero+agendar+uma+consulta+com+Luana+Salvino+Nutricionista.&type=phone_number&app_absent=0', '_blank');
  };

  const sections = [{
    title: "Contato",
    links: [{
      name: "WhatsApp",
      href: "https://wa.me/5583999999999"
    }, {
      name: "Instagram",
      href: "#"
    }, {
      name: "Facebook",
      href: "#"
    }, {
      name: "Localização",
      href: "#"
    }]
  }];
  const socialLinks = [{
    icon: <Instagram className="size-5" />,
    href: "https://www.instagram.com/luanasalvinonutri/",
    label: "Instagram"
  }];
  const legalLinks = [{
    name: "Política de Privacidade",
    href: "#"
  }, {
    name: "Termos de Uso",
    href: "#"
  }];
  return (
    <footer className="w-full bg-card">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <img 
            src={logoFooter} 
            alt="Luana Salvino Nutricionista" 
            className="h-14 w-auto"
          />
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-muted-foreground mb-6">
          Atendimento presencial na Clínica Virtus - Cajazeiras, PB
        </p>
        <div className="flex flex-col items-center gap-4 mb-6 text-sm">
          <a
            href="https://api.whatsapp.com/send/?phone=5583986547947&text=Ol%C3%A1%21+Quero+agendar+uma+consulta+com+Luana+Salvino+Nutricionista.&type=phone_number&app_absent=0"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
            <span>Agendamentos via WhatsApp</span>
          </a>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <span>Av. Dr. Aldo Matos de Sá, 1030 – Centro, Cajazeiras – PB</span>
          </div>
        </div>
        <ul className="flex items-center space-x-6">
          {socialLinks.map((social, idx) => (
            <li key={idx} className="hover:text-primary transition-colors">
              <a href={social.href} aria-label={social.label}>
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal text-muted-foreground">
          © 2024 Nutricionista Luana Salvino. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
export default Footer;