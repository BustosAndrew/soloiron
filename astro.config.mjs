import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://soloiron.dev/",
  integrations: [
    mdx(),
    sitemap({
      // The blog still holds placeholder starter content, so keep it out of the
      // sitemap (its pages are also marked noindex) until real posts land.
      filter: (page) => !page.includes("/blog"),
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
    icon(),
  ],
  adapter: vercel(),

  // Warm up links as they scroll into view — cuts perceived navigation latency.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
