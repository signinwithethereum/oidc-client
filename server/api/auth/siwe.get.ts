export default defineEventHandler(async (event) => {
  const [config, session] = await Promise.all([
    getOIDCConfiguration(event),
    getUserSession(event),
  ])

  if (!session.data.accessToken) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const userinfo = await $fetch<{
    siwe_message?: string
    siwe_signature?: string
  }>(config.userinfo_endpoint, {
    headers: {
      Authorization: `Bearer ${session.data.accessToken}`,
    },
  })

  if (!userinfo.siwe_message || !userinfo.siwe_signature) {
    throw createError({ statusCode: 404, message: 'No SIWE proof available' })
  }

  return {
    message: userinfo.siwe_message,
    signature: userinfo.siwe_signature,
  }
})
