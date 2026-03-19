export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session.data.user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  return session.data.user
})
