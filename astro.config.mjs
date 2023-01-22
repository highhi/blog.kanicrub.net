import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://blog.kanicrub.net',
  vite: {
    define: {
      'process.env.CMS_SERVICE_DOMAIN': JSON.stringify(process.env.CMS_SERVICE_DOMAIN),
      'process.env.CMS_API_KEY': JSON.stringify(process.env.CMS_API_KEY)
    }
  }
});