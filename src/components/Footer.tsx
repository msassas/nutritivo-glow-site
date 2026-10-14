import { MapPin, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logoFooter from "@/assets/logo-footer.webp";
import { trackLead } from "@/utils/facebookPixelIntegration";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const Footer = () => {
  const handleWhatsAppClick = async (
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    e.preventDefault();
    await trackLead({});
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  const socialLinks = [
    {
      icon: <Instagram className="size-5" />,
      href: "https://www.instagram.com/luanasalvinonutri/",
      label: "Instagram",
    },
  ];

  return (
    <footer className="w-full bg-[hsl(var(--secondary))] border-t border-accent/15">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <img
            src={logoFooter}
            alt="Luana Salvino Nutricionista"
            className="h-14 w-auto"
            width="1646"
            height="668"
            loading="lazy"
            decoding="async"
          />
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-foreground/80 mb-8">
          Atendimento presencial na Clínica Virtus · Cajazeiras, PB
        </p>
        <div className="flex flex-col items-center gap-4 mb-8 text-sm">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-accent" />
            <span>Agendamentos via WhatsApp</span>
          </a>
          <div className="flex items-center gap-2 text-foreground/80 text-center">
            <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
            <span>Av. Dr. Aldo Matos de Sá, 1030 – Centro, Cajazeiras – PB</span>
          </div>
        </div>
        <ul className="flex items-center space-x-6">
          {socialLinks.map((social, idx) => (
            <li
              key={idx}
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
        <nav className="mt-8">
          <Link
            to="/blog"
            className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            Blog
          </Link>
        </nav>
      </div>
      <div className="border-t border-accent/15">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-xs font-normal text-foreground/70 tracking-wide">
          © {new Date().getFullYear()} Nutricionista Luana Salvino. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
