export const WHATSAPP_PHONE = "5583994173887";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site e gostaria de agendar uma consulta.";

export const buildWhatsAppUrl = (
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

export const WHATSAPP_URL = buildWhatsAppUrl();

export const openWhatsApp = (message?: string): void => {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
};
