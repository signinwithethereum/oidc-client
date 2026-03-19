export default defineEventHandler(async (event) => {
  const { oidc } = useRuntimeConfig(event)
  const config = await getOIDCConfiguration(event)
  const session = await getUserSession(event)

  // Generate random state for CSRF protection
  const state = crypto.randomUUID()
  await session.update({ state })

  const params = new URLSearchParams({
    client_id: oidc.clientId,
    redirect_uri: oidc.redirectUri,
    response_type: 'code',
    scope: oidc.scope,
    state,
  })

  return sendRedirect(event, `${config.authorization_endpoint}?${params}`)
})
