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

    <UCard v-if="user?.siweMessage" class="mt-6">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-file-check"
            class="text-primary text-xl"
          />
          <h3 class="font-semibold">SIWE Proof</h3>
          <UBadge
            color="success"
            variant="subtle"
            class="ml-auto"
          >
            Verified
          </UBadge>
        </div>
      </template>

      <div class="space-y-4">
        <div class="text-sm text-success bg-success/10 rounded p-3">
          This client verified the SIWE signature for {{ user.sub }}.
        </div>
        <p class="text-xs text-muted">
          Verification is optional. Clients that trust their provider can
          rely on the OIDC <code>sub</code> claim directly.
        </p>
        <div>
          <p class="text-sm font-medium mb-1">Message</p>
          <pre class="text-sm bg-elevated rounded p-4 overflow-x-auto whitespace-pre-wrap">{{ user.siweMessage }}</pre>
        </div>
        <div>
          <p class="text-sm font-medium mb-1">Signature</p>
          <pre class="text-sm bg-elevated rounded p-4 overflow-x-auto break-all">{{ user.siweSignature }}</pre>
        </div>
      </div>
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
          Authorization uses Proof Key for Code Exchange (PKCE). No client
          secrets are stored.
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
          Your session is an encrypted server-side cookie. Sign out and
          it's gone.
        </p>
      </UCard>
    </div>

    <div class="flex justify-center mt-8">
      <GitHubLinks />
    </div>
  </UContainer>
</template>
