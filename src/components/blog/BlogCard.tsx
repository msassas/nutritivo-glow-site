import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { formatDatePtBR, type PostSummary } from "@/lib/blog";

interface BlogCardProps {
  post: PostSummary;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-[#E3D0C8] shadow-[0_4px_15px_rgba(139,90,43,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(139,90,43,0.12)]"
    >
      {post.coverImage ? (
        <div className="aspect-[16/9] overflow-hidden bg-[#F5EDE7]">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-[#F5EDE7]" />
      )}

      <div className="p-6 flex flex-col gap-3">
        <span className="self-start text-xs uppercase tracking-wider font-semibold text-[#8B5A2B] bg-[#F5EDE7] px-3 py-1 rounded-full">
          {post.category}
        </span>

        <h3 className="text-xl font-bold leading-snug text-[#4A3B32] group-hover:text-[#8B5A2B] transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-[#6B5749] leading-relaxed line-clamp-3">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-xs text-[#888] pt-2 mt-auto border-t border-[#F0E4DC]">
          <time dateTime={post.date}>{formatDatePtBR(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
