export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const idToken = session.data.idToken
  await session.clear()

  // If the provider supports end_session, redirect there
  try {
    const config = await getOIDCConfiguration(event)
    if (config.end_session_endpoint && idToken) {
      const params = new URLSearchParams({
        id_token_hint: idToken,
        post_logout_redirect_uri: new URL('/', getRequestURL(event)).toString(),
      })
      return sendRedirect(event, `${config.end_session_endpoint}?${params}`)
    }
  } catch {
    // Fall through to local redirect
  }

  return sendRedirect(event, '/')
})
