import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://blog.kanicrub.net',
  integrations: [prefetch()],
});