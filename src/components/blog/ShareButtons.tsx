import { useState } from "react";
import { Facebook, MessageCircle, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const baseBtn =
    "inline-flex items-center gap-2 rounded-full border border-[#E3D0C8] bg-white px-4 py-2 text-sm font-medium text-[#4A3B32] transition-colors hover:bg-[#F5EDE7]";

  return (
    <div className="not-prose flex flex-wrap items-center gap-3 my-8">
      <span className="text-sm font-semibold text-[#6B5749] mr-1">Compartilhar:</span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
        aria-label="Compartilhar no WhatsApp"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        WhatsApp
      </a>

      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseBtn}
        aria-label="Compartilhar no Facebook"
      >
        <Facebook className="h-4 w-4" aria-hidden="true" />
        Facebook
      </a>

      <button
        type="button"
        onClick={handleCopy}
        className={baseBtn}
        aria-label="Copiar link do artigo"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" aria-hidden="true" />
            Copiado
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" aria-hidden="true" />
            Copiar link
          </>
        )}
      </button>
    </div>
  );
};

export default ShareButtons;
