import { SiweMessage, createViemConfig } from '@signinwithethereum/siwe'
import { createPublicClient, http } from 'viem'

export default defineEventHandler(async (event) => {
  const { oidc, rpcUrl } = useRuntimeConfig(event)
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
    const message = new SiweMessage(userinfo.siwe_message)
    const publicClient = createPublicClient({
      chain: { id: message.chainId } as any,
      transport: http(rpcUrl),
    })
    const siweConfig = await createViemConfig({ publicClient })
    const { success, error } = await message.verify(
      {
        signature: userinfo.siwe_signature,
        domain: message.domain,
        nonce: message.nonce,
      },
      { config: siweConfig },
    )
    if (!success) {
      throw createError({
        statusCode: 403,
        message: `SIWE verification failed: ${error?.type ?? 'unknown error'}`,
      })
    }
  }

  // Store user in session (keep it small to fit in a 4KB cookie).
  // SIWE proof is fetched on demand via /api/auth/siwe to avoid
  // exceeding the cookie size limit.
  await session.update({
    state: undefined,
    user: {
      sub: userinfo.sub,
      preferredUsername: userinfo.preferred_username,
      picture: userinfo.picture,
      siweVerified: !!(userinfo.siwe_message && userinfo.siwe_signature),
    },
    accessToken: tokens.access_token,
  })

  return sendRedirect(event, '/dashboard')
})
