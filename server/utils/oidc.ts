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

let cachedConfig: OIDCConfiguration | null = null

export async function getOIDCConfiguration(
  event: H3Event,
): Promise<OIDCConfiguration> {
  if (cachedConfig) return cachedConfig

  const { oidc } = useRuntimeConfig(event)
  const url = `${oidc.issuer}/.well-known/openid-configuration`

  const config = await $fetch<OIDCConfiguration>(url)
  cachedConfig = config

  return config
}
