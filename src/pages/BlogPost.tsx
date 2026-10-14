import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Clock, ChevronRight } from "lucide-react";
import { MDXProvider } from "@mdx-js/react";
import {
  getPostBySlug,
  getRelatedPosts,
  formatDatePtBR,
  SITE_URL,
} from "@/lib/blog";
import BlogCTA from "@/components/blog/BlogCTA";
import BlogCard from "@/components/blog/BlogCard";
import ShareButtons from "@/components/blog/ShareButtons";

const mdxComponents = {
  CTA: BlogCTA,
};

const BlogPost = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const related = useMemo(() => getRelatedPosts(slug, 3), [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const Component = post.Component;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: ogImage,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Nutricionista",
    },
    publisher: {
      "@type": "Organization",
      name: "Luana Salvino - Nutricionista",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-black.webp`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    keywords: post.keywords,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#4A3B32]">
      <Head>
        <title>{`${post.title} | Luana Salvino - Nutricionista`}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((t) => (
          <meta key={t} property="article:tag" content={t} />
        ))}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Head>

      <nav aria-label="breadcrumb" className="px-4 pt-8 pb-4">
        <ol className="mx-auto max-w-3xl flex flex-wrap items-center gap-1 text-xs sm:text-sm text-[#6B5749]">
          <li>
            <Link to="/" className="hover:text-[#8B5A2B]">Home</Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li>
            <Link to="/blog" className="hover:text-[#8B5A2B]">Blog</Link>
          </li>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <li className="text-[#4A3B32] truncate max-w-[60vw]" aria-current="page">
            {post.title}
          </li>
        </ol>
      </nav>

      <header className="px-4 pb-8">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block text-xs uppercase tracking-wider font-semibold text-[#8B5A2B] bg-[#F5EDE7] px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#4A3B32] mb-4">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-[#6B5749] leading-relaxed mb-5">
            {post.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B5749]">
            <span className="font-semibold text-[#4A3B32]">{post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDatePtBR(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="px-4 mb-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-[#E3D0C8] bg-[#F5EDE7]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      )}

      <article className="px-4 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none prose-headings:text-[#8B5A2B] prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h3:text-2xl prose-p:text-[#4A3B32] prose-p:leading-relaxed prose-a:text-[#8B5A2B] prose-a:font-semibold prose-strong:text-[#4A3B32] prose-blockquote:border-[#DDA7A5] prose-blockquote:text-[#6B5749] prose-li:text-[#4A3B32] prose-img:rounded-xl">
            <MDXProvider components={mdxComponents}>
              <Component />
            </MDXProvider>
          </div>

          <BlogCTA />

          <ShareButtons title={post.title} url={url} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-4 pb-20 bg-white border-t border-[#E3D0C8]">
          <div className="mx-auto max-w-6xl pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#8B5A2B] mb-8 text-center">
              Continue lendo
            </h2>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPost;

export function getStaticPaths(): string[] {
  // dynamically discover slugs for SSG
  const modules = import.meta.glob("/content/blog/*.mdx", { eager: false });
  return Object.keys(modules)
    .map((p) => p.split("/").pop()!.replace(/\.mdx$/, ""))
    .map((slug) => `/blog/${slug}`);
}
