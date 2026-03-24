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

    const baseUrl = new URL('/', oidc.redirectUri).toString().replace(/\/$/, '')

    const body: Record<string, unknown> = {
      redirect_uris: [oidc.redirectUri],
      post_logout_redirect_uris: [new URL('/', oidc.redirectUri).toString()],
      client_name: oidc.clientName || 'OIDC Client',
      logo_uri: oidc.logoUri || `${baseUrl}/client-logo.png`,
      client_uri: oidc.clientUri || baseUrl,
      grant_types: ['authorization_code'],
      response_types: ['code'],
      token_endpoint_auth_method: 'none',
    }

    if (oidc.policyUri) body.policy_uri = oidc.policyUri
    if (oidc.tosUri) body.tos_uri = oidc.tosUri
    if (oidc.contacts) body.contacts = oidc.contacts.split(',').map((c: string) => c.trim())

    return $fetch<ClientRegistration>(config.registration_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
  },
)
