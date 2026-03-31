import { verifyMessage } from 'viem/utils'

export default defineEventHandler(async (event) => {
  const { oidc } = useRuntimeConfig(event)
  const [config, registration, session] = await Promise.all([
    getOIDCConfiguration(event),
    getClientRegistration(event),
    getUserSession(event),
  ])
  const query = getQuery(event)

  // Verify state matches
  if (!query.state || query.state !== session.data.state) {
    throw createError({ statusCode: 400, message: 'Invalid state parameter' })
  }

  if (query.error) {
    throw createError({
      statusCode: 400,
      message: `Authorization error: ${query.error_description || query.error}`,
    })
  }

  if (!query.code) {
    throw createError({
      statusCode: 400,
      message: 'Missing authorization code',
    })
  }

  // Exchange code for tokens
  const body: Record<string, string> = {
    grant_type: 'authorization_code',
    code: query.code as string,
    redirect_uri: oidc.redirectUri,
    client_id: registration.client_id,
    code_verifier: session.data.codeVerifier,
  }

  const tokens = await $fetch<{
    access_token: string
    id_token: string
    token_type: string
  }>(config.token_endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString(),
  })

  // Fetch user info
  const userinfo = await $fetch<{
    sub: string
    preferred_username?: string
    picture?: string
    siwe_message?: string
    siwe_signature?: string
  }>(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })

  // Verify the SIWE proof if the provider returned one.
  // Optional: clients that trust their provider can skip this.
  if (userinfo.siwe_message && userinfo.siwe_signature) {
    const valid = await verifyMessage({
      address: userinfo.sub.split(':').pop() as `0x${string}`,
      message: userinfo.siwe_message,
      signature: userinfo.siwe_signature as `0x${string}`,
    })
    if (!valid) {
      throw createError({
        statusCode: 403,
        message: 'SIWE signature verification failed: signature does not match the claimed address',
      })
    }
  }

  // Store user in session
  await session.update({
    state: undefined,
    user: {
      sub: userinfo.sub,
      preferredUsername: userinfo.preferred_username,
      picture: userinfo.picture,
      siweMessage: userinfo.siwe_message,
      siweSignature: userinfo.siwe_signature,
    },
    idToken: tokens.id_token,
  })

  return sendRedirect(event, '/dashboard')
})
