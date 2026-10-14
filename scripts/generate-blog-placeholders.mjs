import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "public", "blog");
mkdirSync(OUT_DIR, { recursive: true });

const W = 1200;
const H = 630;

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSvg({ title, subtitle, bg, accent, fg }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)" />
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="none" stroke="${fg}" stroke-opacity="0.18" stroke-width="2" rx="20" />
  <text x="${W / 2}" y="${H / 2 - 40}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="${fg}" text-anchor="middle" dominant-baseline="middle">${escapeXml(title)}</text>
  <text x="${W / 2}" y="${H / 2 + 30}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="28" font-weight="400" fill="${fg}" fill-opacity="0.85" text-anchor="middle" dominant-baseline="middle">${escapeXml(subtitle)}</text>
  <text x="${W / 2}" y="${H - 90}" font-family="Poppins, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" fill="${fg}" fill-opacity="0.7" text-anchor="middle" dominant-baseline="middle" letter-spacing="3">LUANA SALVINO · NUTRICIONISTA</text>
</svg>`;
}

const items = [
  {
    file: "caquexia-suporte-nutricional.webp",
    title: "Caquexia no Câncer",
    subtitle: "Como o suporte nutricional pode aumentar a sobrevida",
    bg: "#8B5A2B",
    accent: "#6B4420",
    fg: "#FDFBF7",
  },
  {
    file: "sustentabilidade-unidades-alimentacao.webp",
    title: "Sustentabilidade na Cozinha",
    subtitle: "Reduzir resíduos em unidades de alimentação",
    bg: "#DDA7A5",
    accent: "#C89290",
    fg: "#FFFFFF",
  },
];

for (const item of items) {
  const svg = buildSvg(item);
  const outPath = resolve(OUT_DIR, item.file);
  await sharp(Buffer.from(svg))
    .webp({ quality: 88 })
    .toFile(outPath);
  console.log(`✓ ${item.file}`);
}
