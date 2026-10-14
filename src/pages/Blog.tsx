import { useMemo, useState } from "react";
import { Head } from "vite-react-ssg";
import { getAllPosts, getAllCategories, SITE_URL } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

const Blog = () => {
  const allPosts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const [active, setActive] = useState<string>("Todos");

  const visible = useMemo(
    () => (active === "Todos" ? allPosts : allPosts.filter((p) => p.category === active)),
    [allPosts, active]
  );

  const pageTitle = "Blog | Luana Salvino - Nutricionista";
  const pageDescription =
    "Conteúdo sobre nutrição, saúde e bem-estar baseado em evidências científicas pela nutricionista Luana Salvino.";
  const canonical = `${SITE_URL}/blog`;

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A3B32]">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <section className="px-4 pt-20 pb-10 sm:pt-24 sm:pb-14 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8B5A2B] mb-3 font-semibold">
            Conteúdo da Luana
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#8B5A2B] mb-4 leading-tight">
            Blog
          </h1>
          <p className="text-base sm:text-lg text-[#6B5749] leading-relaxed">
            Conteúdo sobre nutrição, saúde e bem-estar baseado em evidências científicas.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="px-4 pb-8">
          <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-2">
            {["Todos", ...categories].map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors border ${
                    isActive
                      ? "bg-[#8B5A2B] text-white border-[#8B5A2B]"
                      : "bg-white text-[#4A3B32] border-[#E3D0C8] hover:bg-[#F5EDE7]"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>
      )}

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          {visible.length === 0 ? (
            <p className="text-center text-[#6B5749] py-16">
              Nenhum artigo nesta categoria ainda. Volte em breve.
            </p>
          ) : (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Blog;
