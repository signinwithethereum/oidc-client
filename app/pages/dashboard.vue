<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, logout } = useAuth()
</script>

<template>
  <UContainer class="py-16">
    <div class="flex flex-col md:flex-row items-center gap-12 mb-10">
      <div class="flex-1">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-muted mt-2">
          Very secret page only signed in users should be able to access.
        </p>
      </div>

      <div class="flex-1 flex justify-center">
        <img
          src="/what-is-ethereum.png"
          alt="Ethereum"
          class="max-w-xs md:max-w-sm"
        />
      </div>
    </div>

    <UCard v-if="user">
      <div class="flex items-center gap-4">
        <UAvatar
          v-if="user.picture"
          :src="user.picture"
          :alt="user.preferredUsername"
          size="lg"
        />
        <div>
          <p class="font-semibold text-lg">
            {{ user.preferredUsername || user.sub }}
          </p>
          <p class="text-sm text-muted">{{ user.sub }}</p>
        </div>
      </div>

      <pre class="mt-4 text-sm bg-elevated rounded p-4 overflow-x-auto">{{
        JSON.stringify(user, null, 2)
      }}</pre>

      <template #footer>
        <UButton
          label="Sign Out"
          color="neutral"
          variant="outline"
          @click="logout"
        />
      </template>
    </UCard>

    <USeparator class="my-12" />

    <h2 class="text-xl font-semibold mb-6 text-center">How It Works</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-scan-face"
              class="text-primary text-xl"
            />
            <h3 class="font-semibold">SIWE Authentication</h3>
          </div>
        </template>
        <p class="text-muted text-sm">
          You signed a message with your Ethereum wallet. The OIDC provider
          verified the signature and issued standard OpenID Connect tokens.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-lock"
              class="text-primary text-xl"
            />
            <h3 class="font-semibold">PKCE Flow</h3>
          </div>
        </template>
        <p class="text-muted text-sm">
          This client uses Proof Key for Code Exchange &mdash; no client secrets
          are stored. The authorization code is exchanged securely using a
          one-time verifier.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-cookie"
              class="text-primary text-xl"
            />
            <h3 class="font-semibold">Encrypted Sessions</h3>
          </div>
        </template>
        <p class="text-muted text-sm">
          Your session is stored in an encrypted server-side cookie. No database
          required &mdash; sign out and it's gone.
        </p>
      </UCard>
    </div>

    <div class="flex justify-center mt-8">
      <GitHubLinks />
    </div>
  </UContainer>
</template>
