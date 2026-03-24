import type { H3Event } from 'h3'

interface ClientRegistration {
  client_id: string
}

export const getClientRegistration = lazySingleton(
  async (event: H3Event): Promise<ClientRegistration> => {
    const { oidc } = useRuntimeConfig(event)
    const config = await getOIDCConfiguration(event)

    if (!config.registration_endpoint) {
      throw createError({
        statusCode: 500,
        message: 'Provider does not support dynamic client registration',
      })
    }

    return $fetch<ClientRegistration>(config.registration_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        redirect_uris: [oidc.redirectUri],
        post_logout_redirect_uris: [new URL('/', oidc.redirectUri).toString()],
        client_name: 'OIDC Client',
        grant_types: ['authorization_code'],
        response_types: ['code'],
        token_endpoint_auth_method: 'none',
      },
    })
  },
)
