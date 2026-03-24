import type { H3Event } from 'h3'

interface OIDCConfiguration {
  issuer: string
  authorization_endpoint: string
  token_endpoint: string
  userinfo_endpoint: string
  jwks_uri: string
  end_session_endpoint?: string
  registration_endpoint?: string
}

export const getOIDCConfiguration = lazySingleton(
  async (event: H3Event): Promise<OIDCConfiguration> => {
    const { oidc } = useRuntimeConfig(event)
    return $fetch<OIDCConfiguration>(
      `${oidc.issuer}/.well-known/openid-configuration`,
    )
  },
)
