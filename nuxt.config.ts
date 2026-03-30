// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false,
  },

  app: {
    head: {
      title: 'OIDC Client',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/client-logo.svg' }],
    },
  },

  devServer: {
    port: 3001,
  },

  runtimeConfig: {
    session: {
      secret: '', // NUXT_SESSION_SECRET (min 32 chars)
    },
    oidc: {
      issuer: 'http://localhost:3000', // NUXT_OIDC_ISSUER
      redirectUri: 'http://localhost:3001/api/auth/callback', // NUXT_OIDC_REDIRECT_URI
      scope: 'openid profile siwe', // NUXT_OIDC_SCOPE
      clientName: 'Example OIDC Client', // NUXT_OIDC_CLIENT_NAME
      clientUri: 'http://localhost:3001', // NUXT_OIDC_CLIENT_URI
      logoUri: 'http://localhost:3001/client-logo.png', // NUXT_OIDC_LOGO_URI
      policyUri: 'http://localhost:3001/privacy', // NUXT_OIDC_POLICY_URI
      tosUri: 'http://localhost:3001/terms', // NUXT_OIDC_TOS_URI
      contacts: 'info@ethfollow.xyz', // NUXT_OIDC_CONTACTS (comma-separated emails)
    },
  },
})
