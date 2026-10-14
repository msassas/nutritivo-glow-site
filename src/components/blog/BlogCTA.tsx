import { WHATSAPP_URL } from "@/lib/whatsapp";

const BlogCTA = ({ variant = "default" }: { variant?: "default" | "compact" }) => {
  return (
    <aside
      role="complementary"
      className="not-prose my-10 rounded-[10px] border border-[#D4B896]/50 bg-[#F5EFE7] p-6 sm:p-8 text-center shadow-[0_8px_30px_rgba(135,115,101,0.18)]"
    >
      <h3 className="text-xl sm:text-2xl font-semibold text-[#3D2F26] mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
        Pronta para um plano alimentar feito pra você?
      </h3>
      {variant === "default" && (
        <p className="text-[#6F5D52] mb-5 text-sm sm:text-base">
          Agende sua consulta com a Luana e comece sua transformação com acompanhamento profissional.
        </p>
      )}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3D2F26] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#F5EFE7] transition-all duration-300 hover:bg-[#5A4538] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(61,47,38,0.4)]"
      >
        Agendar minha consulta
      </a>
    </aside>
  );
};

export default BlogCTA;
