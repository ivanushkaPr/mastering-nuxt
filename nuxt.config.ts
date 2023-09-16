import vsharp from 'vite-plugin-vsharp';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    stripeSecret: process.env.STRIPE_SECRET,
    public: {
      stripeKey: process.env.STRIPE_PUBLIC_KEY,
    },
  },
  nitro: {
    prerender: {
      routes: ['/landing'],
    },
  },
  vite: {
    plugins: [vsharp()],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    // '@nuxtjs/supabase',
      '@pinia/nuxt',
  ],
})
