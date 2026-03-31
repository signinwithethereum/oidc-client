interface User {
  sub: string
  preferredUsername?: string
  picture?: string
  siweVerified?: boolean
}

export function useAuth() {
  const user = useState<User | null>('auth:user', () => null)
  const loading = useState('auth:loading', () => true)
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : {}

  async function fetchUser() {
    loading.value = true
    try {
      user.value = await $fetch<User>('/api/auth/me', { headers })
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  function login() {
    navigateTo('/api/auth/login', { external: true })
  }

  function logout() {
    navigateTo('/api/auth/logout', { external: true })
  }

  return {
    user,
    loading,
    fetchUser,
    login,
    logout,
  }
}
