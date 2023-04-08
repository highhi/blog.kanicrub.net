import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  site: 'https://blog.kanicrub.net',
  build: {
    assetsPrefix: import.meta.env.PROD ? 'https://assets-blog.kanicrub.net' : undefined
  },
  integrations: [prefetch()],
  vite: {
    ssr: {
      // see: https://docs.astro.build/ja/guides/integrations-guide/node/#syntaxerror-named-export-compile-not-found
      noExternal: ["path-to-regexp"]
    },
    define: {
      // see: https://github.com/withastro/astro/issues/4416#issuecomment-1228234136
      'process.env.CMS_SERVICE_DOMAIN': JSON.stringify(process.env.CMS_SERVICE_DOMAIN),
      'process.env.CMS_API_KEY': JSON.stringify(process.env.CMS_API_KEY)
    }
  },
});