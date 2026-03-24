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
  }>(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  })

  // Store user in session
  await session.update({
    state: undefined,
    user: {
      sub: userinfo.sub,
      preferredUsername: userinfo.preferred_username,
      picture: userinfo.picture,
    },
    idToken: tokens.id_token,
  })

  return sendRedirect(event, '/dashboard')
})
