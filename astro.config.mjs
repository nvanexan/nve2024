import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  output: "hybrid",
  site: "https://nick.vanexan.ca",
  base: "/",
  adapter: vercel({
    edgeMiddleware: true,
  }),
  redirects: {
    "/writing": "/articles",
  },
});
