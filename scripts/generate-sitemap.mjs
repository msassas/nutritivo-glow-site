import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://luanasalvino.com.br";
const ROOT = resolve(process.cwd());
const CONTENT_DIR = join(ROOT, "content", "blog");
const DIST_DIR = join(ROOT, "dist");

function readPosts() {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = readFileSync(join(CONTENT_DIR, f), "utf8");
      const { data } = matter(raw);
      return {
        slug: data.slug || f.replace(/\.mdx$/, ""),
        date: data.date || new Date().toISOString().slice(0, 10),
      };
    });
}

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/blog`, lastmod: today, changefreq: "weekly", priority: "0.9" },
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.date,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ];

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\nAllow: /blog\nAllow: /blog/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

function main() {
  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }
  const posts = readPosts();
  const sitemap = buildSitemap(posts);
  writeFileSync(join(DIST_DIR, "sitemap.xml"), sitemap, "utf8");
  writeFileSync(join(DIST_DIR, "robots.txt"), buildRobotsTxt(), "utf8");
  console.log(`✓ sitemap.xml written (${posts.length} blog posts + 2 static routes)`);
  console.log(`✓ robots.txt written`);
}

main();
