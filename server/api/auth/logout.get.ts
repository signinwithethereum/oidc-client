export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const registration = await getClientRegistration(event)

  await session.clear()

  // If the provider supports end_session, redirect there
  try {
    const config = await getOIDCConfiguration(event)
    if (config.end_session_endpoint) {
      const params = new URLSearchParams({
        client_id: registration.client_id,
        post_logout_redirect_uri: new URL('/', getRequestURL(event)).toString(),
      })
      return sendRedirect(event, `${config.end_session_endpoint}?${params}`)
    }
  } catch {
    // Fall through to local redirect
  }

  return sendRedirect(event, '/')
})
