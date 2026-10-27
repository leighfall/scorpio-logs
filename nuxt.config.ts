// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/eslint', '@nuxt/fonts'],
  css: ['~/assets/styles/main.scss'],
  runtimeConfig: {
    supabaseUrl: '',
    supabaseAnonKey: '',
    supabaseServiceRoleKey: '',
    esologsClientId: '',
    esologsClientSecret: '',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  fonts: {
    families: [
      { name: 'Cinzel', provider: 'google', weights: ['400 700'], styles: ['normal'] },
      { name: 'Inter', provider: 'google', weights: ['400 700'], styles: ['normal'] },
    ],
  },
  typescript: {
    tsConfig: {
      include: ['../tests/unit/components/**/*', '../tests/integration/**/*'],
    },
    sharedTsConfig: {
      include: ['../tests/unit/parser/**/*', '../tests/unit/utils/**/*'],
    },
    // Root-level tool configs aren't in any generated tsconfig by default
    nodeTsConfig: {
      include: ['../playwright.config.ts', '../scripts/**/*'],
      compilerOptions: { types: ['node'] },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/_tokens.scss" as *; @use "~/assets/styles/_mixins.scss" as *;',
        },
      },
    },
  },
});
