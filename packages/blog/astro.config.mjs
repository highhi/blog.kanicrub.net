import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://blog.kanicrub.net',
  integrations: [prefetch()],
  build: {
    assets: 'https://assets-blog.kanicrub.net/assets'
  },
  vite: {
    define: {
      // see: https://github.com/withastro/astro/issues/4416#issuecomment-1228234136
      'process.env.CMS_SERVICE_DOMAIN': JSON.stringify(process.env.CMS_SERVICE_DOMAIN),
      'process.env.CMS_API_KEY': JSON.stringify(process.env.CMS_API_KEY)
    }
  }
});