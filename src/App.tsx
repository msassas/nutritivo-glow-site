import { useEffect, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { RouteRecord } from "vite-react-ssg";
import { initializePageViewTracking } from "./utils/facebookPixelIntegration";

const queryClient = new QueryClient();

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const cleanup = initializePageViewTracking();
    return cleanup;
  }, [location]);

  return null;
}

const Layout = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouteTracker />
      <Outlet />
    </TooltipProvider>
  </QueryClientProvider>
);

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: lazy(() => import("./pages/Index")),
        entry: "src/pages/Index.tsx",
      },
      {
        path: "blog",
        Component: lazy(() => import("./pages/Blog")),
        entry: "src/pages/Blog.tsx",
      },
      {
        path: "blog/:slug",
        lazy: async () => {
          const mod = await import("./pages/BlogPost");
          return { Component: mod.default };
        },
        entry: "src/pages/BlogPost.tsx",
        getStaticPaths: () => {
          const modules = import.meta.glob("/content/blog/*.mdx", { eager: false });
          return Object.keys(modules)
            .map((p) => p.split("/").pop()!.replace(/\.mdx$/, ""))
            .map((slug) => `/blog/${slug}`);
        },
      },
      {
        path: "*",
        Component: lazy(() => import("./pages/NotFound")),
        entry: "src/pages/NotFound.tsx",
      },
    ],
  },
];

export default routes;
