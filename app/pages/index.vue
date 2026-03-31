<script setup lang="ts">
const { user, loading, fetchUser, login } = useAuth()
const loggingIn = ref(false)

await fetchUser()

if (user.value) await navigateTo('/dashboard')

function handleLogin() {
  loggingIn.value = true
  login()
}
</script>

<template>
  <UContainer class="py-20">
    <div class="flex flex-col md:flex-row items-center gap-12">
      <div class="flex-1 text-center md:text-left">
        <h1 class="text-5xl font-bold tracking-tight">
          Sign in with
          <span class="text-primary">Ethereum</span>
        </h1>
        <p class="text-xl text-muted mt-4 max-w-lg text-balance">
          Authenticate with your Ethereum wallet to access the
          <NuxtLink
            to="/dashboard"
            class="text-primary underline"
          >
            dashboard</NuxtLink
          >.
        </p>

        <div
          v-if="loading"
          class="mt-8"
        >
          Loading...
        </div>

        <div
          v-else
          class="mt-8"
        >
          <UButton
            label="Sign in with Ethereum"
            size="xl"
            :loading="loggingIn"
            @click="handleLogin"
          >
            <template #leading>
              <img
                src="/eth-diamond-white.svg"
                alt=""
                width="18"
                height="18"
              />
            </template>
          </UButton>
        </div>
      </div>

      <div class="flex-1 flex justify-center">
        <img
          src="/wallet.png"
          alt="Ethereum Wallet"
          class="max-w-xs md:max-w-sm"
        />
      </div>
    </div>

    <USeparator class="my-16" />

    <div class="grid md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-shield-check"
              class="text-primary text-xl"
            />
            <h3 class="font-semibold text-lg">Standards-Based Auth</h3>
          </div>
        </template>
        <p class="text-muted text-sm">
          Full OpenID Connect provider powered by Sign in with Ethereum. Works
          with your existing OIDC libraries out of the box.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-key"
              class="text-primary text-xl"
            />
            <h3 class="font-semibold text-lg">Self-Sovereign Identity</h3>
          </div>
        </template>
        <p class="text-muted text-sm">
          Your Ethereum wallet is your identity. No passwords, no email
          verification, no third-party custody of your credentials.
        </p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-blocks"
              class="text-primary text-xl"
            />
            <h3 class="font-semibold text-lg">Dynamic Registration</h3>
          </div>
        </template>
        <p class="text-muted text-sm">
          Clients register automatically via the OIDC dynamic registration
          endpoint. No manual setup, no client secrets needed.
        </p>
      </UCard>
    </div>

    <div class="flex justify-center mt-10">
      <GitHubLinks />
    </div>
  </UContainer>
</template>
