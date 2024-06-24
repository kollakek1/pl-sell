import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), icon(), sitemap(), robotsTxt()],
  site: 'https://vnd-team.vercel.app',
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});