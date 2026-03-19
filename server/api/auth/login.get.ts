export default defineEventHandler(async (event) => {
  const { oidc } = useRuntimeConfig(event)
  const config = await getOIDCConfiguration(event)
  const session = await getUserSession(event)

  // Generate random state for CSRF protection
  const state = crypto.randomUUID()

  // Generate PKCE code verifier and challenge (S256)
  const codeVerifier = generateRandomString(64)
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier))
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  await session.update({ state, codeVerifier })

  const params = new URLSearchParams({
    client_id: oidc.clientId,
    redirect_uri: oidc.redirectUri,
    response_type: 'code',
    scope: oidc.scope,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  })

  return sendRedirect(event, `${config.authorization_endpoint}?${params}`)
})

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  const array = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(array, (byte) => chars[byte % chars.length]).join('')
}
