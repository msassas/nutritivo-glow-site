export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  slug: string;
  keywords: string;
  readingTime?: string;
}

export interface PostSummary extends PostFrontmatter {
  readingTime: string;
}

export interface PostFull extends PostSummary {
  Component: React.ComponentType;
}

interface MdxModule {
  default: React.ComponentType;
  frontmatter: Partial<PostFrontmatter>;
}

const mdxModules = import.meta.glob<MdxModule>("/content/blog/*.mdx", {
  eager: true,
});

function pathToSlug(path: string): string {
  const file = path.split("/").pop() || "";
  return file.replace(/\.mdx$/, "");
}

function buildSummary(path: string, mod: MdxModule): PostSummary {
  const fm = mod.frontmatter || {};
  return {
    title: fm.title || "Sem título",
    description: fm.description || "",
    date: fm.date || "",
    author: fm.author || "Luana Salvino",
    category: fm.category || "Geral",
    tags: fm.tags || [],
    coverImage: fm.coverImage || "",
    slug: fm.slug || pathToSlug(path),
    keywords: fm.keywords || "",
    readingTime: fm.readingTime || "",
  };
}

const allEntries = Object.entries(mdxModules).map(([path, mod]) => ({
  summary: buildSummary(path, mod),
  Component: mod.default,
}));

const allSummaries: PostSummary[] = allEntries
  .map((e) => e.summary)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const summariesBySlug: Record<string, PostSummary> = Object.fromEntries(
  allSummaries.map((s) => [s.slug, s])
);

const componentsBySlug: Record<string, React.ComponentType> = Object.fromEntries(
  allEntries.map((e) => [e.summary.slug, e.Component])
);

export function getAllPosts(): PostSummary[] {
  return allSummaries;
}

export function getPostBySlug(slug: string): PostFull | undefined {
  const summary = summariesBySlug[slug];
  const Component = componentsBySlug[slug];
  if (!summary || !Component) return undefined;
  return { ...summary, Component };
}

export function getPostsByCategory(category: string): PostSummary[] {
  return allSummaries.filter((p) => p.category === category);
}

export function getRelatedPosts(slug: string, limit = 3): PostSummary[] {
  const current = summariesBySlug[slug];
  if (!current) return [];
  return allSummaries
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(allSummaries.map((p) => p.category)));
}

export function getAllSlugs(): string[] {
  return allSummaries.map((p) => p.slug);
}

export function formatDatePtBR(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export const SITE_URL = "https://luanasalvino.com.br";
