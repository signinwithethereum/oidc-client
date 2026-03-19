import type { H3Event } from 'h3'

export async function getUserSession(event: H3Event) {
  const config = useRuntimeConfig(event)

  const session = await useSession(event, {
    password: config.session.secret,
    name: 'siwe-oidc-session',
  })

  return session
}
