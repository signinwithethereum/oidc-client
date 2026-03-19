// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  devServer: {
    port: 3001,
  },

  runtimeConfig: {
    session: {
      secret: '', // NUXT_SESSION_SECRET (min 32 chars)
    },
    oidc: {
      issuer: 'http://localhost:3000', // NUXT_OIDC_ISSUER
      clientId: '', // NUXT_OIDC_CLIENT_ID
      clientSecret: '', // NUXT_OIDC_CLIENT_SECRET
      redirectUri: 'http://localhost:3001/api/auth/callback', // NUXT_OIDC_REDIRECT_URI
      scope: 'openid profile', // NUXT_OIDC_SCOPE
    },
  },
})
